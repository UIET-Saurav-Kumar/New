<?php

namespace PickBazar\Database\Models;

use App\Enums\RoleType;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Builder;
use PickBazar\Enums\Permission;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;
    use HasApiTokens;


    protected $guard_name = 'api';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
   // User model
        protected $fillable = [
            'name', 'email', "phone_number", 'current_location', 'gender', 'date_of_birth', 'occupation', 'password', 'is_active', 'shop_id', 'invited_by', 'code', 'balance', 'is_online'
        ];

        protected $casts = [
            'email_verified_at' => 'datetime',
            'is_online' => 'boolean',
        ];


    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected static function boot()
    {
        parent::boot();
        // Order by updated_at desc
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('updated_at', 'desc');
        });
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
   


    /**
     * @return HasMany
     */
    public function address(): HasMany
    {
        return $this->hasMany(Address::class, 'customer_id');
    }

    public function swipes()
    {
        return $this->hasMany(Swipe::class, 'user_id');
    }

    /**
     * @return HasMany
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'customer_id')->with(['products.variation_options', 'status']);
    }

    /**
     * @return HasOne
     */
    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'customer_id');
    }

    /**
     * @return HasOne
     */
    public function shops(): HasMany
    {
        return $this->hasMany(Shop::class, 'owner_id');
    }

    /**
     * @return BelongsTo
     */
    public function managed_shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class, 'shop_id');
    }

    /**
     * @return HasMany
     */
    public function providers(): HasMany
    {
        return $this->hasMany(Provider::class, 'user_id', 'id');
    }

      /**
     * @return HasMany
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'user_id');
    }

    /**
     * @return HasMany
     */
    public function questions(): HasMany
    {
        return $this->hasMany(Question::class, 'user_id');
    }

    public function getCurrentLocationAttribute($value)
    {
        return json_decode($value, true);
    }



    public function balance(): HasOne
    {
        return $this->hasOne(Balance::class, 'user_id');
    }

    public function role(){
        
        if($this->hasPermissionTo(Permission::SUPER_ADMIN)){
            $role="Super Admin";
        // }else if($this->hasPermissionTo(Permission::CUSTOMER)){
        //     $role="Customer";
        }else if($this->hasPermissionTo(Permission::STORE_OWNER)){
            $role="Store Owner";
        }else if($this->hasPermissionTo(Permission::STAFF))
        {
            $role="Staff";
        }else {
            $role="Customer";
        }
        
        return [
            "role"=>$role
        ];
    }
}
