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



class RechargePlansController extends CoreController

{
   
      public function getPlans(Request $request){

        $operator = $request->operator;
        $circle = $request->circle;
        
           $data = array(
             
             'circle'=> $circle,
             'operator'=> $operator,
           );
          
          $curl = curl_init();
       
          curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://ezulix.co.in/Plans/getPlans',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => array(
              'Content-Type: application/json',
              'Cookie: ci_session=056346e2871c389804120cce0eef2bcf75df9d60'
            ),
          
          ));
          
          $response = curl_exec($curl);

          curl_close($curl);
  
          return $response;
      }  
    

}
