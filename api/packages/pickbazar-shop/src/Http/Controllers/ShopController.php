<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\User;
use Illuminate\Support\Facades\Hash;
use PickBazar\Database\Models\Balance;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\ShopCategory;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Database\Repositories\ProductRepository;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\ShopCreateRequest;
use PickBazar\Http\Requests\ShopUpdateRequest;
use PickBazar\Http\Requests\UserCreateRequest;
use PickBazar\Database\Repositories\ShopRepository;

class ShopController extends CoreController
{
    public $repository;

    public function __construct(ShopRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Shop[]
     */
    public function index(Request $request)
    {
        $category_slug=$request->category;
        $location=($request->location)?json_decode($request->location):"";
        $search=$request->search;
        if($search){
            $search=str_contains($request->search,"-")?str_replace("-","&",$request->search):$request->search;
        }
        $shops_ids=[];
        

        $limit = $request->limit ?  $request->limit : 15;

        $shops=$this->fetchShops($request)->where("is_active",1);
        if($search)
        {
            $shops_ids=ProductRepository::searchByValue($search);
            $shops->whereIn('id',$shops_ids);
        }

        if($location)
        {
            $shops_ids=ShopRepository::getSortedShops($location,$shops_ids);
            $shops->whereIn('id',$shops_ids);
        }

        if($category_slug)
        {
            $temp_shops=$shops;
            $category_shop_array=[];
            $category_name=str_replace("-","&",$category_slug);
            
            $category_id=ShopCategory::where('name',$category_name)->first()->id;
            // dd($category_id);
            foreach($temp_shops->get() as $s){
                $shop_categories=$this->getCategoryId($s->shop_categories);
                if(is_array($shop_categories)){
                    if(in_array($category_id,$shop_categories)){
                        array_push($category_shop_array,$s->id);
                    }
                }
            }

            $shops->whereIn("id",$category_shop_array);
        }

        

        return $shops->paginate()->withQueryString();
        
    }

    public function getAdminShop(Request $request)
    {
        $shops=$this->fetchShops($request);
        return $shops->paginate()->withQueryString();
    }
    
    private function getCategoryId($shop_categories)
    {
        $shop_categories=json_decode($shop_categories);
        $ids=[];
        if(!is_array($shop_categories)){
            return "";
        }
        foreach($shop_categories as $category)
        {
            if(isset($category->name)){
                array_push($ids,$category->id);
            }
        }
        return $ids;
    }
    public function fetchShops(Request $request)
    {
        return Shop::withCount(['orders', 'products'])->with(['owner.profile'])->where('id', '!=', null);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param ShopCreateRequest $request
     * @return mixed
     */
    public function store(ShopCreateRequest $request)
    {
        if ($request->user()->hasPermissionTo(Permission::STORE_OWNER)) {
            return $this->repository->storeShop($request);
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
        
        $shop = $this->repository
            ->with(['categories', 'owner','shop_category'])
            ->withCount(['orders', 'products']);
        if ($request->user() && ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN) || $request->user()->shops->contains('slug', $slug))) {
            $shop = $shop->with('balance');
        }
        
        try {
            if(is_numeric($slug)){
                $shop = $shop->findOneByFieldOrFail('id', $slug);
            }else{
                $shop = $shop->findOneByFieldOrFail('slug', $slug);
            }
            return $shop;
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    	
    /**
     * Update the specified resource in storage.
     *
     * @param ShopUpdateRequest $request
     * @param int $id
     * @return array
     */
    public function update(ShopUpdateRequest $request, $id)
    {
        $request->id = $id;
        return $this->updateShop($request);
    }

    public function updateShop(Request $request)
    {
        $id = $request->id;
        if ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN) || ($request->user()->hasPermissionTo(Permission::STORE_OWNER) && ($request->user()->shops->contains($id)))) {
            return $this->repository->updateShop($request, $id);
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
    public function destroy(Request $request, $id)
    {
        $request->id = $id;
        return $this->deleteShop($request);
    }

    public function deleteShop(Request $request)
    {
        $id = $request->id;
        if ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN) || ($request->user()->hasPermissionTo(Permission::STORE_OWNER) && ($request->user()->shops->contains($id)))) {
            try {
                $shop = $this->repository->findOrFail($id);
            } catch (\Exception $e) {
                throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
            }
            $shop->delete();
            return $shop;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function approveShop(Request $request)
    {
        $id = $request->id;
        $admin_commission_rate = $request->admin_commission_rate;
        try {
            $shop = $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        $shop->is_active = true;
        $shop->save();
        $balance = Balance::firstOrNew(['shop_id' => $id]);
        $balance->admin_commission_rate = $admin_commission_rate;
        $balance->save();
        return $shop;
    }


    public function disApproveShop(Request $request)
    {
        $id = $request->id;
        try {
            $shop = $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }

        $shop->is_active = false;
        $shop->save();

        Product::where('shop_id', '=', $id)->update(['status' => 'draft']);

        return $shop;
    }

    public function addStaff(UserCreateRequest $request)
    {
        if ($this->repository->hasPermission($request->user(), $request->shop_id)) {
            $permissions = [Permission::CUSTOMER, Permission::STAFF];
            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'shop_id'  => $request->shop_id,
                'password' => Hash::make($request->password),
            ]);

            $user->givePermissionTo($permissions);

            return true;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function removeStaff(Request $request)
    {
        $id = $request->id;
        try {
            $staff = User::findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
        if ($request->user()->hasPermissionTo(Permission::STORE_OWNER) || ($request->user()->hasPermissionTo(Permission::STORE_OWNER) && ($request->user()->shops->contains('id', $staff->shop_id)))) {
            $staff->delete();
            return $staff;
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }

    public function myShops(Request $request)
    {
        $user = $request->user;
        return $this->repository->where('owner_id', '=', $user->id)->get();
    }

    public function fetchFeatureShops(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        $location=($request->location)?json_decode($request->location):"";

        if($location){
            $shops=ShopRepository::getSortedShops($location);
            return Shop::whereIn("id",$shops)->where("is_active",1)->limit($limit)->get();
        }
        return Shop::limit($limit)->where("is_active",1)->get();
    }

    public function fetchFeatureStores(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        return $this->repository->orderByRaw("RAND()")->where("is_active",1)->limit($limit)->get();
    }

    public function shop_commission(Request $request,$shop_id)
    {
        if ($request->user() && ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN))){
            
            $shop=Shop::find($shop_id);
            if($shop){
                $shop->commission=$request->commission;
                $shop->save();
            }

            return "success";
        }
    }

    public function shop_commission_type(Request $request,$shop_id)
    {
        if ($request->user() && ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN))){
            
            $shop=Shop::find($shop_id);
            if($shop){
                $shop->commission_type=$request->commission_type;
                $shop->save();
            }

            return "success";
        }
    }
}
