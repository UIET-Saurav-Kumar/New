<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class TermLifeInsurance extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'date_of_birth',
        'is_tobacco_user',
        'annual_income',
        'education',
        'occupation',
        'pin_code',
        'mobile_number',
    ]; 

    
    protected $table = 'term_life_insurance';

    public $guarded = [];
}
