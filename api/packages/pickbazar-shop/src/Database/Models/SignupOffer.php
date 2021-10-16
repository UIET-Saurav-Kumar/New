<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;

class SignupOffer extends Model
{
    protected $table = 'signup_offers';

    protected $fillable=['invitee_reward','inviter_reward'];
}
