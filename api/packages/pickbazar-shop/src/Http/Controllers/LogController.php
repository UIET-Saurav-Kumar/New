<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Database\Models\Log;
use PickBazar\Database\Models\Product;
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
        $this->sluggify();
        return "ok";
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with('user')->with('order')->with('shop')->paginate($limit);
    }

    public function store(Request $request)
    {
        $location=$request->location;
        $search=$request->search;
        $user=$request->user();
        $product=$request->product;

        if($request->type=="item-removed"){
            $product=Product::find($product["id"]);
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
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
                "location"=>$location,
                "products"=>$product['name'],
                "shop_id"=>$product->shop_id,
                "type"=>"item-added"
            ]);
        }
        else if($search)
        {
            Log::create([
                "user_id"=>($user)?$user->id:NULL,
                "ip_address"=>$request->ip(),
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
            $product->slug=SlugService::createSlug(Product::class, 'slug', $product->name);
            $product->save();
        }

        return "done";
    }
}
