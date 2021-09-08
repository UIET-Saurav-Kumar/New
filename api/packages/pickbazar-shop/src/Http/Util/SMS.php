<?php

namespace PickBazar\Http\Util;

use GuzzleHttp\Client;

class SMS
{
    private static $key="857ba560-8f7d-11eb-a9bc-0200cd936042";

    private static function random($size)
    {
        $permitted_chars = '1234567890';
        return substr(str_shuffle($permitted_chars), 0, $size);
    }

    public static function sendOTP($phone_number)
    {
        $phone_number=SMS::formate_number($phone_number);

        $client = new Client();

        $otp=SMS::random(5);
        $key=SMS::$key;

        $url = "https://2factor.in/API/V1/$key/SMS/$phone_number/$otp";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return $otp;
        }else{
            dd('not sent');
        }
    }

    private static function formate_number($phone_number)
    {
        $phone_number=str_replace("(","",$phone_number);
        $phone_number=str_replace(")","",$phone_number);
        $phone_number=str_replace(" ","",$phone_number);

        return $phone_number;
    }

    public static function welcome($phone_number,$username)
    {
        $phone_number=SMS::formate_number($phone_number);
        $key=SMS::$key;
        $client = new Client();
        $url = "https://2factor.in/API/V1/$key/ADDON_SERVICES/SEND/TSMS";

        $response = $client->request('POST', $url, [
            'form_params' => [
                'From' => "LOWCAL",
                "TemplateName"=>"BuyLowcalregister",
                'To' => $phone_number,
                "VAR1"=>$username
            ]
        ]);

        if ($response->getStatusCode() == 200) {
            $content = $response->getBody()->getContents();
            $content = json_decode($content);
            if($content){
                return "success";
            }
        }
    }

    public static function customerPurchase($phone_number,$username)
    {
        if(!$phone_number){
            return;
        }

        $phone_number=SMS::formate_number($phone_number);
        $key=SMS::$key;
        $client = new Client();
        $url = "https://2factor.in/API/V1/$key/ADDON_SERVICES/SEND/TSMS";

        $response = $client->request('POST', $url, [
            'form_params' => [
                'From' => "LOWCAL",
                "TemplateName"=>"CustomerPurchase",
                'To' => $phone_number,
                "VAR1"=>$username
            ]
        ]);

        if ($response->getStatusCode() == 200) {
            $content = $response->getBody()->getContents();
            $content = json_decode($content);
            if($content){
                return "success";
            }
        }
    }

    public static function orderStatusChanged($phone_number,$username,$order_tracking_number,$status)
    {
        if(!$phone_number){
            return;
        }

        $phone_number=SMS::formate_number($phone_number);
        $key=SMS::$key;
        $client = new Client();
        $url = "https://2factor.in/API/V1/$key/ADDON_SERVICES/SEND/TSMS";

        $response = $client->request('POST', $url, [
            'form_params' => [
                'From' => "LOWCAL",
                "TemplateName"=>"OrderStatus",
                'To' => $phone_number,
                "VAR1"=>$username,
                "VAR2"=>$order_tracking_number,
                "VAR3"=>$status
            ]
        ]);

        if ($response->getStatusCode() == 200) {
            $content = $response->getBody()->getContents();
            $content = json_decode($content);
            if($content){
                return "success";
            }
        }
    }

    public static function userInvite($phone_number,$username,$invitee)
    {
        if(!$phone_number){
            return;
        }

        $phone_number=SMS::formate_number($phone_number);
        $key=SMS::$key;
        $client = new Client();
        $url = "https://2factor.in/API/V1/$key/ADDON_SERVICES/SEND/TSMS";

        $response = $client->request('POST', $url, [
            'form_params' => [
                'From' => "LOWCAL",
                "TemplateName"=>"UserInvite",
                'To' => $phone_number,
                "VAR1"=>$username,
                "VAR2"=>$invitee,
            ]
        ]);

        if ($response->getStatusCode() == 200) {
            $content = $response->getBody()->getContents();
            $content = json_decode($content);
            if($content){
                return "success";
            }
        }
    }
}
// http://2factor.in/API/V1/293832-67745-11e5-88de-5600000c6b13/ADDON_SERVICES/SEND/PSMS

