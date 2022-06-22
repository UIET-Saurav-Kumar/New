<?php


namespace PickBazar\Database\Repositories;

use Exception;
use Illuminate\Support\Str;
use PickBazar\Http\Util\SMS;
use App\Models\ReferralEarning;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use PickBazar\Database\Models\Log;
use PickBazar\Events\OrderCreated;
use PickBazar\Database\Models\Shop;
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
use LoveyCom\CashFree\PaymentGateway\Order as CashFreeOrder;
use PickBazar\Helpers\InteraktHelper;

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
        'description',
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


   public  function  ip_AddressLocation( $request, $ip) {

    $ip = $request->ip;

    $data = \Location::get($ip);

    return $data;

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
        $user = $request->user();
        $request['tracking_number'] = Str::random(12);
        $request['customer_id'] = $request->user()->id;
        $discount = $this->calculateDiscount($request);
        if ($discount) {

            $request['paid_total'] = $request['amount'] + $request['sales_tax']  - $discount;
            // + $request['delivery_fee']
            $request['total'] = $request['amount'] + $request['sales_tax']  - $discount;
            // + $request['delivery_fee']


            $request['discount'] =  $discount;
        } else {
            $request['paid_total'] = $request['amount'] + $request['sales_tax'] ;
            // + $request['delivery_fee']
            $request['total'] = $request['amount'] + $request['sales_tax'] ;
            // + $request['delivery_fee']
        }
        $payment_gateway = $request['payment_gateway'];

        switch ($payment_gateway) {
            case 'cod':
                // Cash on Delivery no need to capture payment
                
                break;
            case 'cashfree':
                // For default gateway no need to set gateway
                // Omnipay::setGateway('cashfree');
                // return $this->createOrder($request);
                break;
        }
        if($payment_gateway=='cod'){
            $order=$this->createOrder($request);
            $this->sendSMS($order); 

            return $order;

        }
        
        // $response = $this->capturePayment($request);
        
        
        $payment_method = 'cc';
        if($payment_method == 'cashfree')
        {
            $payment_method = 'cc';
        }
        if($payment_method == 'upi')
        {
            $payment_method = 'upi';
        }
        if($payment_method == 'wallet')
        {
            $payment_method = 'dc';
        }
        
        $orderFree = new CashFreeOrder();
        $od["orderId"] = $request['tracking_number'];
        $od["orderAmount"] = $request['total'];
        $od["orderNote"] = "Subscription";
        $od["customerPhone"] = $request->customer_contact;
        $od["customerName"] = $user->name;
        $od["customerEmail"] = $user->email ?? "test@cashfree.com";
        $od["payment_methods"] = $payment_method;
        $od["returnUrl"] =  url("order/success");
        $od["notifyUrl"] = url("order/success");
        $orderFree->create($od);
        $order = $this->createOrder($request);

        
        $link = $orderFree->getLink($od['orderId']);
        return json_encode($link);

    }

   private function sendSMS($order){

        try{
            
            if($order){
                if($order->shop_id){
                    $shop=Shop::find($order->shop_id);
                    $customer=$order->customer;
                    $phone_number=$this->clearStr($order->customer_contact);
                    SMS::customerPurchase($phone_number,$customer->name,$shop->name);

                    // enable msg to vendor
                    if(isset($shop)){
                        $user=$shop->owner;
                        
                            SMS::purchaseToVendor('9056147024', $user->name);    
                        
                    }
                }    
            }
        }catch(Exception $e) {

        }
           
    }

    private function clearStr($str){
        
        $str=str_replace("(","",$str);
        $str=str_replace(")","",$str);
        $str=str_replace(" ","",$str);
        return $str;
    }
    /**
     * @param $request
     * @return mixed
     */
    protected function capturePayment($request)
    {
        $card = Omnipay::creditCard($request['card']);
        $amount = $request['paid_total'];
        $currency = 'INR';
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

    /**
     * @param $request
     * @return array|LengthAwarePaginator|Collection|mixed
     */    
    protected function createOrder($request)
    {
        try {
            $orderInput = $request->only($this->dataArray);
            $products = $this->processProducts($request['products']);
            $order = $this->create($orderInput);
            $this->sendSMS($order); 
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
                #---------------------creating whatsapp message-----------------#
                $payload = array(
                    "userId"=> $user->id,
                    "phoneNumber"=> $user->phone_number,
                    "countryCode"=> "+91",
                    "event"=> "Order Placed Successfully",
                    "traits"=> [
                        "productDetail"=> json_encode($request->products),
                         'shop_name'=> $product->shop->name,
                        'product_name'=> $product->name,
                        "price"=> $request->amount,
                        "orderId"=> $request->tracking_number,
                        "delivery_time"=> $request->delivery_time,
                        'description'=> $request->description,
                        "payment_gateway"=> $request->payment_gateway,
                        "currency"=>"INR"
                    ],
                    "createdAt"=> date('Y-m-d H:i:s')
                );
                
                $interkt_response = $this->createWhatsappOrderEvent($payload);
                #---------------------creating whatsapp message-----------------#
            }
            $order->interakt_response = $interkt_response;
            return $order;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    protected function calculateShopIncome($parent_order, $request)
    {
        foreach ($parent_order->children as  $order) {
            $balance = Balance::where('shop_id', '=', $order->shop_id)->first();
            $adminCommissionRate = $balance->admin_commission_rate;
            $shop_earnings = ($order->total * (100 - $adminCommissionRate)) / 100;
            $commission_value = ($order->total * $adminCommissionRate) / 100;
            $this->distribute_commission($order, $commission_value, $request);
            $balance->total_earnings = $balance->total_earnings + $shop_earnings;
            $balance->current_balance = $balance->current_balance + $shop_earnings;
            $balance->save();
        }
    }

    private function distribute_commission($order, $commission_value, $request)
    {
        $customer = User::find($request->customer_id);
        $level1 = ($customer) ? $this->get_uplink($customer) : "";
        $level2 = ($level1) ? $this->get_uplink($level1) : "";
        $level3 = ($level2) ? $this->get_uplink($level2) : "";

        $referral_commission = ReferralCommission::find(1);
        if ($customer) {
            $commission = ($commission_value * (float)$referral_commission->customer_commission) / 100;
            $this->createReferralEarning(
                $order,
                $commission,
                $request,
                $customer,
                $customer,
                $commission_value,
                "0"
            );
        }
        if ($level1) {
            $commission = ($commission_value * (float)$referral_commission->level1_commission) / 100;
            $this->createReferralEarning(
                $order,
                $commission,
                $request,
                $level1,
                $customer,
                $commission_value,
                "1"
            );
        }
        if ($level2) {
            $commission = ($commission_value * (float)$referral_commission->level2_commission) / 100;
            $this->createReferralEarning(
                $order,
                $commission,
                $request,
                $level2,
                $customer,
                $commission_value,
                "2"
            );
        }
        if ($level3) {
            $commission = ($commission_value * (float)$referral_commission->level3_commission) / 100;
            $this->createReferralEarning(
                $order,
                $commission,
                $request,
                $level3,
                $customer,
                $commission_value,
                "3"
            );
        }
    }

    private function createReferralEarning($order, $commission_value, $request, $level, $customer, $commission, $commission_level)
    {
        $commission_value=round(floatval($commission_value),2);

        ReferralEarning::create([
            "user_id" => $level->id,
            "customer_id" => $customer->id,
            "customer_name" => $customer->name,
            "order_id" => $order->id,
            "order_track_number" => $order->tracking_number,
            "commission_value" => $order->total,
            "shop_name" => $order->shop->name,
            "earning" => $commission_value,
            "level" => $commission_level
        ]);

        $balance = Balance::firstOrNew(['user_id' => $level->id]);
        $balance->total_earnings= $balance->total_earnings + $commission_value;
        $balance->current_balance=$balance->current_balance + $commission_value;
        $balance->save();
    }

    private function get_uplink($user)
    {
        return ($user->invited_by) ? User::find($user->invited_by) : "";
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
            $delivery_fee=$this->getDeliveryCharges($request,$shop_id);
            $orderInput = [
                'tracking_number' => Str::random(12),
                'shop_id' => $shop_id,
                'status' => $request->status,
                'customer_id' => $request->customer_id,
                'shipping_address' => $request->shipping_address,
                'customer_contact' => $request->customer_contact,
                'delivery_time' => $request->delivery_time,
                'delivery_fee' => $delivery_fee,
                'sales_tax' => 0,
                'discount' => 0,
                'parent_id' => $id,
                'amount' => $amount,
                'total' => $amount+$delivery_fee,
                'paid_total' => $amount+$delivery_fee,
            ];

            $order = $this->create($orderInput);
            
            $this->sendSMS($order); 

            foreach($cartProduct as $product){
                $order->products()->attach([$product]);
            }
            
        }
    }

    public function getDeliveryCharges($request,$shop_id){
        $shop=Shop::find($shop_id);
        if($request['delivery_fee']>0){
            return $shop->delivery_charges;
        }
        return 0;
    }

    public function createWhatsappOrderEvent($payload)
    {
        $CURLOPT_POSTFIELDS     = $payload;
        
        $endpoint = 'track/events/';

        $response   = InteraktHelper::interaktApi(json_encode($CURLOPT_POSTFIELDS),$endpoint);

        return $response;
    }
}
