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

        $template="LowcalRegister";
        $url = "https://2factor.in/API/R1/?module=TRANS_SMS&apikey=$key&to=$phone_number&from=LOWCAL&templatename=$template&var1=$username&var2=$username";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return "Success";
        }else{
            dd('not sent');
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
        
        $template="PurchasesToVendor";
        $url = "https://2factor.in/API/R1/?module=TRANS_SMS&apikey=$key&to=$phone_number&from=LOWCAL&templatename=$template&var1=$username&var2=$username";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return "Success";
        }else{
            dd('not sent');
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

        $template="OrderstatusLowcal";
        $url = "https://2factor.in/API/R1/?module=TRANS_SMS&apikey=$key&to=$phone_number&from=LOWCAL&templatename=$template&var1=$username&var2=$order_tracking_number&var3=$status";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return "Success";
        }else{
            dd('not sent');
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

        $template="UserInvite";
        $url = "https://2factor.in/API/R1/?module=TRANS_SMS&apikey=$key&to=$phone_number&from=LOWCAL&templatename=$template&var1=$username&var2=$invitee";

        $response = $client->request('GET', "$url");

        if ($response->getStatusCode() == 200) {
            return "Success";
        }else{
            dd('not sent');
        }
    }
}