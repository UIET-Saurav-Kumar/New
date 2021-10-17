<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class License extends Model
{
    protected $table = 'licenses';

    protected $fillable=['gst_number','gst_certificate','fssai_number','fssai_certificate','cancelled_cheque','tan_number','pan_number','user_id'];
    
    public $guarded = [];
}
