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



class PlacesApiController extends  CoreController

{
   
    public static function textSearch(Request $request){

      // return  json_encode($request->query);
      // return  $request;

      $api_key = 'AIzaSyDd58SS-eX8RDXYdhOu-HO1AhqVtjowXqQ';
      
      $string = $request->query('query');
// 
      // $string = 'bella-donna';
        
      $curl = curl_init();

      curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://maps.googleapis.com/maps/api/place/textsearch/json?location=30.7333,%2076.7794&region=in&query='.$string.'&key='.$api_key,
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

    $data = json_decode($response, true);
    if(isset($data) && !empty($data) && isset($data['results']) && count($data['results']) > 0  && isset($data['results'][0])){
      $place_id = $data['results'][0];
    }else{
      $place_id = null;
    }
    

    return $place_id;

    }


    public static function placeDetails(Request $request) {

      // return $request;

      $api_key = 'AIzaSyDd58SS-eX8RDXYdhOu-HO1AhqVtjowXqQ';

      $place_id = $request->query('place_id');
      // $lat = $request->query('lat');
      // $lng = $request->query('lng');

      $curl = curl_init();

      curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://maps.googleapis.com/maps/api/place/details/json?place_id='.$place_id.'&key='.$api_key,
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

      $data = json_decode($response, true);
      // $photos = $data['results'][0]['photos'][0]['reference-id'];

      return $data;

    }
    public static function placePhotos(Request $request){

      $api_key = 'AIzaSyDd58SS-eX8RDXYdhOu-HO1AhqVtjowXqQ';
      $reference_id =  $request->query('query');
  
      $curl = curl_init();
      curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='.$reference_id.'&key='.$api_key,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
      ));
      $response = curl_exec($curl);
      $status_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
      curl_close($curl);
  
      if($status_code === 200) {
          header('Content-Type: image/png');
          echo $response;
      }else{
          // handle errors, maybe return a default image
          return "Error in loading image";
      }
  }
  
}
