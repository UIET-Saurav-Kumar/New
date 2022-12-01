<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use PickBazar\Enums\Permission;
use PickBazar\Enums\WithdrawStatus;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use PickBazar\Exceptions\PickbazarException;
use Illuminate\Database\Migrations\Migration;
use PickBazar\Database\Models\TermLifeInsurance;
use PickBazar\Database\Repositories\TermLifeInsuranceRepository;
use PickBazar\Database\Repositories\ContactRepository;



class TermLifeInsuranceController extends CoreController


{
    public $repository;

    public function __construct(TermLifeInsuranceRepository $repository)
    {
        $this->repository = $repository;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * 
     */

    public function index(Request $request)
    {
        $limit = $request->limit ?  $request->limit : 25;
        $insured = $this->repository;
        return $insured->paginate($limit);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return mixed
     * @throws ValidatorException
     */ 


    public function store(Request $request)
    {
        return $this->repository->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */


}
