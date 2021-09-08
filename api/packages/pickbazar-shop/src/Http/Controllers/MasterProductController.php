<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\Category;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Database\Models\MasterProduct;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Database\Repositories\ShopRepository;
use PickBazar\Http\Requests\MasterProductCreateRequest;
use PickBazar\Http\Requests\MasterProductUpdateRequest;
use PickBazar\Database\Repositories\MasterProductRepository;

class MasterProductController extends CoreController
{
    public $repository;

    public function __construct(MasterProductRepository $repository)
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

        return $this->repository->paginate($limit);
    }

    public function paginationProduct(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->paginate($limit);
    }


    public function createdMasterProducts(Request $request)
    {
        $products_name=Product::where("shop_id",$request->shop_id)->pluck("name");
        $master_ids=MasterProduct::whereIn("name",$products_name)->pluck("id");
        return $master_ids;
        
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param MasterProductCreateRequest $request
     * @return mixed
     */
    public function store(MasterProductCreateRequest $request)
    {
        if ($this->repository->adminPermission($request->user(), $request->shop_id)) {
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
     * @param MasterProductUpdateRequest $request
     * @param int $id
     * @return array
     */
    public function update(MasterProductUpdateRequest $request, $id)
    {
        $request->id = $id;
        return $this->updateProduct($request);
    }

    public function updateProduct(Request $request)
    {
        if ($this->repository->adminPermission($request->user(), $request->shop_id)) {
            $id = $request->id;
            return $this->repository->updateProduct($request, $id);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function updateProductStatus(Request $request)
    {
        if ($this->repository->adminPermission($request->user(), $request->shop_id)) {
            $id = $request->id;
            return $this->repository->updateProduct($request, $id);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
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
        if($request->search){
            // dump($request->search);
            $search=json_decode(explode("name:",$request->search)[1]);
            // dd($search);    
            if($search){
                $shops=ShopRepository::getSortedShops($search);

                return Product::whereIn("shop_id",$shops)->where("is_featured",1)->get();
            }
        }
        return Product::where("is_featured",1)->limit($limit)->get();
        
    }

    public function search($slug)
    {
        $data=[];

        $names=Product::where('name', 'like', '%' . $slug . '%')->limit(10)->pluck("name");

        foreach($names as $name){
            array_push($data,[
                "label"=>$name,
                "value"=>$name
            ]);
        }

        $names=Category::where('name', 'like', '%' . $slug . '%')->limit(10)->pluck('name');

        foreach($names as $name){
            array_push($data,[
                "label"=>$name,
                "value"=>$name
            ]);
        }

        return $data;
    }

    public function migrate()
    {
        Schema::dropIfExists('master_products');
        Schema::create('master_products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string("slug")->nullable();
            $table->text("description")->nullable();
            $table->unsignedBigInteger("type_id")->nullable();
            $table->double("price")->nullable();
            $table->double("sale_price")->nullable();
            $table->string('sku')->nullable();
            $table->integer('quantity')->default(0);
            $table->integer("in_stock")->default(1);
            $table->integer("is_taxable")->default(0);
            $table->unsignedBigInteger('shipping_class_id')->nullable();
            $table->enum("status",['publish','draft'])->default("publish");
            $table->enum("product_type",["simple",'variable'])->default("simple");
            $table->string("unit")->nullable();
            $table->string("height")->nullable();
            $table->string("width")->nullable();
            $table->string("length")->nullable();
            $table->json("image")->nullable();
            $table->json("gallery")->nullable();
            $table->double("max_price")->nullable();
            $table->double("min_price")->nullable();
            $table->integer("is_featured")->default(0);
            $table->timestamp('deleted_at')->nullable();
            $table->timestamps();
        });
        
        $products=Product::all();   
        foreach($products as $product)
        {
            unset($product["shop_id"]);
            $data=$product->toArray();
            $master=MasterProduct::create($data);
            foreach($product->categories as $category){
                DB::table("category_master_product")->insert(
                    [
                        "category_id"=>$category->id,
                        "master_product_id"=>$master->id
                    ]);
            }
            foreach($product->variations as $attribute){
                DB::table("attribute_value_master_product")->insert(
                    [
                        "attribute_value_id"=>$attribute->id,
                        "master_product_id"=>$master->id
                    ]
                );
            }
            foreach($product->tags as $tag){
                DB::table("master_product_tag")->insert([
                    "tag_id"=>$tag->id,
                    "master_product_id"=>$master->id
                ]);
            }
        }

        return 'done';
    }

    public function storeShopProduct(Request $request)
    {

        $master=MasterProduct::find($request->master_id);

        $data=$master->toArray();

        unset($data["id"]);
        unset($data["created_at"]);
        unset($data["updated_at"]);

        $data["price"]=(double)$request->price;
        $data["sale_price"]=(double)$request->sale_price;
        $data["quantity"]=(double)$request->quantity;
        $data["max_price"]=NULL;
        $data["min_price"]=NULL;
        $data["is_featured"]=NULL;
        $data["shop_id"]=$request->shop_id;
        $data=array_merge($data,compact(["shop_id"=>$request->shop_id]));
        $product=Product::create($data);

        foreach($master->categories as $category){
            DB::table("category_master_product")->insert(
                [
                    "category_id"=>$category->id,
                    "master_product_id"=>$product->id
                ]);
        }
        foreach($master->variations as $attribute){
            DB::table("attribute_value_master_product")->insert(
                [
                    "attribute_value_id"=>$attribute->id,
                    "master_product_id"=>$product->id
                ]
            );
        }
        foreach($master->tags as $tag){
            DB::table("master_product_tag")->insert([
                "tag_id"=>$tag->id,
                "master_product_id"=>$product->id
            ]);
        }
        return 1;
    }

}
