<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\Category;
use PickBazar\Database\Models\ShopCategory;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\ProductCreateRequest;
use PickBazar\Http\Requests\ProductUpdateRequest;
use PickBazar\Database\Repositories\ShopRepository;
use PickBazar\Database\Repositories\ProductRepository;

class ProductController extends CoreController
{
    public $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Product[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->where("is_offer",0)->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->paginate($limit);
    }

    public function product_offers(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->where("is_offer",1)->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductCreateRequest $request
     * @return mixed
     */
    public function store(ProductCreateRequest $request)
    {
        if ($this->repository->hasPermission($request->user(), $request->shop_id)) {
            return $this->repository->storeProduct($request);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param $slug
     * @return JsonResponse
     */
    public function show($slug, Request $request)
    {
        try {
            $limit = isset($request->limit) ? $request->limit : 10;
            $product = $this->repository
                ->with(['type', 'shop', 'categories', 'tags', 'variations.attribute.values', 'variation_options'])
                ->findOneByFieldOrFail('slug', $slug);
            $product->related_products = $this->repository->fetchRelated($slug, $limit);
            return $product;
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProductUpdateRequest $request
     * @param int $id
     * @return array
     */
    public function update(ProductUpdateRequest $request, $id)
    {
        $request->id = $id;
        return $this->updateProduct($request);
    }

    public function updateProduct(Request $request)
    {
        if ($this->repository->hasPermission($request->user(), $request->shop_id)) {
            $id = $request->id;
            return $this->repository->updateProduct($request, $id);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function updateProductStatus(Request $request)
    {
        // dd($request->shop_id);
        // if ($this->repository->hasPermission($request->user(), $request->shop_id)) {
            $id = $request->id;
            return $this->repository->updateProduct($request, $id);
            
        // } else {
        //     throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            return $this->repository->findOrFail($id)->delete();
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    public function relatedProducts(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        return $this->repository->fetchRelated($request->slug, $limit);
    }

    public function fetchFeatureProducts(Request $request)
    {
        
        $limit = isset($request->limit) ? $request->limit : 10;
        $location=($request->location)?json_decode($request->location):"";

        if($location){
            $shops=ShopRepository::getSortedShops($location);
            return Product::whereIn("shop_id",$shops)->where("is_featured",1)->get();

        }
        return Product::where("is_featured",1)->limit($limit)->get();
        
    }

    public function search($slug)
    {
        $data=[];
        $slug=str_replace("-","&",$slug);

        $names=Product::where('name', 'like', '%' . $slug . '%')->limit(6)->pluck("name");

        foreach($names as $name){
            array_push($data,[
                "label"=>$name,
                "value"=>$name
            ]);
        }

        $names=Category::where('name', 'like', '%' . $slug . '%')->limit(6)->pluck('name');

        foreach($names as $name){
            array_push($data,[
                "label"=>$name,
                "value"=>$name
            ]);
        }

        $names=ShopCategory::where('name', 'like', '%' . $slug . '%')->limit(6)->pluck('name');
        foreach($names as $name){
            array_push($data,[
                "label"=>$name,
                "value"=>$name
            ]);
        }

        $names=Shop::where('name', 'like', '%' . $slug . '%')->limit(6)->pluck('name');

        foreach($names as $name){
            array_push($data,[
                "label"=>$name,
                "value"=>$name
            ]);
        }

        return $data;
    }

    public function fetchOffers(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        $location=($request->location)?json_decode($request->location):"";

        if($location){
            $shops=ShopRepository::getSortedShops($location);
            return Product::whereIn("shop_id",$shops)->where('is_offer',1)->where("is_featured",1)->get();

        }
        return Product::where("is_featured",1)->where('is_offer',1)->limit($limit)->get();
    }


    public function product_commission(Request $request,$shop_id)
    {
        foreach($request->all() as $key => $commission){
            $id=explode("commission",$key)[1];
            $product=Product::where("id",$id)->where("shop_id",$shop_id)->first();
            if($product){
                $product->commission=$commission;
                $product->save();
            }
        }

        return "success";
    }


}
