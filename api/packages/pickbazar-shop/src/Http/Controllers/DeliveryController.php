<?php

namespace PickBazar\Http\Controllers;

use App\Models\DeliveryConfig;
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
use LoveyCom\CashFree\PaymentGateway\Order as CashFreeOrder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

use PickBazar\Enums\WithdrawStatus;
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
        return $Delivery->where('payment_method',"!=",NULL)->paginate($limit);
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

    public function fetchAdminDeliverys(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;

        return $this->repository->paginate($limit);
        
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
        return $this->repository->storeDelivery($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param DeliveryRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function payment(DeliveryRequest $request)
    {
        $delivery=$this->repository->find($request->id);

        $user=$request->user();
        if($request->payment_gateway=="cod"){
            $delivery->payment_method="cod";
            $delivery->save();
        }else{
            $delivery->payment_method=$request->payment_gateway;
            $delivery->save();
            $orderFree = new CashFreeOrder();
            $od["orderId"] = $delivery->tracking_number;
            $od["orderAmount"] = $delivery->amount;
            $od["orderNote"] = "Subscription";
            $od["customerPhone"] = $delivery->sender_phone_number;
            $od["customerName"] = $user->name;
            $od["customerEmail"] = $user->email ?? "test@cashfree.com";
            $od["payment_methods"] = $request->payment_gateway;
            $od["returnUrl"] = url("user/delivery/payment");
            $od["notifyUrl"] = url("order/success");
            $orderFree->create($od);
        }

        
        return "success";
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
            $Delivery = $this->repository->findOrFail($id);
            
            return $Delivery;
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
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

    public function fetchDeliveryCost(){
        return DeliveryConfig::find(1);
    }

    public function storeDeliveryCost(Request $request){
        $config=DeliveryConfig::find(1);
        if($config){
            $config->update($request->all());
        }
        $config=DeliveryConfig::create($request->all());

        return $config;
    }
}
