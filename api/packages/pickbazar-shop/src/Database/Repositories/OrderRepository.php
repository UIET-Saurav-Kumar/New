<?php


namespace PickBazar\Database\Repositories;

use Illuminate\Support\Str;
use PickBazar\Http\Util\SMS;
use App\Models\ReferralEarning;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use PickBazar\Database\Models\Log;
use PickBazar\Events\OrderCreated;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\Order;
use PickBazar\Database\Models\Coupon;
use PickBazar\Database\Models\Balance;
use PickBazar\Database\Models\Product;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Repository\Criteria\RequestCriteria;
use PickBazar\Database\Models\ReferralCommission;
use Prettus\Validator\Exceptions\ValidatorException;
use Prettus\Repository\Exceptions\RepositoryException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Ignited\LaravelOmnipay\Facades\OmnipayFacade as Omnipay;

class OrderRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'tracking_number' => 'like',
        'shop_id',
    ];
    /**
     * @var string[]
     */
    protected $dataArray = [
        'tracking_number',
        'customer_id',
        'shop_id',
        'status',
        'amount',
        'sales_tax',
        'paid_total',
        'total',
        'delivery_time',
        'payment_gateway',
        'discount',
        'coupon_id',
        'payment_id',
        'logistics_provider',
        'billing_address',
        'shipping_address',
        'delivery_fee',
        'customer_contact'
    ];

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Order::class;
    }


    /**
     * @param $request
     * @return LengthAwarePaginator|JsonResponse|Collection|mixed
     */

    public function storeOrder($request)
    {
        $request['tracking_number'] = Str::random(12);
        $request['customer_id'] = $request->user()->id;
        $discount = $this->calculateDiscount($request);
        if ($discount) {

            $request['paid_total'] = $request['amount'] + $request['sales_tax'] + $request['delivery_fee'] - $discount;
            $request['total'] = $request['amount'] + $request['sales_tax'] + $request['delivery_fee'] - $discount;


            $request['discount'] =  $discount;
        } else {
            $request['paid_total'] = $request['amount'] + $request['sales_tax'] + $request['delivery_fee'];
            $request['total'] = $request['amount'] + $request['sales_tax'] + $request['delivery_fee'];
        }
        $payment_gateway = $request['payment_gateway'];

        switch ($payment_gateway) {
            case 'cod':
                // Cash on Delivery no need to capture payment
                return $this->createOrder($request);
                break;
            case 'paypal':
                // For default gateway no need to set gateway
                Omnipay::setGateway('paypal');
                break;
        }

        $response = $this->capturePayment($request);
        SMS::customerPurchase($request->user()->phone_number,$request->user()->name);
        if ($response->isSuccessful()) {
            $payment_id = $response->getTransactionReference();
            $request['payment_id'] = $payment_id;
            $order = $this->createOrder($request);
            return $order;
        } elseif ($response->isRedirect()) {
            return $response->getRedirectResponse();
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.PAYMENT_FAILED');
        }
    }

    /**
     * @param $request
     * @return mixed
     */
    protected function capturePayment($request)
    {
        $card = Omnipay::creditCard($request['card']);
        $amount = $request['paid_total'];
        $currency = 'USD';
        $transaction =
            Omnipay::purchase(array(
                'amount'   => $amount,
                'currency' => $currency,
                'card'     => $card,
            ));
        return $transaction->send();
    }


    private function formattedAddress($order)
    {
        $location=json_decode(json_encode($order->shop->settings["location"]));
        if($location){
            $location->formattedAddress;
        }
        return NULL;
    }


    //   #attributes: array:17 [
    //     "tracking_number" => "8TGF5Fc9zmGX"
    //     "customer_id" => 21
    //     "status" => 1
    //     "amount" => 21
    //     "sales_tax" => 0.42
    //     "paid_total" => 71.42
    //     "total" => 71.42
    //     "delivery_time" => "Self Pickup"
    //     "payment_gateway" => "cod"
    //     "discount" => 0
    //     "billing_address" => "{"zip":"1234","city":"test","state":"test","country":"test","street_address":"test"}"
    //     "shipping_address" => "[]"
    //     "delivery_fee" => 50
    //     "customer_contact" => "9(999) 999 99 99"
    //     "updated_at" => "2021-09-27 12:47:01"
    //     "created_at" => "2021-09-27 12:47:01"
    //     "id" => 38
    //   ]
    //   #original: array:17 [
    //     "tracking_number" => "8TGF5Fc9zmGX"
    //     "customer_id" => 21
    //     "status" => 1
    //     "amount" => 21
    //     "sales_tax" => 0.42
    //     "paid_total" => 71.42
    //     "total" => 71.42
    //     "delivery_time" => "Self Pickup"
    //     "payment_gateway" => "cod"
    //     "discount" => 0
    //     "billing_address" => "{"zip":"1234","city":"test","state":"test","country":"test","street_address":"test"}"
    //     "shipping_address" => "[]"
    //     "delivery_fee" => 50
    //     "customer_contact" => "9(999) 999 99 99"
    //     "updated_at" => "2021-09-27 12:47:01"
    //     "created_at" => "2021-09-27 12:47:01"
    //     "id" => 38
    //   ]
    /**
     * @param $request
     * @return array|LengthAwarePaginator|Collection|mixed
     */


    // array:14 [
    //     "tracking_number" => "B8hh2aEzBSwY"
    //     "customer_id" => 21
    //     "status" => 1
    //     "amount" => 21
    //     "sales_tax" => 0.42
    //     "paid_total" => 71.42
    //     "total" => 71.42
    //     "delivery_time" => "Self Pickup"
    //     "payment_gateway" => "cod"
    //     "discount" => 0
    //     "billing_address" => array:5 [
    //       "zip" => "1234"
    //       "city" => "test"
    //       "state" => "test"
    //       "country" => "test"
    //       "street_address" => "test"
    //     ]
    //     "shipping_address" => []
    //     "delivery_fee" => 50
    //     "customer_contact" => "9(999) 999 99 99"
    //   ]
    protected function createOrder($request)
    {
        try {
            $orderInput = $request->only($this->dataArray);
            $products = $this->processProducts($request['products']);
            $order = $this->create($orderInput);
            $id=isset($order["id"])?$order["id"]:$order->id;
            $order=Order::findOrFail($id);

            $order->products()->attach($products);
            $this->createChildOrder($order->id, $request);
            $this->calculateShopIncome($order, $request);
            $order->children = $order->children;

            if($order)
            {
                $product_id=$request->products[0]["product_id"];
                $product=Product::find($product_id);
                $user=$request->user();                
                Log::create([
                    "user_id"=>($user)?$user->id:"",
                    "ip_address"=>$request->ip(),
                    "order_id"=>$order->id,
                    "location"=>$request->location,
                    'shop_id'=>$product->shop_id,
                    "type"=>"order"
                ]);
            }
            
            return $order;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    protected function calculateShopIncome($parent_order,$request)
    {
        foreach ($parent_order->children as  $order) {
            $balance = Balance::where('shop_id', '=', $order->shop_id)->first();
            $adminCommissionRate = $balance->admin_commission_rate;
            $shop_earnings = ($order->total * (100 - $adminCommissionRate)) / 100;
            $commission_value = ($order->total * $adminCommissionRate) / 100 ;
            $this->distribute_commission($order,$commission_value,$request);
            $balance->total_earnings = $balance->total_earnings + $shop_earnings;
            $balance->current_balance = $balance->current_balance + $shop_earnings;
            $balance->save();
        }
    }

    private function distribute_commission($order,$commission_value,$request)
    {

        $customer=User::find($request->customer_id);

        $level1=($customer)?$this->get_uplink($customer):"";
        $level2=($level1)?$this->get_uplink($level1):"";
        $level3=($level2)?$this->get_uplink($level2):"";

        $referral_commission=ReferralCommission::find(1);
        if($customer){
            $commission=($commission_value*(float)$referral_commission->customer_commission)/100;
            $this->createReferralEarning(
                $order,
                $commission,
                $request,
                $customer,
                $customer,
                $commission_value,
                "0");
        }
        if($level1){
            $commission=($commission_value*(float)$referral_commission->level1_commission)/100;
            $this->createReferralEarning(
                $order,
                $commission,
                $request,
                $level1,
                $customer,
                $commission_value,
                "1");
        }
        if($level2){
            $commission=($commission_value*(float)$referral_commission->level2_commission)/100;
            $this->createReferralEarning(
                $order,
                $commission,
                $request,
                $level2,
                $customer,
                $commission_value,
                "2");
        }
        if($level3){
            $commission=($commission_value*(float)$referral_commission->level3_commission)/100;
            $this->createReferralEarning(
                $order,
                $commission,
                $request,
                $level3,
                $customer,
                $commission_value,
                "3");
        }
    }

    private function createReferralEarning($order,$commission_value,$request,$level,$customer,$commission,$commission_level)
    {
        $this->customerBalance($commission_value,$level);

        ReferralEarning::create([
            "user_id"=>$level->id,
            "customer_id"=>$customer->id,
            "customer_name"=>$customer->name,
            "order_id"=>$order->id,
            "order_track_number"=>$order->tracking_number,
            "commission_value"=>$order->total,
            "shop_name"=>$order->shop->name,
            "earning"=>$commission_value,
            "level"=>$commission_level
        ]);
    }

    private function customerBalance($price,$user)
    {
        $balance = Balance::where('user_id', '=', $user->id)->first();
        if($balance){
            $balance->total_earnings = $balance->total_earnings + $price;
            $balance->current_balance = $balance->current_balance + $price;
            $balance->save();
        }else{
            Balance::create([
                "user_id"=>$user->id,
                "total_earnings"=>$price,
                "current_balance"=>$price,
            ]);
        }
    }

    private function get_uplink($user)
    {
        return ($user->invited_by)?User::find($user->invited_by):"";
    }

    protected function processProducts($products)
    {
        foreach ($products as $key => $product) {
            if (!isset($product['variation_option_id'])) {
                $product['variation_option_id'] = null;
                $products[$key] = $product;
            }
        }
        return $products;
    }

    protected function calculateDiscount($request)
    {
        try {
            if (!isset($request['coupon_id'])) {
                return false;
            }
            $coupon = Coupon::findOrFail($request['coupon_id']);
            if (!$coupon->is_valid) {
                return false;
            }
            switch ($coupon->type) {
                case 'percentage':
                    return ($request['amount'] * $coupon->amount) / 100;
                case 'fixed':
                    return $coupon->amount;
                    break;
                case 'free_shipping':
                    return isset($request['delivery_fee']) ? $request['delivery_fee'] : false;
                    break;
            }
            return false;
        } catch (\Exception $exception) {
            return false;
        }
    }

    public function createChildOrder($id, $request)
    {
        $products = $request->products;
        $productsByShop = [];

        foreach ($products as $key => $cartProduct) {
            $product = Product::findOrFail($cartProduct['product_id']);
            $productsByShop[$product->shop_id][] = $cartProduct;
        }

        foreach ($productsByShop as $shop_id => $cartProduct) {
            $amount = array_sum(array_column($cartProduct, 'subtotal'));
            $orderInput = [
                'tracking_number' => Str::random(12),
                'shop_id' => $shop_id,
                'status' => $request->status,
                'customer_id' => $request->customer_id,
                'shipping_address' => $request->shipping_address,
                'customer_contact' => $request->customer_contact,
                'delivery_time' => $request->delivery_time,
                'delivery_fee' => 0,
                'sales_tax' => 0,
                'discount' => 0,
                'parent_id' => $id,
                'amount' => $amount,
                'total' => $amount,
                'paid_total' => $amount,
            ];

            $order = $this->create($orderInput);
            $order->products()->attach($cartProduct);
        }
    }
}
// array:14 [
//     "tracking_number" => "8ewKFepsbzab"
//     "customer_id" => 21
//     "status" => 1
//     "amount" => 40
//     "sales_tax" => 0.8
//     "paid_total" => 90.8
//     "total" => 90.8
//     "delivery_time" => "Self Pickup"
//     "payment_gateway" => "cod"
//     "discount" => 0
//     "billing_address" => array:5 [
//       "zip" => "1234"
//       "city" => "test"
//       "state" => "test"
//       "country" => "test"
//       "street_address" => "test"
//     ]
//     "shipping_address" => []
//     "delivery_fee" => 50
//     "customer_contact" => "9(999) 999 99 99"
//   ]































// #attributes: array:17 [
//     "tracking_number" => "E2bmJW7Iuv22"
//     "customer_id" => 21
//     "status" => 1
//     "amount" => 40
//     "sales_tax" => 0.8
//     "paid_total" => 90.8
//     "total" => 90.8
//     "delivery_time" => "Self Pickup"
//     "payment_gateway" => "cod"
//     "discount" => 0
//     "billing_address" => "{"zip":"1234","city":"test","state":"test","country":"test","street_address":"test"}"
//     "shipping_address" => "[]"
//     "delivery_fee" => 50
//     "customer_contact" => "9(999) 999 99 99"
//     "updated_at" => "2021-09-27 12:51:38"
//     "created_at" => "2021-09-27 12:51:38"
//     "id" => 39
//   ]
//   #original: array:17 [
//     "tracking_number" => "E2bmJW7Iuv22"
//     "customer_id" => 21
//     "status" => 1
//     "amount" => 40
//     "sales_tax" => 0.8
//     "paid_total" => 90.8
//     "total" => 90.8
//     "delivery_time" => "Self Pickup"
//     "payment_gateway" => "cod"
//     "discount" => 0
//     "billing_address" => "{"zip":"1234","city":"test","state":"test","country":"test","street_address":"test"}"
//     "shipping_address" => "[]"
//     "delivery_fee" => 50
//     "customer_contact" => "9(999) 999 99 99"
//     "updated_at" => "2021-09-27 12:51:38"
//     "created_at" => "2021-09-27 12:51:38"
//     "id" => 39
//   ]