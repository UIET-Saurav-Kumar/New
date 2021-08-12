<?php


namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use PickBazar\Database\Models\Offer;
use Illuminate\Database\Eloquent\Collection;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Validator\Exceptions\ValidatorException;
use PickBazar\Http\Requests\OfferCreateRequest;
use PickBazar\Http\Requests\OfferUpdateRequest;
use PickBazar\Database\Repositories\OfferRepository;


class OfferController extends CoreController
{
    public $repository;

    public function __construct(OfferRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Offer[]
     */
    public function fetchOffers(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->paginate($limit);
    }
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Offer[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ?   $request->limit : 15;
        return $this->repository->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param OfferCreateRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(OfferCreateRequest $request)
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
     * @param OfferUpdateRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(OfferUpdateRequest $request, $id)
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

    public function fetchHomeOffers(Request $request)
    {
        $limit = isset($request->limit) ? $request->limit : 10;
        return $this->repository->orderByRaw("RAND()")->limit($limit)->get();
    }

    public function selectOffer(Request $request)
    {
        return $this->repository->get();
    }
}



