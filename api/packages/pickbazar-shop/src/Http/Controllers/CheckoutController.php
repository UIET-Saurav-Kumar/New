<?php

namespace PickBazar\Http\Controllers;

use PickBazar\Database\Repositories\CheckoutRepository;
use PickBazar\Http\Requests\CheckoutVerifyRequest;
use Pickbazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use PickBazar\Exceptions\PickbazarException;

class CheckoutController extends CoreController

{
    public $repository;

    public function __construct(CheckoutRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Verify the checkout data and calculate tax and shipping.
     *
     * @param CheckoutVerifyRequest $request
     * @return array
     */
    public function verify(Request $request)
    {
        $user = $request->user();
        if ($user->can(Permission::CUSTOMER)) {

            // dd($this->repository->verify($request));

            return $this->repository->verify($request);
        } else {
            throw new PickbazarException('PICKBAZAR_ERROR.NOT_AUTHORIZED');
        }
    }
}
