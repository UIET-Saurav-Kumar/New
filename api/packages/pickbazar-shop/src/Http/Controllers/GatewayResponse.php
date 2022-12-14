<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use PickBazar\Http\Util\SMS;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\Order;
use PickBazar\Database\Models\Delivery;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Validator\Exceptions\ValidatorException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use PickBazar\Database\Models\UtilityPayment;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class GatewayResponse extends CoreController

{
    public function process_response(Request $request)

    {
        $response = request()->all();

        $order_id = $response['orderId'] ?? null;
        $orderAmount = $response['orderAmount'] ?? null;
        $referenceId = $response['referenceId'] ?? null;
        $txStatus = $response['txStatus'] ?? null;
        $paymentMode = $response['paymentMode'] ?? null;
        $txMsg = $response['txMsg'] ?? null;
        $txTime = $response['txTime'] ?? null;
        $signature = $response['signature'] ?? null;

        $parent_orderid = Order::where('tracking_number', $order_id)->first()->id;
        if ($txStatus != "SUCCESS") {
            Order::where('tracking_number', $order_id)->update(['status' => 8]);
            Order::where('parent_id', $parent_orderid)->update(['status' => 8]);
        }

        Order::where('id', $parent_orderid)->update(['gateway_response' => json_encode(request()->all())]);

        // $url = \Config::get('app.shop_url')."/orders/".$order_id;
        $url = "https://buylowcal.com/orders/" . $order_id;

        return redirect()->away($url);
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
        $usertx=$data->usertx;
        $circle=$data->circle;
        $amount=$data->amount;


        $URL='https://ezulix.in/api/recharge.aspx?memberid='.$member_id.'&pin='.$pin.'&number='.$number.'&operator='.$operator.'&circle='.$circle.'&usertx='.$usertx.'&amount='.$amount;
        $http = new \GuzzleHttp\Client;
        $response = $http->post($URL, []);
        $code=$response->getStatusCode();
        $result=$response->getBody();
        return  $code;

    }

    public function rechargeStatus(Request $request) {

        $member_id = 'EZ929952';
        $pin = 'C019FB28E2';
        
        //e.g id
        // $trans_id = 'BDHD93NIDB390SB0';
        $trans_id = $request->trans_id;
      
        $curl = curl_init();
      
        $url = 'https://ezulix.in/api/rechargestatus.aspx?memberid='.$member_id.'&pin='.$pin.'&transid='.$trans_id;
      
        curl_setopt_array($curl, [
          CURLOPT_URL => $url,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'GET',
        ]);
      
        $response = curl_exec($curl);
      
        curl_close($curl);
      
        return $response;
      }

    public function processResponseUtilityPayment(Request $request){

        $response = request()->all();

        $txStatus = $response['txStatus'] ?? null;
        $order_id = $response['orderId'] ?? null;
        
        if($txStatus == "SUCCESS") {

            UtilityPayment::where('tracking_number', $order_id)->update(['isPayedByCustomer' => 1]);
            $utility_payment=UtilityPayment::where('tracking_number', $order_id)->first();
            $code=$this->recharge($utility_payment);
            if($code==200){
                $utility_payment=UtilityPayment::where('tracking_number', $order_id)->update(['status' => 'APPROVED']);
            }

            $url = "https://buylowcal.com/user/utility-payments";

            return redirect()->away($url);

        }
        return redirect()->away("https://buylowcal.com");        

    }
    
    
    public function process_delivery_response(Request $request)
    {

        $response = request()->all();

        $order_id = $response['orderId'] ?? null;
        $orderAmount = $response['orderAmount'] ?? null;
        $referenceId = $response['referenceId'] ?? null;
        $txStatus = $response['txStatus'] ?? null;
        $paymentMode = $response['paymentMode'] ?? null;
        $txMsg = $response['txMsg'] ?? null;
        $txTime = $response['txTime'] ?? null;
        $signature = $response['signature'] ?? null;
        

        $id = Delivery::where('tracking_number', $order_id)->first()->id;

        if ($txStatus != "SUCCESS") {
            $delivery = Delivery::where('id', $id)->update(['is_approved' => 1]);
            $user = User::find($delivery->user_id);
            $delivery->is_approved = 1;
            $delivery->save();
            // $url = \Config::get('app.shop_url')."/orders/".$order_id;
            try {
                SMS::customerPurchase($delivery->sender_phone_number, $user->name);
            } catch(Exception $e) {

            }

            $url = "https://buylowcal.com/user/delivery";

            return redirect()->away($url);
        }
    }

}
