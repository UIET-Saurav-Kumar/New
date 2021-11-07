<?php

namespace PickBazar\Http\Controllers;

use PickBazar\Database\Models\Product;
use Pickbazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use PickBazar\Exceptions\PickbazarException;

class CartController extends CoreController
{
    public function store(Request $request)
    {
        $req_data = $request->all();
        $product_detail = array();
        $cart_list = array();
        foreach ($req_data['items'] as $key => $value) 
        {
            if (empty($value)) 
            {
                return new PickbazarException('Invalid Request', 400);
            }
            else
            {
                $product_detail = Product::find($value['productId']);
                $cart_list[] = array(
                    'product_id' => $value['productId'],
                    'product_name' => $product_detail->name,
                    'product_price' => $product_detail->price,
                    'product_quantity' => $value['qty'],
                    'product_image' => $product_detail->image['thumbnail'],
                    'product_total' => $value['qty'] * $product_detail->sale_price,
                );
            }
        }
        return $cart_list;
    }
}
