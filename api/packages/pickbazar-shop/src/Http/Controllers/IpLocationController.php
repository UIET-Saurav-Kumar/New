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



class IpLocationController extends  CoreController

{

    public static function ipAddress(Request $request){

        $ip = $request->query('ip');
        $api_key = 'efa82abc72a10a98a0d3377f0d3a1666';

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://api.ipstack.com/'.$ip.'?access_key='.$api_key,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;

    }
 
}
