<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\Type;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\Category;
use PickBazar\Database\Models\ShopCategory;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Database\Models\VariationOption;
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
        
        $shop_id="";
        if($request->search != null)
        {

            $pluckcat = explode(';',$request->search);
            $pluckall = explode(':', $pluckcat[0]);
            if(isset($pluckcat[1])){
                $shop_id=explode(':',$pluckcat[1])[1];
            }
            if($pluckall[1] == 'all')
            {
                $request->replace([
                    'search' => $pluckcat[1],
                    'searchJoin' => $request->searchJoin,
                    'limit' => $request->limit
                    ]);
            }
        }
        $limit = $request->limit ?   $request->limit : 15;    
        $repdata = $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->orderBy('is_offer', 'desc')->paginate($limit);
        foreach($repdata as $key=>$val)
        {
            $repdata[$key]->image_original = $val->image['original'];
        }
        return $repdata;

        // $category = $request->category != null ? true : false;
        // dd($category);
        // if($category)
        // {
        //     $slug = $request->category;
        //     $limit = $request->limit ?   $request->limit : 15;
            
        //     $repdata = $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->
        //                 whereHas('categories', function ($query) use ($slug ) {
        //                     return $query->where('slug', $slug);
        //                 })->orderBy('is_offer', 'desc')->paginate($limit);
          
        //     return $repdata;
        // }
        // else
        // {
//             $limit = $request->limit ?   $request->limit : 15;
//             $repdata = $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->orderBy('is_offer', 'desc')->paginate($limit);
//             return $repdata;
        // }
        
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
    public function exportAllProducts(Request $request)
    {
        $filename = 'all-products'.'.csv';
        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=' . $filename,
            'Expires'             => '0',
            'Pragma'              => 'public'
        ];

        $list = $this->repository->get()->toArray();
        if (!count($list)) {
            return response()->stream(function () {
            }, 200, $headers);
        }
        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function () use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $key => $row) {
                if ($key === 0) {
                    $exclude = ['id', 'slug', 'deleted_at', 'created_at', 'updated_at', 'shipping_class_id','image','gallery'];
                    $row = array_diff($row, $exclude);
                }
                unset($row['id']);
                unset($row['deleted_at']);
                unset($row['shipping_class_id']);
                unset($row['updated_at']);
                unset($row['created_at']);
                unset($row['slug']);
                unset($row['image']);
                unset($row['gallery']);
                
                fputcsv($FH, $row);
            }
            fclose($FH);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function exportProducts(Request $request, $shop_id)
    {
        $filename = 'products-for-shop-id-' . $shop_id . '.csv';
        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=' . $filename,
            'Expires'             => '0',
            'Pragma'              => 'public'
        ];

        $list = $this->repository->where('shop_id', $shop_id)->get()->toArray();
        if (!count($list)) {
            return response()->stream(function () {
            }, 200, $headers);
        }
        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function () use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $key => $row) {
                if ($key === 0) {
                    $exclude = ['id', 'slug', 'deleted_at', 'created_at', 'updated_at', 'shipping_class_id','image','gallery'];
                    $row = array_diff($row, $exclude);
                }
                unset($row['id']);
                unset($row['deleted_at']);
                unset($row['shipping_class_id']);
                unset($row['updated_at']);
                unset($row['created_at']);
                unset($row['slug']);
                unset($row['image']);
                unset($row['gallery']);
                
                fputcsv($FH, $row);
            }
            fclose($FH);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function exportVariableOptions(Request $request, $shop_id)
    {

        $filename = 'variable-options-' . Str::random(5) . '.csv';
        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=' . $filename,
            'Expires'             => '0',
            'Pragma'              => 'public'
        ];

        $products = $this->repository->where('shop_id', $shop_id)->get();

        $list = VariationOption::WhereIn('product_id', $products->pluck('id'))->get()->toArray();

        if (!count($list)) {
            return response()->stream(function () {
            }, 200, $headers);
        }
        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function () use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $key => $row) {
                if ($key === 0) {
                    $exclude = ['id', 'created_at', 'updated_at'];
                    $row = array_diff($row, $exclude);
                }
                unset($row['id']);
                unset($row['updated_at']);
                unset($row['created_at']);
                if (isset($row['options'])) {
                    $row['options'] = json_encode($row['options']);
                }
                fputcsv($FH, $row);
            }
            fclose($FH);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function importAllProducts(Request $request)
    {
        $requestFile = $request->file();

        $user = $request->user();

        if (count($requestFile)) {
            if (isset($requestFile['csv'])) {
                $uploadedCsv = $requestFile['csv'];
            } else {
                $uploadedCsv = current($requestFile);
            }
        }

        if (!$this->repository->adminPermission($user)) {
            throw new PickbazarException(config('shop.app_notice_domain') . 'ERROR.NOT_AUTHORIZED');
        }
        
        $file = $uploadedCsv->storePubliclyAs('csv-files', 'all-products'.'.' . $uploadedCsv->getClientOriginalExtension(), 'public');

        $products = $this->repository->csvToArray(storage_path() . '/app/public/' . $file);

        foreach ($products as $key => $product) {
            if (!isset($product['type_id'])) {
                throw new PickbazarException("MARVEL_ERROR.WRONG_CSV");
            }
            unset($product['id']);
            unset($product['max_price']);
            unset($product['min_price']);
            unset($product['sale_price']);
            unset($product['commission']);
            unset($product['is_featured']);
            unset($product['image']);
            unset($product['gallery']);



            // try {
                $type = Type::find($product['type_id']);
                if (isset($type->id)) {
                    $product["slug"]=$this->getSlug($product["name"]);
                    Product::firstOrCreate($product);
                }
            // } catch (Exception $e) {
            // }
        }
        return true;
        
    }

    public function importProducts(Request $request)
    {
        $requestFile = $request->file();

        $user = $request->user();
        $shop_id = $request->shop_id;

        if (count($requestFile)) {
            if (isset($requestFile['csv'])) {
                $uploadedCsv = $requestFile['csv'];
            } else {
                $uploadedCsv = current($requestFile);
            }
        }

        if (!$this->repository->hasPermission($user, $shop_id)) {
            throw new PickbazarException(config('shop.app_notice_domain') . 'ERROR.NOT_AUTHORIZED');
        }
        if (isset($shop_id)) {
            $file = $uploadedCsv->storePubliclyAs('csv-files', 'products-' . $shop_id . '.' . $uploadedCsv->getClientOriginalExtension(), 'public');

            $products = $this->repository->csvToArray(storage_path() . '/app/public/' . $file);

            foreach ($products as $key => $product) {
                if (!isset($product['type_id'])) {
                    throw new PickbazarException("MARVEL_ERROR.WRONG_CSV");
                }
                unset($product['id']);
                unset($product['max_price']);
                unset($product['min_price']);
                unset($product['sale_price']);
                unset($product['is_featured']);
                unset($product['commission']);
                unset($product['image']);
                unset($product['gallery']);

                $product['shop_id'] = $shop_id;

                // try {
                    $type = Type::find($product['type_id']);
                    if (isset($type->id)) {
                        $product["slug"]=$this->getSlug($product["name"]);
                        Product::firstOrCreate($product);
                    }
                // } catch (Exception $e) {
                // }
            }
            return true;
        }
    }


    public function importVariationOptions(Request $request)
    {
        $requestFile = $request->file();
        $user = $request->user();
        $shop_id = $request->shop_id;

        if (count($requestFile)) {
            if (isset($requestFile['csv'])) {
                $uploadedCsv = $requestFile['csv'];
            } else {
                $uploadedCsv = current($requestFile);
            }
        } else {
            throw new PickbazarException(config('shop.app_notice_domain') . 'ERROR.CSV_NOT_FOUND');
        }

        if (!$this->repository->hasPermission($user, $shop_id)) {
            throw new PickbazarException(config('shop.app_notice_domain') . 'ERROR.NOT_AUTHORIZED');
        }
        if (isset($user->id)) {
            $file = $uploadedCsv->storePubliclyAs('csv-files', 'variation-options-' . Str::random(5) . '.' . $uploadedCsv->getClientOriginalExtension(), 'public');

            $attributes = $this->repository->csvToArray(storage_path() . '/app/public/' . $file);

            foreach ($attributes as $key => $attribute) {
                if (!isset($attribute['title']) || !isset($attribute['price'])) {
                    throw new PickbazarException("MARVEL_ERROR.WRONG_CSV");
                }
                unset($attribute['id']);
                $attribute['options'] = json_decode($attribute['options'], true);
                // try {
                    $product = Type::find($attribute['product_id']);
                    if (isset($product->id)) {
                        VariationOption::firstOrCreate($attribute);
                    }
                // } catch (Exception $e) {
                // }
            }
            return true;
        }
    }

    private function getSlug($name)
    {
        $is_unique=FALSE;
        while(!$is_unique){
            $permitted_chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            $postfix=substr(str_shuffle($permitted_chars), 0, 4);

            $slug=str_replace(" ","-",$name)."-".$postfix;

            $product=Product::where('slug',$slug)->first();
            if(!$product){
                $is_unique=TRUE;
            }
        }

        return $slug;
    }


    public function importAllVariationOptions(Request $request)
    {
        $requestFile = $request->file();
        $user = $request->user();

        if (count($requestFile)) {
            if (isset($requestFile['csv'])) {
                $uploadedCsv = $requestFile['csv'];
            } else {
                $uploadedCsv = current($requestFile);
            }
        } else {
            throw new PickbazarException(config('shop.app_notice_domain') . 'ERROR.CSV_NOT_FOUND');
        }

        if (!$this->repository->adminPermission($user)) {
            throw new PickbazarException(config('shop.app_notice_domain') . 'ERROR.NOT_AUTHORIZED');
        }
        if (isset($user->id)) {
            $file = $uploadedCsv->storePubliclyAs('csv-files', 'all-variation-options-' . Str::random(5) . '.' . $uploadedCsv->getClientOriginalExtension(), 'public');

            $attributes = $this->repository->csvToArray(storage_path() . '/app/public/' . $file);

            foreach ($attributes as $key => $attribute) {
                if (!isset($attribute['title']) || !isset($attribute['price'])) {
                    throw new PickbazarException("MARVEL_ERROR.WRONG_CSV");
                }
                unset($attribute['id']);
                $attribute['options'] = json_decode($attribute['options'], true);
                // try {
                    $product = Type::find($attribute['product_id']);
                    if (isset($product->id)) {
                        VariationOption::firstOrCreate($attribute);
                    }
                // } catch (Exception $e) {
                // }
            }
            return true;
        }
    }

    public function exportAllVariableOptions(Request $request)
    {

        $filename = 'variable-options-' . Str::random(5) . '.csv';
        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=' . $filename,
            'Expires'             => '0',
            'Pragma'              => 'public'
        ];

        $products = $this->repository->get();

        $list = VariationOption::WhereIn('product_id', $products->pluck('id'))->get()->toArray();

        if (!count($list)) {
            return response()->stream(function () {
            }, 200, $headers);
        }
        # add headers for each column in the CSV download
        array_unshift($list, array_keys($list[0]));

        $callback = function () use ($list) {
            $FH = fopen('php://output', 'w');
            foreach ($list as $key => $row) {
                if ($key === 0) {
                    $exclude = ['id', 'created_at', 'updated_at'];
                    $row = array_diff($row, $exclude);
                }
                unset($row['id']);
                unset($row['updated_at']);
                unset($row['created_at']);
                if (isset($row['options'])) {
                    $row['options'] = json_encode($row['options']);
                }
                fputcsv($FH, $row);
            }
            fclose($FH);
        };

        return response()->stream($callback, 200, $headers);
    }


















    

}
