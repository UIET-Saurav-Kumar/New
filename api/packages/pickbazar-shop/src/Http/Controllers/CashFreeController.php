<?php


namespace PickBazar\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use PickBazar\Database\Models\AbusiveReport;
use PickBazar\Database\Repositories\AbusiveReportRepository;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\AbusiveReportAcceptOrRejectRequest;
use PickBazar\Http\Requests\AbusiveReportCreateRequest;
use Prettus\Validator\Exceptions\ValidatorException;

class CashFreeController extends CoreController
{

    public function cashFree(Request $request){

      $curl = curl_init();
      $postFields = array(
        "order_id" => $request->input('order_id'),
        "order_amount" => $request->input('order_amount'),
        "order_currency" => $request->input('order_currency'),
        "customer_details" => array(
          "customer_id" => $request->input('customer_id'),
          "customer_email" => $request->input('customer_email'),
          "customer_phone" => $request->input('customer_phone')
        ),
        "order_meta" => array(
            "return_url" => url("order/success"),
            'notifyUrl' => url('order/success'),
        ),
        // "order_splits" => array(
        //   array(
        //     "vendor_id" => $request->input('vendor_id'),
        //     "amount" => $request->input('amount')
        //   )
        // )
      );
      
        $postFields = json_encode($postFields);
        
        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://api.cashfree.com/pg/orders',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS => $postFields,
          CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'x-api-version: 2022-09-01',
            'x-client-id: 13353224f34e6b8d5dec4c7c13235331',
            'x-client-secret: 5cc5c4adb74168906d10b82bf7820a69dc23634a'
          ),
        ));
      
        $response = curl_exec($curl);
      
        curl_close($curl);
        return $response;
      }
      
      
     }

}