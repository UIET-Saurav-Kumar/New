<?php

use Illuminate\Support\Facades\Route;
use PickBazar\Database\Models\Product;
use Cviebrock\EloquentSluggable\Services\SlugService;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/sluggify-this',function () {
    $products=Product::select('id')->get();    
    foreach($products as $p){
        $product=Product::find($p->id);
        $product->slug=SlugService::createSlug(Product::class, 'slug', $product->name);
        $product->save();
    }

    return "done";
});