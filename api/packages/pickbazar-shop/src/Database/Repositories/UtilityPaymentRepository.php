<?php


namespace PickBazar\Database\Repositories;

use Exception;
use Carbon\Carbon;
use Illuminate\Support\Str;
use PickBazar\Http\Util\SMS;
use App\Models\ReferralEarning;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use PickBazar\Database\Models\Log;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\Coupon;
use PickBazar\Helpers\InteraktHelper;
use PickBazar\Database\Models\Balance;
use PickBazar\Database\Models\Product;
use Illuminate\Support\Facades\Request;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Database\Models\UtilityPayment;
use Prettus\Repository\Criteria\RequestCriteria;
use PickBazar\Database\Models\ReferralCommission;
use Prettus\Validator\Exceptions\ValidatorException;
use Prettus\Repository\Exceptions\RepositoryException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Ignited\LaravelOmnipay\Facades\OmnipayFacade as Omnipay;
use LoveyCom\CashFree\PaymentGateway\Order as CashFreeOrder;


class UtilityPaymentRepository extends BaseRepository
{
    /**
     * @var string[]
     */
    
    protected $dataArray = [
        'tracking_number',
        'customer_id',
        'customer_contact',
        'circle',
        'usertx',
        'operator',
        'status',
        'amount',
        'total',
        'coupon_id',
        "isPayedByCustomer",
        'discount',
        'payment_id',
        'payment_gateway',
        'status',
        'customer_id',
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
        return UtilityPayment::class;
    }

    /**
     * @param $request
     * @return LengthAwarePaginator|JsonResponse|Collection|mixed
     */

    public function recharge($data){
        
         
        $member_id = 'EZ929952';
        $pin = 'C019FB28E2';
        $number= $data->customer_contact;
        $operator=$data->operator;
        $usertx=Str::random(35);
        $circle=$data->circle;
        $amount=$data->amount;

        $curl = curl_init();

        $URL='https://ezulix.in/api/recharge.aspx?memberid='.$member_id.'&pin='.$pin.'&number='.$number.'&operator='.$operator.'&circle='.$circle.'&usertx='.$usertx.'&amount='.$amount;

        curl_setopt_array($curl, array(
            CURLOPT_URL => $URL,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            // CURLOPT_POSTFIELDS =>  json_encode($data),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: text/plain',
                'Content-Length: 500'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);

        return  $usertx;

    }

    public function storePayment($request)
    {
        $user = $request->user();
        // $request['usertx']=$this->recharge($request);

        $request['tracking_number'] = Str::random(35);
        $request['usertx'] = $request['tracking_number'];
        $request['customer_id'] = $request->user()->id;
        $request['name'] = $request->user()->name;
        $request['email_id'] = $request->user()->email;
        $request['amount'] = $request->amount;
        $request['total'] = $request->amount;
        $request['status'] = "PENDING";
        $request['isPayedByCustomer'] = 0;
        $request['payment_gateway']="cashfree";
        
        $paymentInput = $request->only($this->dataArray);
        
        $this->create($paymentInput);

        $od["orderId"] = $paymentInput['tracking_number'];
        $od["orderId"] = $request['tracking_number'];
        $od["orderAmount"] = $request['total'];
        $od["orderNote"] = "Mobile Recharge";
        $od["customerPhone"] = $request->customer_contact;
        $od["customerName"] = $user->name;
        $od["customerEmail"] = $user->email ?? "test@cashfree.com";
        $od["payment_methods"] = $request['payment_gateway'];

        $od["returnUrl"] =  url("utility-payment/success");
        $od["notifyUrl"] = url("utility-payment/success");


        // $utilityPayment=$this->create($paymentInput);
        $orderFree = new CashFreeOrder();
        $orderFree->create($od);

        $link = $orderFree->getLink($od['orderId']);
        return json_encode($link);

        // return $utilityPayment;


        
        // $discount = $this->calculateDiscount($request);
        // if ($discount) {
        //     $request['paid_total'] = $request['amount'] + $request['sales_tax']  - $discount;
        //     // + $request['delivery_fee']
        //     $request['total'] = $request['amount'] + $request['sales_tax']  - $discount;
        //     // + $request['delivery_fee']
        //     $request['discount'] =  $discount;
        // } else {
        //     $request['paid_total'] = $request['amount'] + $request['sales_tax'] ;
        //     // + $request['delivery_fee']
        //     $request['total'] = $request['amount'] + $request['sales_tax'] ;
        //     // + $request['delivery_fee']
        // }
        // $response = $this->capturePayment($request);
        
        // $payment_method = 'cc';
        
        // $paymentFree = new CashFreeOrder();
        // $od["paymentId"] = $request['tracking_number'];
        // $od["paymentAmount"] = $request['total'];
        // $od["paymentNote"] = "";
        // $od["customerPhone"] = $request->customer_contact;
        // $od["customerName"] = $user->name;
        // $od["customerEmail"] = $user->email ?? "test@cashfree.com";
        // $od["payment_methods"] = $payment_method;
        // $od["returnUrl"] =  url("utility-payment/success");
        // $od["notifyUrl"] = url("utility-payment/success");
        // $paymentFree->create($od);
        // $payment = $this->createUtilityPayment($request);

        
        // $link = $paymentFree->getLink($od['paymentId']);
        // return json_encode($link);

    }

    /**
     * @param $request
     * @return LengthAwarePaginator|JsonResponse|Collection|mixed
     */

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
                        
                            // SMS::purchaseToVendor('7018265262', $user->name);
                            SMS::purchaseToVendor('9056147024', $user->name); 
                            $products = $order->products;

                            foreach($order->childrens as $child){
                                $product_name = $child->name;
                                $product_price = $child->price;
                                $shop_name = $child->shop->name;
                                $price = $child->price;
                                $phone_number =$child->shop->settings['contact'];
                                $delivery_time = $child->delivery_time;
                            }
                            // foreach($products as $product){
                            //    $product_name = $product->name;
                            //      $product_price = $product->price;
                            //      $shop_name = $product->shop->name;
                            //      $price = $product->price;
                            //      $phone_number = $this->clearStr($product->shop->owner->phone_number);
                            // }

                            $payload = array(
                                "userId"=> $product->shop->owner_id,
                                "phoneNumber"=> $phone_number,
                               
                                "countryCode"=> "+91",
                                "event"=> "UtilityPayment Recieved By Vendor",
                                "traits"=> [
                                    "productDetail"=> json_encode($request->products),
                                   
                                    'shop_name'=> $shop_name,
                                    'product_name'=> $product_name,
                                    'shop_owner_phone_number'=>$phone_number,
                                    'shop_owner_name'=>$shop_name,
                                    'delivery_time'=> $delivery_time,
                                    
                                    'order_id'=> $order->tracking_number,
                                    // "price"=> $request->amount,
                                    // "orderId"=> $request->tracking_number,
                                    // "delivery_time"=> $request->delivery_time,
                                    // 'description'=> $request->description,
                                    // "payment_gateway"=> $request->payment_gateway,
                                    "currency"=>"INR"
                                ],
                                "createdAt"=> date('Y-m-d H:i:s')
                            );
                    }
                }    

                $interkt_response = $this->createWhatsappVendorUtilityPaymentEvent($payload);     
            }

            $order->interakt_response = $interkt_response;

            return $order;

        } catch(Exception $e) {

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













    public function getDeliveryCharges($request,$shop_id){
        $shop=Shop::find($shop_id);
        if($request['delivery_fee']>0){
            return $shop->delivery_charges;
        }
        return 0;
    }

    public function createWhatsappUtilityPaymentEvent($payload)
    {
        $CURLOPT_POSTFIELDS = $payload;
        
        $endpoint = 'track/events/';

        $response = InteraktHelper::interaktApi(json_encode($CURLOPT_POSTFIELDS),$endpoint);

        return $response;
    }

    public function createWhatsappVendorUtilityPaymentEvent($payload2)
    {
        $CURLOPT_POSTFIELDS = $payload2;
        
        $endpoint = 'track/events/';

        $response = InteraktHelper::interaktApi(json_encode($CURLOPT_POSTFIELDS),$endpoint);

        return $response;
    }
}
