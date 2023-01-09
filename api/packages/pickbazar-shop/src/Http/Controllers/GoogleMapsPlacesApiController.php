<?php

namespace PickBazar\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\ReferralEarning;
use PickBazar\Database\Models\Bill;
  

class GoogleMapsPlacesApiController extends CoreController
 {
    
    public function textSearch(Request $request){

        $api_key = 'AIzaSyDd58SS-eX8RDXYdhOu-HO1AhqVtjowXqQ';

        $string = 'Chandigarh Salon';

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://maps.googleapis.com/maps/api/place/textsearch/json?region=in&query='.$string+'&key='.$api_key,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'Accept: application/json'
        ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        echo $response;
 }




public function placeDetails(Request $request){

    $api_key = 'AIzaSyDd58SS-eX8RDXYdhOu-HO1AhqVtjowXqQ';

    $string = 'Chandigarh Salon';

    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://maps.googleapis.com/maps/api/place/textsearch/json?region=in&query='.$string+'&key='.$api_key,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => array(
        'Accept: application/json'
    ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;
}

}
    

