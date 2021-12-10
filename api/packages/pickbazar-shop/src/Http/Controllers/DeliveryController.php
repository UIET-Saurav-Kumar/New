<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use PickBazar\Http\Util\SMS;
use PickBazar\Database\Models\DeliveryConfig;
use PickBazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use PickBazar\Enums\WithdrawStatus;
use Illuminate\Support\Facades\Schema;
use PickBazar\Database\Models\Balance;
use PickBazar\Database\Models\Delivery;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\DeliveryRequest;
use Prettus\Validator\Exceptions\ValidatorException;

use PickBazar\Database\Repositories\DeliveryRepository;
use LoveyCom\CashFree\PaymentGateway\Order as CashFreeOrder;

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
        return $Delivery->where('payment_method', "!=", NULL)->orderBy('id', 'desc')->paginate($limit);
    }

    public function fetchDeliverys(Request $request)
    {
        $user = $request->user();

        if ($user) {
            return $this->repository->where('user_id', $user->id)->where('is_approved',1)->with(['user']);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }


    public function fetchUserDeliverys(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        $user = $request->user();

        if ($user->id) {
            return $this->repository->where('user_id', '=', $user->id)->where('is_approved',1)->orderBy('id', 'desc')->paginate($limit);
        }
    }

    public function fetchAdminDeliverys(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;

        return $this->repository->where('is_approved',1)->orderBy('id', 'desc')->paginate($limit);
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
        $delivery = $this->repository->find($request->id);
        $user = $request->user();
        if ($request->payment_gateway == "cod") {

            $delivery->payment_method = "cod";
            $delivery->is_approved=1;
            $delivery->save();
            SMS::customerPurchase($delivery->sender_phone_number, $request->user()->name);
        } else {
            $payment_method = 'cc';

            if ($payment_method == 'cashfree') {
                $payment_method = 'cc';
            }
            if ($payment_method == 'upi') {
                $payment_method = 'upi';
            }
            if ($payment_method == 'wallet') {
                $payment_method = 'dc';
            }

            $orderFree = new CashFreeOrder();
            $od["orderId"] = $delivery->tracking_number;
            $od["orderAmount"] = $delivery->amount;
            $od["orderNote"] = "Subscription";
            $od["customerPhone"] = $delivery->sender_phone_number;
            $od["customerName"] = $user->name;
            $od["customerEmail"] = $user->email ?? "test@cashfree.com";
            $od["payment_methods"] = $payment_method;
            $od["returnUrl"] = url("delivery/payment");
            $od["notifyUrl"] = url("delivery/success");
            $orderFree->create($od);

            SMS::customerPurchase($delivery->sender_phone_number, $request->user()->name);

            $delivery->payment_method = $request->payment_gateway;
            $delivery->save();

            $link = $orderFree->getLink($od['orderId']);

            return json_encode($link);
        }


        return $delivery;
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
        $validatedData["user_id"] = $user->id;
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

    public function fetchDeliveryCost()
    {
        return DeliveryConfig::find(1);
    }

    public function storeDeliveryCost(Request $request)
    {
        $config = DeliveryConfig::find(1);
        if ($config) {
            $config->update($request->all());
        }
        $config = DeliveryConfig::create($request->all());

        return $config;
    }

    public function returnToPayment(Request $request)
    {
        $url = "https://buylowcal.com/user/delivery/payment";

        return redirect()->away($url);
    }
}
