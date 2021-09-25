<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Validator\Exceptions\ValidatorException;
use PickBazar\Database\Models\Order;

class GatewayResponse extends CoreController
{
    public function process_response(Request $request)
    {
        $response = request()->all();

        $order_id = $response['orderId'] ?? null;
        $orderAmount = $response['orderAmount'] ?? null;
        $referenceId = $response['referenceId'] ?? null;
        $txStatus = $response['txStatus'] ?? null;
        $paymentMode = $response['paymentMode'] ?? null;
        $txMsg = $response['txMsg'] ?? null;
        $txTime = $response['txTime'] ?? null;
        $signature = $response['signature'] ?? null;

        $parent_orderid = Order::where('tracking_number', $order_id)->first()->id;
        if ($txStatus != "SUCCESS") {
            Order::where('tracking_number', $order_id)->update(['status' => 8]);
            Order::where('parent_id', $parent_orderid)->update(['status' => 8]);
        }
        
        Order::where('id', $parent_orderid)->update(['gateway_response' => json_encode(request()->all())]);

        $url = \Config::get('app.shop_url')."/orders/".$order_id;
        return redirect()->away($url);
    }

}
