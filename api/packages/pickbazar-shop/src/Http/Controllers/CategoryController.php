<?php


namespace PickBazar\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Category;
use PickBazar\Database\Repositories\CategoryRepository;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\CategoryCreateRequest;
use PickBazar\Http\Requests\CategoryUpdateRequest;
use Prettus\Validator\Exceptions\ValidatorException;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\Product;


class CategoryController extends CoreController
{
    public $repository;

    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Category[]
     */
    public function fetchOnlyParent(Request $request)
    {
        if($request->search != null)
        {
            $checkslug = (explode(":",$request->search));
            if($checkslug[0] == 'name')
            {
                $searchItem = $checkslug[1];
                $limit = $request->limit ? $request->limit : 15;
                return Category::with(['type','parent','children.type'])->where(function($query) use ($searchItem)
                        {
                            $query->where('slug', $searchItem);
                        })
                        ->orWhere(function($query) use ($searchItem)
                        {
                            $query->where('name', $searchItem);
                            
                        })->orWhere(function($query) use ($searchItem)
                        {
                            $query->where('details', $searchItem);
                            
                        })->orWhere(function($query) use ($searchItem)
                        {
                            $query->where('id', $searchItem);
                            
                        })->paginate($limit);
            }
            $limit = $request->limit ? $request->limit : 15;
    
            $shopid = Shop::where('slug', $checkslug[1])->get()->first();
            $findid = Product::where('shop_id', $shopid->id)->get()->first()->type_id ?? 0;
            $shop_id = $shopid->id;
            $res = Category::with(['type','parent','children.type','children.products','products'])
                    ->whereHas('products', function ($query) use ($shop_id){
                        return empty($query) ? false : $query->where('shop_id', $shop_id);
                    })->where('type_id', $findid)->where('parent',null)->paginate($limit);
    
            return $res;
        }
        else
        {
            
            $limit = $request->limit ?   $request->limit : 15;
            return $this->repository->with(['type', 'parent', 'children.type'])->paginate($limit);
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Category[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(['type', 'parent', 'children'])->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CategoryCreateRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(CategoryCreateRequest $request)
    {
        $validatedData = $request->validated();
        return $this->repository->create($validatedData);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id)
    {
        try {
            return $this->repository->with(['type', 'parent', 'children'])->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CategoryUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(CategoryUpdateRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();
            return $this->repository->findOrFail($id)->update($validatedData);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
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
}
