<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use PickBazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use PickBazar\Database\Models\Log;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\Type;
use PickBazar\Database\Models\User;
use Illuminate\Support\Facades\Hash;
use PickBazar\Database\Models\Balance;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\ShopCategory;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Database\Models\MasterProduct;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\ShopCreateRequest;
use PickBazar\Http\Requests\ShopUpdateRequest;
use PickBazar\Http\Requests\UserCreateRequest;
use PickBazar\Database\Models\ReferralCommission;
use PickBazar\Database\Repositories\ShopRepository;
use PickBazar\Database\Repositories\ProductRepository;

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

        if($category_slug)
        {
            $temp_shops=$shops;
            $category_shop_array=[];
            $category_name=str_replace("-","&",$category_slug);
            
            $category_id=ShopCategory::where('name',$category_name)->first()->id;
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

        $shops_array=[];
        $shops_ids=$shops->pluck('id');

        if($location)
        {
            
            $shops_ids=ShopRepository::getSortedShops($location,$shops_ids);
            foreach($shops_ids as $id){
                $single_shop=Shop::find($id);
                if($single_shop){
                    array_push($shops_array,$single_shop);
                }
            }
        }
        
        return [
            "data"=>$shops_array
        ];
    }

    public function getAdminShop(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 10;
        return $this->fetchRepoShops($request)->paginate($limit)->withQueryString();
    }

    public function fetchRepoShops(Request $request)
    {
        return $this->repository->withCount(['orders', 'products'])->with(['owner.profile'])->where('id', '!=', null);
    }

    public function fetchShops(Request $request)
    {
        return Shop::withCount(['orders', 'products'])->with(['owner.profile'])->where('id', '!=', null);
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

    public function shopAvailability(Request $request)
    {
        $location=($request->location)?json_decode($request->location):"";
        if($location){
            $shops=ShopRepository::getSortedShops($location);
            if(count($shops)==0){
                return [
                    "check"=>0
                ];        
            }
        }
        return [
            "check"=>1
        ];
    }

    public function fetchFeatureShops(Request $request)
    {

        $limit = isset($request->limit) ? $request->limit : 10;
        $location=($request->location)?json_decode($request->location):"";

        if($location){
            $shops=ShopRepository::getSortedShops($location);
            $shops_array=[];
            foreach($shops as $id){
                $s=Shop::where("id",$id)->where("is_featured",1)->where("is_active",1)->limit($limit)->first();
                if($s){
                    array_push($shops_array,$s);
                }
            }
            return $shops_array;
        }
        return Shop::limit($limit)->where("is_featured",1)->where("is_active",1)->get();
    }

    public function fetchFeatureStores(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        return $this->repository->orderByRaw("RAND()")->where("is_active",1)->limit($limit)->get();
    }

    public function shop_commission(Request $request,$shop_id)
    {
        if ($request->user() && ($request->user()->hasPermissionTo(Permission::SUPER_ADMIN))){
            $balance = Balance::firstOrNew(['shop_id' => $shop_id]);
            $balance->admin_commission_rate = $request->commission;
            $balance->save();

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

    public function updateReferralCommission(Request $request)
    {
        $request->validate([
            "customer_commission"=>"required",
            "level1_commission"=>"required",
            "level2_commission"=>"required",
            "level3_commission"=>"required",
        ]);
        $referral=ReferralCommission::find(1);
        if($referral){
            $referral->update($request->all());
        }else{
            ReferralCommission::create($request->all());
        }


        return "success";
    }
    public function getReferralCommission(){
        return [
            "data"=>ReferralCommission::select("customer_commission","level1_commission","level2_commission","level3_commission")
            ->first()
        ];
    }

    public function exportShop(Request $request)
    {
        $filename = 'shops'.'.csv';
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
                    $exclude = ['id','slug','created_at', 'updated_at','cover_image','logo','shop_categories','address','settings'];

                    $row = array_diff($row, $exclude);
   
                }
                unset($row['id']);
                unset($row['updated_at']);
                unset($row['created_at']);
                unset($row['slug']);
                unset($row['cover_image']);
                unset($row['logo']);
                unset($row['shop_categories']);
                unset($row['address']);
                unset($row['settings']);

                
                fputcsv($FH, $row);
            }
            fclose($FH);
        };
        
        return response()->stream($callback, 200, $headers);
    }

    public function importShop(Request $request)
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
        
        $file = $uploadedCsv->storePubliclyAs('csv-files', 'shops'.'.' . $uploadedCsv->getClientOriginalExtension(), 'public');

        $shops = $this->repository->csvToArrayShop(storage_path() . '/app/public/' . $file);

        foreach ($shops as $key => $shop) {
            // if (!isset($shop['type_id'])) {
            //     throw new PickbazarException("MARVEL_ERROR.WRONG_CSV");
            // }
            unset($shop['id']);
            unset($shop['updated_at']);
            unset($shop['created_at']);
            unset($shop['slug']);
            unset($shop['logo']);
            unset($shop['cover_image']);
            unset($shop['settings']);
            unset($shop['shop_categories']);
            unset($shop['address']);

            if(!$shop['commission']){
                unset($shop['commission']);
            }
            
            
            Shop::create($shop);
            
        }
        return true;
        
    }   
}
