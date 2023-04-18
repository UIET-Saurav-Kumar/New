<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
 {
    protected $fillable = [
        'user1_id',
        'user2_id',
    ];
 }
