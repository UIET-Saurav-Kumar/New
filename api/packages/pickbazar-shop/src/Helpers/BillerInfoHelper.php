<?php

namespace PickBazar\Helpers;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class BillerInfoHelper

{
   
    public static function billerInfoApi(){

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => `https://ezulix.in/api/BBPSV2/Electricity/getBillerInfo.aspx?memberid=EZ929952&apikey=C019FB28E2&biller_id=MUNI00000CHANI&category=Water`,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        return json_decode($response);

        // if (＄err) {
        //     echo "cURL Error #:" . ＄err;
        // } else {
        //     print_r(json_decode(＄response));
        // }

    }

}
