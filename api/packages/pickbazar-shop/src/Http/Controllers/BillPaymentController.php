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
use PickBazar\Helpers\BillerInfoHelper;


class BillPaymentController extends CoreController

{
   
    public function getBillerInfo(){

        $response = BillerInfoHelper::billerInfoApi();
        return $response;
    }

}
