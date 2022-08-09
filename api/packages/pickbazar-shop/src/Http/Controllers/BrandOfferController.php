<?php


namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use PickBazar\Database\Models\BrandOffer;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Validator\Exceptions\ValidatorException;
use PickBazar\Http\Requests\BrandOfferCreateRequest;
use PickBazar\Http\Requests\BrandOfferUpdateRequest;
use PickBazar\Database\Repositories\BrandOfferRepository;


class BrandOfferController extends CoreController
{
    public $repository;

    public function __construct(BrandOfferRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|BrandOffer[]
     */
    public function fetchBrandOffers(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->paginate($limit);
    }
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|BrandOffer[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param BrandOfferCreateRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(BrandOfferCreateRequest $request)
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
            return $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->findOrFail($id);
        } catch (\Exception $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_FOUND');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param BrandOfferUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(BrandOfferUpdateRequest $request, $id)
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

    public function fetchHomeBrandOffers(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        // repository with tags types 
        return $this->repository->with(['type', 'shop', 'categories', 'tags', 'variations.attribute'])->paginate($limit);
    }

    public function selectBrandOffer(Request $request)
    {
        return $this->repository->get();
    }
}



