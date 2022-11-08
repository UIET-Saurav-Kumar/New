<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use PickBazar\Enums\Permission;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use PickBazar\Exceptions\PickbazarException;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;
use PickBazar\Helpers\RechargeDetailsHelper;



class OperatorDetailsController extends CoreController

{
   
    public function operatorList(Request $request){
      // return $request->mobile_no;
        // $CURLOPT_POSTFIELDS =  $request->api_fields;

        // $response = RechargeDetailsHelper::getRechargeDetails(json_encode($CURLOPT_POSTFIELDS));

        // return $response;

        // $phone = $request->mobile_no;
        // $number =  preg_replace("/<!--.*?-->/", "", $request->mobile_no);
        
    
        $curl = curl_init();
        
        // $data = array('mobile_no'=>$request->mobile_no);
        
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://ezulix.co.in/Plans/masterData',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
              'Cookie: ci_session=20a835bff8d5efdd6f092b213c975c4addfa3660'
            ),
          ));
        
        $response = curl_exec($curl);

        curl_close($curl);

        return $response;
        
      }
}
