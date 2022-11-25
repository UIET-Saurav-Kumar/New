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
   
    public function getBillDetails(Request $request ){
        
         
        $member_id = 'EZ929952';
        $apikey = 'C019FB28E2';
        // $biller_id= 'MUNI00000CHANI';
        // $category = 'Water';

        $para1= $request->para1;
        // $para2= $request->para2;
        // $para3= $request->para3;
        $biller_id = $request->biller_id;
        $category = $request->category;

        $data = array(
            'para1'=> $para1,
            // 'para2'=> $para2,
            // 'para3'=> $para3,
            'biller_id'=>$biller_id,
            'category'=> $category,
        );

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://ezulix.in/api/BBPSV2/Electricity/FetchBillinfo.aspx?memberid='.$member_id.'&apikey='.$apikey,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>  json_encode($data),
        CURLOPT_HTTPHEADER => array(
            'Content-Type: text/plain'
        ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return  $response;

    }


}
