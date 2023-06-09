<?php
namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuthBrand extends Model
{
    use HasFactory;

    protected $table = 'auth_brands';
    
    protected $fillable = ['user_id', 'user_name', 'brands'];

    protected $casts = [
        'brands' => 'array',
    ];
}
