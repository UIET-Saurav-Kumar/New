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
        $itemlist = $req_data['items'] ?? [];
        $remove_item = $req_data['itemremove'] ?? [];
        $add_item  = $req_data['itemadd'] ?? [];

        // merge itemlist and add_item
        $itemlist = array_merge($itemlist, $add_item);
      
        foreach ($itemlist as $key => $value) 
        {
            if (empty($value)) 
            {
                return new PickbazarException('Invalid Request', 400);
            }
            else
            {
                if(!empty($remove_item))
                {
                    $is_exist = array_search($value['productId'], array_column($remove_item, 'productId'));
                    if($is_exist > -1)
                        continue;
                    
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
        }
        return $cart_list;
    }
}
