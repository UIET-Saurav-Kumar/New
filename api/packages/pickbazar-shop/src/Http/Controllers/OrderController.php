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
use Carbon\Carbon;


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

    // find by date range
    public function findByDateRange(Request $request, $start_date, $end_date)
    {

        $limit = $request->limit ?   $request->limit : 10;

               $start_date =
            //    Carbon::now()->
               $request->start_date;
                                    //  ->toDateTimeString();
                                     //format
        
               $end_date =
            //    Carbon::now()->
               $request->end_date;
                                    //  ->toDateTimeString();
        
            // return Order::whereBetween('created_at',['2022-06-01','2022-06-20'])->get();
            // return Order::whereBetween('created_at',[$start_date,$end_date])->get();
            //order repository with children.shop product.shop 
            return $this->repository->with(['children','children.shop','products.shop'])->whereBetween('created_at',[$start_date,$end_date])->where('id', '!=', null)->where('parent_id', '=', null)->get();
            // sort as from high to low
            // return $orders->sortByDesc('created_at');

            // return $this->repository->with(['children','children.shop','products.shop'])->whereBetween('created_at',[$start_date,$end_date])->get();
            //   return Order::whereBetween('created_at',['Wed,Jun 01, 2022 12AM','Mon,Jun 20, 2022 12AM'])->get();
            //return Order::whereBetween('created_at',['24-06-2022','25-06-2022'])->get();
               
    }

    //find by date range and shop name
    public function findByDateRangeAndShopName(Request $request, $start_date, $end_date, $shop_name)
    {
        $start_date =
            //    Carbon::now()->
               $request->start_date;
                                    //  ->toDateTimeString();
                                     //format
        
               $end_date =
            //    Carbon::now()->
               $request->end_date;
                                    //  ->toDateTimeString();
        
            // return Order::whereBetween('created_at',['2022-06-01','2022-06-20'])->get();
            // return Order::whereBetween('created_at',[$start_date,$end_date])->get();
            //order list without child orders
            // return $this->repository->with(['products','products.shop'])->whereBetween('created_at',[$start_date,$end_date])->where('shop_id', '=', $shop_name)->get();

        // return order without child orders
        return $this->repository->with(['products','products.shop'])->whereBetween('created_at',[$start_date,$end_date])->where('shop_id', 'like', '%'.$shop_name.'%')->where('id', '!=', null)->where('parent_id', '=', null)->get();

            // return $this->repository->with(['children','children.shop','products.shop'])->whereBetween('created_at',[$start_date,$end_date])->where('shop_id', '=', $shop_name)->get();
            //   return Order::whereBetween('created_at',['Wed,Jun 01, 2022 12AM','Mon,Jun 20, 2022 12AM'])->get();
            //return Order::whereBetween('created_at',['24-06-2022','25-06-2022'])->get();
               
    }

    //search by date range and shop name like %shop_name%
    public function searchByDateRangeAndShopName(Request $request, $start_date, $end_date, $shop_name)
    {
        $start_date =
            //    Carbon::now()->
               $request->start_date;
                                    //  ->toDateTimeString();
                                     //format
        
               $end_date =
            //    Carbon::now()->
               $request->end_date;
                                    //  ->toDateTimeString();
        
            // return Order::whereBetween('created_at',['2022-06-01','2022-06-20'])->get();
            // return Order::whereBetween('created_at',[$start_date,$end_date])->get();
            //order list without child orders
            // return $this->repository->with(['products','products.shop'])->whereBetween('created_at',[$start_date,$end_date])->where('shop_id', '=', $shop_name)->get();

        // return order without child orders
        return $this->repository->with(['products','products.shop'])->whereBetween('created_at',[$start_date,$end_date])->where('shop_id', 'like', '%'.$shop_name.'%')->where('id', '!=', null)->where('parent_id', '=', null)->get();

            // return $this->repository->with(['children','children.shop','products.shop'])->whereBetween('created_at',[$start_date,$end_date])->where('shop_id', '=', $shop_name)->get();
            //   return Order::whereBetween('created_at',['Wed,Jun 01, 2022 12AM','Mon,Jun 20, 2022 12AM'])->get();
            //return Order::whereBetween('created_at',['24-06-2022','25-06-2022'])->get();
               
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


    public function exportOrder(Request $request, $start_date, $end_date)
    {
        $filename = 'Orders'.'.csv';

        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=' . $filename,
            'Expires'             => '0',
            'Pragma'              => 'public'
        ];
        //get start date and end date from findByDateRange function

        $start_date = $request->start_date;
        $end_date = $request->end_date;
          // find by date range list
          // if start date and end date is not empty then find by date range else find by shop name
        if ($start_date && $end_date) {
            $list = $this->repository->with(['children','children.shop','status','products','products.shop'])->whereBetween('created_at',[$start_date,$end_date])->where('id', '!=', null)->where('parent_id', '=', null)->get()->toArray();
        } else {
            // $list = $this->repository->with(['products','products.shop', 'status', 'children.shop'])->get()->toArray();
            $list = $this->repository->with(['children','children.shop','status','products','products.shop'])->whereBetween('created_at',['2021-01-01',Carbon::now()->toDateTimeString()])->where('id', '!=', null)->where('parent_id', '=', null)->get()->toArray();
        }

        
        if (!count($list)) {
            return response()->stream(function () {
            }, 200, $headers);
        }
        foreach($list as $key=>$val)
        {
            $shopnames = "";
            $list[$key]['customer_name'] = $val['customer']['name'] ?? '';
            $list[$key]['customer_email'] = $val['customer']['email'] ?? '';
            $list[$key]['order_status'] = $val['status']['name'] ?? '';
            if(!empty($val['children']))
            {
                foreach($val['children'] as $shop)
                {
                    $shopnames = !empty($shop['shop']) ? $shopnames.$shop['shop']['name'].", " : '';
                }
            }
            
            $list[$key]['shop_name'] = trim($shopnames);
            //created_at
            // $list[$key]['created_at'] = $val['created_at']->format('d-m-Y H:i:s');
        }
        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function () use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $key => $row) {
                if ($key === 0) {
                    $exclude = ['customer_id','id', 'status', 'deleted_at','updated_at', 'shipping_address', 'billing_address', 'customer', 'products','gateway_response', 'coupon_id', 'parent_id','shop_id','children'];
                    $row = array_diff($row, $exclude);
                }
                
                unset($row['id']);
                unset($row['customer_id']);
                unset($row['status']);
                unset($row['deleted_at']);
                unset($row['updated_at']);
                // unset($row['created_at']);

                unset($row['shipping_address']);
                unset($row['billing_address']);
                unset($row['customer']);
                unset($row['products']);
                unset($row['gateway_response']);
                unset($row['coupon_id']);
                unset($row['parent_id']);
                unset($row['shop_id']);
                unset($row['children']);
                
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

