<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TermLifeInsurance extends Model
{
    use HasFactory;
    
    protected $table = 'term_life_insurance';

    public $guarded = [];
}
