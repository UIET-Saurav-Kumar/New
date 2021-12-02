<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use PickBazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Balance;
use PickBazar\Database\Models\Delivery;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\DeliveryRequest;
use Prettus\Validator\Exceptions\ValidatorException;
use PickBazar\Database\Repositories\DeliveryRepository;


class DeliveryController extends CoreController
{
    
    public $repository;

    public function __construct(DeliveryRepository $repository)
    {
        $this->repository = $repository;
    }
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Delivery[]
     */

    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $Delivery = $this->fetchDeliverys($request);
        return $Delivery->paginate($limit);
    }

    public function fetchDeliverys(Request $request)
    {
        $user = $request->user();
        
        if ($user) {           
            return $this->repository->where('user_id',$user->id)->with(['user']);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }


    public function fetchUserDeliverys(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();

        if ($user->id){
            return $this->repository->where('user_id', '=', $user->id)->paginate($limit);
        }
        
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param DeliveryRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(DeliveryRequest $request)
    {
        $validatedData = $request->validated();
        if (isset($validatedData['shop_id'])) {
            $balance = Balance::where('shop_id', '=', $validatedData['shop_id'])->first();
            if (isset($balance->current_balance) && $balance->current_balance >= $validatedData['amount']) {
                $Delivery = $this->repository->create($validatedData);
                $balance->Deliveryn_amount = $balance->Deliveryn_amount + $validatedData['amount'];
                $balance->current_balance = $balance->current_balance - $validatedData['amount'];
                $balance->save();
                $Delivery->shop = $Delivery->shop;
                return $Delivery;
            } else {
                throw new PickbazarException('PICKBAZAR_ERROR.INSUFFICIENT_BALANCE');
            }
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.Delivery_MUST_BE_ATTACHED_TO_SHOP');
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param DeliveryRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function storeUserDeliverys(Request $request)
    {
        $validatedData = $request->all();
        $user = $request->user();
        $validatedData["user_id"]=$user->id;
        if (isset($user)) {
            $balance = Balance::where('user_id', '=', $user->id)->first();
            if (isset($balance->current_balance) && $balance->current_balance >= $validatedData['amount']) {
                $Delivery = $this->repository->create($validatedData);
                $balance->Deliveryn_amount = $balance->Deliveryn_amount + $validatedData['amount'];
                $balance->current_balance = $balance->current_balance - $validatedData['amount'];
                $balance->save();
                $Delivery->shop = $Delivery->shop;
                return $Delivery;
            } else {
                throw new PickbazarException('PICKBAZAR_ERROR.INSUFFICIENT_BALANCE');
            }
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.Delivery_MUST_BE_ATTACHED_TO_SHOP');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(Request $request, $id)
    {
        $request->id = $id;
        return $this->fetchSingleDelivery($request);
    }

    public function fetchSingleDelivery(Request $request)
    {
        $id = $request->id;
        try {
            $Delivery = $this->repository->with(['shop'])->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        if ($request->user() && ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN) || $request->user()->shops->contains('id', $Delivery->shop_id))) {
            return $Delivery;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param DeliveryRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(DeliveryRequest $request, $id)
    {
        throw new PickbazarException('PICKBAZAR_ERROR.ACTION_NOT_VALID');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        if ($request->user() && $request->user()->hasPermissionTo(Permission::SUPER_ADMIN)) {
            try {
                return $this->repository->findOrFail($id)->delete();
            } catch (\Exception $e) {
                throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
            }
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function approveDelivery(Request $request)
    {
        $id = $request->id;
        $status = $request->status->value ?? $request->status;
        try {
            $Delivery = $this->repository->findOrFail($id);
        } catch (Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }

        $Delivery->status = $status;

        $Delivery->save();

        return $Delivery;
    }
}
