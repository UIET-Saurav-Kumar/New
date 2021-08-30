<?php


namespace PickBazar\Http\Controllers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use PickBazar\Database\Models\ShopCategory;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\CategoryCreateRequest;
use PickBazar\Http\Requests\CategoryUpdateRequest;
use Prettus\Validator\Exceptions\ValidatorException;
use PickBazar\Http\Requests\ShopCategoryCreateRequest;
use PickBazar\Http\Requests\ShopCategoryUpdateRequest;
use PickBazar\Database\Repositories\ShopCategoryRepository;


class ShopCategoryController extends CoreController
{
    public $repository;

    public function __construct(ShopCategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|ShopCategory[]
     */
    public function fetchCategories(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->paginate($limit);
    }
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|ShopCategory[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ShopCategoryCreateRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(ShopCategoryCreateRequest $request)
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
            return $this->repository->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ShopCategoryUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(ShopCategoryUpdateRequest $request, $id)
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

    public function fetchHomeCateogries(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        return $this->repository->limit($limit);
    }

    public function selectShopCategories(Request $request)
    {
        return $this->repository->select("name","id")->get();
    }
}
