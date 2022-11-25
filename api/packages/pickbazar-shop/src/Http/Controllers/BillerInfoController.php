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



class BillerInfoController extends  CoreController

{
   
    public static function getBillerInfo(Request $request){

       

        $member_id = 'EZ929952';
        $api_key =  'C019FB28E2';
        
        // $operator = $request->operator;
        $category = $request->category;
        $biller_id= $request->biller_id;

        $data = array(
          'biller_id'=> $biller_id,
          'category' => $category,
        );

        $curl = curl_init();
        
        
        curl_setopt_array($curl, array(
          // CURLOPT_URL => 'https://ezulix.in/api/BBPSV2/Electricity/getBillerInfo.aspx?memberid='.$member_id.'&apikey='.$api_key.'&biller_id=MUNI00000CHANI&category=Water',
            CURLOPT_URL => 'https://ezulix.in/api/BBPSV2/Electricity/getBillerInfo.aspx?memberid='.$member_id.'&apikey='.$api_key.'&biller_id='.$biller_id.'&category='.$category,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            // CURLOPT_POSTFIELDS => 
            //  json_encode($data),
            CURLOPT_HTTPHEADER => array(
              'Content-Length: 0',
              'Cookie: ASP.NET_SessionId=rinscufbx3ggi0a3ovgotc5x'
            ),
          ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        return  $response;


    }

}
