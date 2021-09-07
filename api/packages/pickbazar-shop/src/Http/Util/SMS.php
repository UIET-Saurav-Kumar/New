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

    public static function welcome($phone_number)
    {
        $phone_number=SMS::formate_number($phone_number);

        $client = new Client();
        $url = "https://2factor.in/API/V1/$key/ADDON_SERVICES/SEND/PSMS";

        $response = $client->request('POST', $url, [
            'form_params' => [
                'From' => "123456",
                'Msg' => "Welcome To BuyLowcal! you have successfully registered",
                'To' => $phone_number,
            ]
        ]);

        if ($response->getStatusCode() == 200) {
            $content = $response->getBody()->getContents();
            $content = json_decode($content);
            dd($content);
        }
    }
}
// http://2factor.in/API/V1/293832-67745-11e5-88de-5600000c6b13/ADDON_SERVICES/SEND/PSMS

