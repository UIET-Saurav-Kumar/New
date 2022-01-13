<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Http\Util\SMS;
use PickBazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use Barryvdh\DomPDF\Facade as PDF;
use PickBazar\Events\OrderCreated;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\Order;
use PickBazar\Database\Models\Settings;
use PickBazar\Database\Models\OrderStatus;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\OrderCreateRequest;
use PickBazar\Http\Requests\OrderUpdateRequest;
use PickBazar\Database\Repositories\OrderRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;


class OrderController extends CoreController
{
    public $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Order[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 10;
        return $this->fetchOrders($request)->paginate($limit)->withQueryString();
    }

    public function fetchOrders(Request $request)
    {
        $user = $request->user();
        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN) && (!isset($request->shop_id) || $request->shop_id === 'undefined')) {
            return $this->repository->with(['children','children.shop','products.shop'])->where('id', '!=', null)->where('parent_id', '=', null); //->paginate($limit);
        } else if ($this->repository->hasPermission($user, $request->shop_id)) {
            if ($user && $user->hasPermissionTo(Permission::STORE_OWNER)) {
                return $this->repository->with('children')->where('shop_id', '=', $request->shop_id)->where('parent_id', '!=', null); //->paginate($limit);
            } elseif ($user && $user->hasPermissionTo(Permission::STAFF)) {
                return $this->repository->with('children')->where('shop_id', '=', $request->shop_id)->where('parent_id', '!=', null); //->paginate($limit);
            }
        } else {
            return $this->repository->with('children')->where('customer_id', '=', $user->id)->where('parent_id', '=', null); //->paginate($limit);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param OrderCreateRequest $request
     * @return LengthAwarePaginator|\Illuminate\Support\Collection|mixed
     */
    public function store(OrderCreateRequest $request)
    {
        return $this->repository->storeOrder($request);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        try {
            $order = $this->repository->with(['products', 'status', 'children.shop'])->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        
        if ($user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            return $order;
        } elseif (isset($order->shop_id)) {
            if ($this->repository->hasPermission($user, $order->shop_id)) {
                return $order;
            }
        } elseif ($user->id === $order->customer_id) {
            return $order;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }
    public function findByTrackingNumber(Request $request, $tracking_number)
    {
        $user = $request->user();
        try {
            $order = $this->repository->with(['products','products.shop', 'status', 'children.shop'])->findOneByFieldOrFail('tracking_number', $tracking_number);
            if ($user->id === $order->customer_id || $user->can('super_admin')) {
                return $order;
            } else {
                throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
            }
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param OrderUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(OrderUpdateRequest $request, $id)
    
    {
        $request->id = $id;
        $order = $this->updateOrder($request);
        return $order;
    }


    public function updateOrder(Request $request)
    {
        try {
            $order = $this->repository->findOrFail($request->id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }

        $user = $request->user();
        if (isset($order->shop_id)) {
            if ($this->repository->hasPermission($user, $order->shop_id)) {
                return $this->changeOrderStatus($order, $request->status);
            }

        } else if ($user->hasPermissionTo(Permission::SUPER_ADMIN)) {
            return $this->changeOrderStatus($order, $request->status);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function changeOrderStatus($order, $status)
    
    {
        $order->status = $status;
        $order->save();
        
        $status=OrderStatus::find($status)->name;

        SMS::orderStatusChanged(
                $order->customer->phone_number,
                $order->customer->name,
                $order->tracking_number,
                $status
            );

        try {
            $children = json_decode($order->children);
        } catch (\Throwable $th) {
            $children = $order->children;
        }
        if (is_array($children) && count($children)) {
            foreach ($order->children as $child_order) {
                $child_order->status = $status;
                $child_order->save();
            }
        }
        return $order;
    }

    // function to exportOrders in csv  format
    public function exportOrder(Request $request)

    {
        $filename = 'orders'.'.csv';
        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=' . $filename,
            'Expires'             => '0',
            'Pragma'              => 'public'
        ];

        $list = $this->repository->get()->toArray();
        if (!count($list)) {
            return response()->stream(function () {
            }, 200, $headers);
        }

        foreach ($list as $key => $value) {
            // push customer name, tracking number
            $list[$key]['tracking_number'] = $value['tracking_number'];
        }
        
        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function () use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $key => $row) {
                if ($key === 0) {
                    $exclude = ['id', 'slug', 'deleted_at','status', 'created_at', 'updated_at', 'shipping_class_id','image','gallery'];
                    $row = array_diff($row, $exclude);
                }
                unset($row['id']);
                unset($row['deleted_at']);
                unset($row['shipping_class_id']);
                unset($row['updated_at']);
                unset($row['created_at']);
                unset($row['slug']);
                unset($row['image']);
                unset($row['gallery']);
                
                fputcsv($FH, $row);
            }
            fclose($FH);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        }   catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }
}

