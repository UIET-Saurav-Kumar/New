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
    public function index(Request $request)
    {
        $user = $request->user();
        $itemlist = json_decode($user->cart_list,true);
        $cart_list = [];
        foreach ($itemlist as $key => $value) 
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
        
        return array('code'=>200, 'message'=>'Cart list response', 'data'=> $cart_list);
    }
    public function store(Request $request)
    {
        $user = $request->user();
        
        $req_data = $request->all();
        $product_detail = array();
        $cart_list = array();
        $itemlist = json_decode($user->cart_list, true);
        
        $add_item  = $req_data['items'] ?? [];

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
        // add cart list to user cart list
        $user->cart_list = json_encode($itemlist);
        $user->save();

        return array('code'=>200, 'message'=>'Cart add response', 'data'=> $cart_list);
    }

    public function remove(Request $request)
    {
        $user = $request->user();
    
        $req_data = $request->all();
        $product_detail = array();
        $cart_list = array();
        $itemlist = json_decode($user->cart_list, true);
        $remove_item = $req_data['items'] ?? [];
    
        foreach ($itemlist as $key => $value) 
        {
            if (empty($value)) 
            {
                return new PickbazarException('Invalid Request', 400);
            }
            else
            {
                $is_exist = array_search($value['productId'], array_column($remove_item, 'productId'));
                if($is_exist > -1)
                {
                    unset($itemlist[$key]);
                    continue;
                }
                
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
        //rest itemlist index after remove
        $itemlist = array_values($itemlist);
        // add cart list to user cart list
        $user->cart_list = json_encode($itemlist);
        $user->save();

        return array('code'=>200, 'message'=>'Cart remove response', 'data'=> $cart_list);
    }
}
