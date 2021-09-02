<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invite extends Model
{
    protected $table = 'invites';

    public $guarded = [];

}
