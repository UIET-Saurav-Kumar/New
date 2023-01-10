<?php

namespace PickBazar\Http\Controllers;

use Exception;
use PickBazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

  

class GoogleMapsPlacesController extends CoreController
 {
    
    public function textSearch(Request $request){

        // return 'start';

        // $api_key = 'AIzaSyDd58SS-eX8RDXYdhOu-HO1AhqVtjowXqQ';

        // $string  = 'Chandigarh-Salon';

        // $curl    = curl_init();
 
        // curl_setopt_array($curl, array(
        // CURLOPT_URL => 'https://maps.googleapis.com/maps/api/place/textsearch/json?region=in&query='.$string+'&key='.$api_key,
        // CURLOPT_RETURNTRANSFER => true,
        // CURLOPT_ENCODING => '',
        // CURLOPT_MAXREDIRS => 10,
        // CURLOPT_TIMEOUT => 0,
        // CURLOPT_FOLLOWLOCATION => true,
        // CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        // CURLOPT_CUSTOMREQUEST => 'GET',
        // CURLOPT_HTTPHEADER => array(
        //     'Accept: application/json'
        // ),
        // ));

        // $response = curl_exec($curl);

        // curl_close($curl);

        
        return 'sucess';
 }

}
    

