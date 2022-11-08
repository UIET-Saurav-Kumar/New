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

        $curl = curl_init();

        $member_id = 'EZ929952';
        $api_key =  'C019FB28E2';
        
        $biller_id = 'MUNI00000CHANI';
        $category = 'Water';

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://ezulix.in/api/BBPSV2/Electricity/getBillerInfo.aspx?memberid='.$EZ929952+'&apikey='.$api_key+'&biller_id='.$biller_id+'&category='.$category,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_HTTPHEADER => array(
              'Cookie: ASP.NET_SessionId=rinscufbx3ggi0a3ovgotc5x'
            ),
          ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        return  $response;

        // if (＄err) {
        //     echo "cURL Error #:" . ＄err;
        // } else {
        //     print_r(json_decode(＄response));
        // }

    }

}
