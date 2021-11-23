<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use PickBazar\Enums\Permission;
use PickBazar\Database\Models\Bill;
use PickBazar\Enums\WithdrawStatus;
use Illuminate\Support\Facades\Schema;

use PickBazar\Database\Models\Balance;
use Illuminate\Database\Schema\Blueprint;
use PickBazar\Exceptions\PickbazarException;
use Illuminate\Database\Migrations\Migration;
use PickBazar\Database\Repositories\BillRepository;

class BillController extends CoreController
{
    public $repository;

    public function __construct(BillRepository $repository)
    {
        $this->repository = $repository;
    }
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Withdraw[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user=$request->user();
        if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)){
            return $this->repository->paginate($limit);
        }
        return $this->repository->where('user_id', '=', $user->id)->paginate($limit);
    }

    public function fetchUserWithdraws(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();

        if ($user->id) {
            return $this->repository->where('user_id', '=', $user->id)->paginate($limit);
        }
    }   

    public function fetchWithdraws(Request $request)
    {
        $user = $request->user();
        $shop_id = $request['shop_id'] ? $request['shop_id'] : false;
        if ($shop_id) {
            if ($user->shops->contains('id', $shop_id)) {
                return $this->repository->with(['shop'])->where('shop_id', '=', $shop_id)->where('shop_id', '!=', NULL);
            } elseif ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {
                if ($shop_id && $shop_id != "undefined") {
                    return $this->repository->with(['shop'])->where('shop_id', '=', $shop_id)->where('shop_id', '!=', NULL);
                } else {
                    return $this->repository->with(['shop'])->with(['user'])->where('amount', '!=', null);
                }
            } else {
                throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
            }
        } else {
            if ($user && $user->hasPermissionTo(Permission::SUPER_ADMIN)) {

                return $this->repository->with(['shop'])->where('id', '!=', null);
            } else {
                throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $data=$request->all();
        $data['user_id']=$user->id;
        $data['bill']=json_encode(json_decode($data['bill']));

        return $this->repository->create($data);
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
        return $this->fetchSingleBill($request);
    }

    public function fetchSingleBill(Request $request)
    {
        $id = $request->id;
        try {
            $bill = $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        
        return $bill;
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
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

    public function approveBill(Request $request)
    {
        $id = $request->id;
        $status = $request->status->value ?? $request->status;
        try {
            $bill = $this->repository->findOrFail($id);
        } catch (Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }

        $bill->status = $status;
        $bill->note = $request->note;
        if($request->approved_amount_percentage){
            $amount=($request->approved_amount_percentage*$bill->bill_amount)/100;
            $bill->approved_amount=$amount;
            $balance = Balance::where('user_id', '=', $bill->user_id)->first();
            $balance->total_earnings = $balance->total_earnings + $amount;
            $balance->current_balance = $balance->current_balance + $amount;
            $balance->save();
        }

        $bill->save();

        return $bill;
    }
}
