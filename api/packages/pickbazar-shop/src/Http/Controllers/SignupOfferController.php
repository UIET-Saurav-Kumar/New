<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Database\Models\SignupOffer;

class SignupOfferController extends CoreController
{
    public function show()
    {
        return SignupOffer::find(1);
    }

    public function store(Request $request)
    {
        SignupOffer::create($request->all());

        return 1;
    }
}
