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


class BillDetailsController extends CoreController

{
   
    public function getBillDetails( ){
        
        $curl = curl_init();
        $apikey = 'C019FB28E2';
        $biller_id= 'MUNI00000CHANI';
        $category = 'Water';

        curl_setopt_array($curl, array(
        // CURLOPT_URL =>'https://ezulix.co.in/Plans/masterData',
        // CURLOPT_URL => 'https://reqres.in/api/users?page=2',
        CURLOPT_URL => 'https://ezulix.in/api/BBPSV2/Electricity/getBillerInfo.aspx?memberid=EZ929952&apikey='.$apikey.'&biller_id='.$biller_id.'&category='.$category,
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
        return  $response;

    }


}
