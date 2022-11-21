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
use PickBazar\Database\Repositories\TermLifeInsuranceRepository;


class TermLifeInsuranceController extends CoreController

{

    //index function to get all the data from the database
    public $repository;

    public function __construct(ContactRepository $repository)
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
        $contact = $this->repository;
        return $contact->paginate($limit);
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


    public function show(Request $request, $id)
    {
        $request->id = $id;
        return $this->fetchSingleContact($request);
    }

}
