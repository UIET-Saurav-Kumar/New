<?php


namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Balance;
use PickBazar\Database\Models\Withdraw;
use PickBazar\Database\Repositories\WithdrawRepository;
use PickBazar\Enums\Permission;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\UpdateWithdrawRequest;
use PickBazar\Http\Requests\WithdrawRequest;
use Prettus\Validator\Exceptions\ValidatorException;
use PickBazar\Helpers\InteraktHelper;


class WhatsappController extends CoreController
{
    // public $repository;

    // public function __construct(WithdrawRepository $repository)
    // {
    //     $this->repository = $repository;
    // }
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|Whatsapp[]
     */

    public function trackUser(Request $request)
    {
        $CURLOPT_POSTFIELDS     = $request->api_fields;
        
        $endpoint = 'track/users/';

        $response   = InteraktHelper::interaktApi(json_encode($CURLOPT_POSTFIELDS),$endpoint);

        return $response;
    }

    public function trackEvent(Request $request)
    {
        $CURLOPT_POSTFIELDS     = $request->api_fields;
        
        $endpoint = 'track/events/';

        $response   = InteraktHelper::interaktApi(json_encode($CURLOPT_POSTFIELDS),$endpoint);

        return $response;

    }
}
