<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\Offer;
use PickBazar\Database\Models\Address;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\Settings;
use PickBazar\Database\Models\ShopCategory;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\SettingsRequest;
use PickBazar\Database\Repositories\ShopRepository;
use Prettus\Validator\Exceptions\ValidatorException;
use PickBazar\Database\Repositories\SettingsRepository;

class SettingsController extends CoreController
{
    public $repository;

    public function __construct(SettingsRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Address[]
     */
    public function index(Request $request)
    {
        return $this->repository->first();
    }
    // customerId,
    // app_logo,
    // app_name(
    //      Feed banners(
    //          Listed Categories,
    //          Featured shops near by, Get major discount on major e-stores,
    //          offers of the day,
    //          featured products
    //     )
    //     categoryimage withId and name
    // )
    public function homeFeedApi($app_id, Request $request)
    {
        try{
            $location=($request->location)?json_decode($request->location):"";

        }catch(Exception $e){
            return abort(400,"invalid location object");
        }

        $featured_shops="";
        $settings = Settings::find(1);

        // Application Logo
        $logo = $settings->options['logo'];

        // Shop Category
        $catgories = ShopCategory::all();

        // Featured Shops
        if ($location) {
            try{
                if(!$location->lat){
                    return abort(400,"invalid location object");
                }
                $shops_ids = ShopRepository::getSortedShops($location);
                if(count($shops_ids)>0){
                    $featured_shops=Shop::whereIn('id', $shops_ids)->where("is_featured",1)->where("is_active",1)->get();
                }
            }catch(Exception $e){
                return abort(400,"invalid location object");
            }
            
        } else {
            $featured_shops=Shop::where("is_featured",1)->where("is_active",1)->limit(8)->get();
        }
        
        // Featured Products
        if($location){
            if(count($shops_ids)>0){
                $featured_products=Product::whereIn("shop_id",$shops_ids)->where("is_featured",1)->limit(10)->get();
            }
        }else{
            $featured_products=Product::where("is_featured",1)->limit(10)->get();
        }
        if($location){
            if(count($shops_ids)>0){
                $offers=Product::whereIn("shop_id",$shops_ids)->where('is_offer',1)->where("is_featured",1)->get();
            }
        }else{
            $offers=Product::where("is_featured",1)->where('is_offer',1)->limit(10)->get();
        }


        return [
            "logo"=>$logo,
            "name"=>"Buylowcal",
            "feed_banners"=>[
                "shop_catgories"=>$catgories,
                "featured_shops"=>$featured_shops,
                "featured_products"=>$featured_products,
                "offers"=>$offers
            ]

        ];
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param SettingsRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(SettingsRequest $request)
    {
        $settings = $this->repository->first();
        if (isset($settings->id)) {
            return $this->repository->update($request->only(['options']), $settings->id);
        } else {
            return $this->repository->create(['options' => $request['options']]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return JsonResponse
     */
    public function show($id)
    {
        try {
            return $this->repository->first();
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param SettingsRequest $request
     * @param int $id
     * @return JsonResponse
     * @throws ValidatorException
     */
    public function update(SettingsRequest $request, $id)
    {
        $settings = $this->repository->first();
        if (isset($settings->id)) {
            return $this->repository->update($request->only(['options']), $settings->id);
        } else {
            return $this->repository->create(['options' => $request['options']]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return array
     */
    public function destroy($id)
    {
        throw new PickbazarException('PICKBAZAR_ERROR.ACTION_NOT_VALID');
    }
}
