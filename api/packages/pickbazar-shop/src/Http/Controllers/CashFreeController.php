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

    public function cashFree(){

    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://www.cashfree.com/checkout/post/submit',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS =>'{
    "appId": "13353224f34e6b8d5dec4c7c13235331",
    "orderId": "A001",
    "orderAmount": "1",
    "customerName": "Test",
    "customerPhone": "7018265262",
    "customerEmail": "test@gmail.com",
    "returnUrl": "buylowcal.com",
    "responseType": "json",
    "notifyUrl": "test.cashfree.com/notify.php",
    "paymentOption": "upi",
    "upi_vpa": "7018265262@paytm",
    "signature": "0LqbexARvzFuKfMg0I6GoUunr7239G5gZdZZGAXNMXA="
  }',
  CURLOPT_HTTPHEADER => array(
    'Cache-Control: no-cache',
    'content-type: multipart/form-data'
  ),
));
$response = curl_exec($curl);
curl_close($curl);
return $response;

     }

}