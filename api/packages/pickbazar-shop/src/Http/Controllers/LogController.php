<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Database\Models\Log;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Repositories\LogRepository;
use Cviebrock\EloquentSluggable\Services\SlugService;

class LogController extends CoreController
{
    public $repository;

    public function __construct(LogRepository $repository)
    {
        $this->repository = $repository;
    }

    public function fetchLogs(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with('user')->with('order')->with('shop')->paginate($limit);
    }


   public  function  ip_AddressLocation(Request $request) {

        $ip = $request->ip();
       
        // $ip ='103.81.156.163';
    
        $data = \Location::get($ip);
    
        //  dd($data);
         return $data->cityName;
    
    }

    public function store(Request $request)
    {
        $location=$request->location;
        $search=$request->search;
        $user=$request->user();
        $product=$request->product;
        $shop=$request->shop;
        // $ip_location=$this->ip_AddressLocation($request);
     

        if($request->type=="item-removed"){
            $product=Product::find($product["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "products"=>$product['name'],
                "shop_id"=>$product->shop_id,
                "type"=>"item-removed"
            ]);
        }
        else if($request->type=="item-added"){
            $product=Product::find($product["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "products"=>$product['name'],
                "shop_id"=>$product->shop_id,
                "type"=>"item-added"
            ]);
        }


        else if($request->type=="shop-visited"){
            $shop=Shop::find($shop["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                // 'ip_location'=>$ip_location,
                "location"=>$location,
                // "shop_name"=>$shop['name'],
                "shop_id"=>$shop->id,
                "type"=>"shop-visited"
            ]);
        }

        //item-added-to-wishlist
        else if($request->type=="item-added-to-wishlist"){
            $product=Product::find($product["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "products"=>$product['name'],
                "shop_id"=>$product->shop_id,
                "type"=>"item-added-to-wishlist"
            ]);
        }

        //item-removed-from-wishlist
        else if($request->type=="item-removed-from-wishlist"){
            $product=Product::find($product["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "products"=>$product['name'],
                "shop_id"=>$product->shop_id,
                "type"=>"item-removed-from-wishlist"
            ]);
        }

        else if($search)
        {
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "search_item"=>$search,
                "type"=>"search_item"
            ]);
        }
        else if($location)
        {
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
                'ip_location'=>$ip_location,
                "location"=>$location,
                "type"=>"location"
            ]);
        }
        return 1;
    }

    public function destory($id){
        $log=Log::find($id);
        $log->delete();

        return 1;
    }


    public function sluggify(){
        $products=Product::select('id')->get();    
        foreach($products as $p){
            $product=Product::find($p->id);
            if($product){
                $product->slug=$product->slug.$product->id;
                $product->save();
            }
        }

        return "done";
    }
}
