<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class UtilityPayment extends Model
{
    protected $table = 'utility_payments';

    public $guarded = [];

    protected static function boot()
    {
        parent::boot();
        // UtilityPayment by created_at desc
        static::addGlobalScope('utilityPayment', function (Builder $builder) {
            $builder->orderBy('created_at', 'desc');
        });
    }

    protected $with = ['customer'];


    /**
     * @return belongsTo
     */
    public function coupon(): belongsTo
    {
        return $this->belongsTo(Coupon::class, 'coupon_id');
    }

    /**
     * @return belongsTo
     */
    public function customer(): belongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}
