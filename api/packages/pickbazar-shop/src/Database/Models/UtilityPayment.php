<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class UtilityPayment extends Model
{
    use SoftDeletes;

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

    protected $with = ['customer', 'status'];


    /**
     * @return belongsTo
     */
    public function status(): belongsTo
    {
        return $this->belongsTo(UtilityPaymentStatus::class, 'status');
    }

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

    /**
     * @return BelongsTo
     */
    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }

    /**
     * @return HasMany
     */
    public function children()
    {
        return $this->hasMany('PickBazar\Database\Models\UtilityPayment', 'parent_id', 'id');
    }

    /**
     * @return HasOne
     */
    public function parent_order()
    {
        return $this->hasOne('PickBazar\Database\Models\UtilityPayment', 'id', 'parent_id');
    }
}
