<?php

use PickBazar\Enums\Permission;

use Illuminate\Support\Facades\Route;
use PickBazar\Http\Controllers\TagController;
use PickBazar\Http\Controllers\TaxController;
use PickBazar\Http\Controllers\ShopController;
use PickBazar\Http\Controllers\TypeController;
use PickBazar\Http\Controllers\UserController;
use PickBazar\Http\Controllers\OfferController;
use PickBazar\Http\Controllers\OrderController;
use PickBazar\Http\Controllers\CouponController;
use PickBazar\Http\Controllers\AddressController;
use PickBazar\Http\Controllers\ProductController;
use PickBazar\Http\Controllers\CategoryController;
use PickBazar\Http\Controllers\SettingsController;
use PickBazar\Http\Controllers\ShippingController;
use PickBazar\Http\Controllers\WithdrawController;
use PickBazar\Http\Controllers\AttributeController;
use PickBazar\Http\Controllers\AttachmentController;
use PickBazar\Http\Controllers\OrderStatusController;
use PickBazar\Http\Controllers\ShopCategoryController;
use PickBazar\Http\Controllers\MasterProductController;
use PickBazar\Http\Controllers\AttributeValueController;
use PickBazar\Database\Models\Order;

Route::post('/register', 'PickBazar\Http\Controllers\UserController@register');
Route::post('/token', 'PickBazar\Http\Controllers\UserController@token');
Route::post('/forget-password', 'PickBazar\Http\Controllers\UserController@forgetPassword');
Route::get('/resend-code/{id}', 'PickBazar\Http\Controllers\UserController@resendCode');
Route::post('/user-verify', 'PickBazar\Http\Controllers\UserController@userVerify');

Route::post('/verify-forget-password-token', 'PickBazar\Http\Controllers\UserController@verifyForgetPasswordToken');
Route::post('/reset-password', 'PickBazar\Http\Controllers\UserController@resetPassword');
Route::post('/contact', 'PickBazar\Http\Controllers\UserController@contactAdmin');
Route::post('/social-login-token', 'PickBazar\Http\Controllers\UserController@socialLogin');

Route::apiResource('products', ProductController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('master-products', MasterProductController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('types', TypeController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('attachments', AttachmentController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('categories', CategoryController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('shop-categories', ShopCategoryController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('offers', OfferController::class, [
    'only' => ['index', 'show']
]);
Route::apiResource('tags', TagController::class, [
    'only' => ['index', 'show']
]);

Route::get('fetch-parent-category', 'PickBazar\Http\Controllers\CategoryController@fetchOnlyParent');

Route::get('fetch-shop-category', 'PickBazar\Http\Controllers\ShopCategoryController@fetchCategories');

Route::get('select-shop-categories', 'PickBazar\Http\Controllers\ShopCategoryController@selectShopCategories');

Route::get('fetch-home-categories', 'PickBazar\Http\Controllers\ShopCategoryController@fetchHomeCateogries');

Route::get('fetch-offers', 'PickBazar\Http\Controllers\ProductController@fetchOffers');

// Route::get('fetch-offers', 'PickBazar\Http\Controllers\OfferController@fetchHomeOffers');

Route::get('shop-availability', 'PickBazar\Http\Controllers\ShopController@shopAvailability');

Route::get('fetch-feature-shops', 'PickBazar\Http\Controllers\ShopController@fetchFeatureShops');

Route::get('fetch-feature-stores', 'PickBazar\Http\Controllers\ShopController@fetchFeatureStores');

Route::get('/admin-shop','PickBazar\Http\Controllers\ShopController@getAdminShop');

Route::get('fetch-feature-products', 'PickBazar\Http\Controllers\ProductController@fetchFeatureProducts');

Route::get('search/{slug}', 'PickBazar\Http\Controllers\ProductController@search');

Route::get('/master-product/migrate', 'PickBazar\Http\Controllers\MasterProductController@migrate');

Route::post('/store-master-product','PickBazar\Http\Controllers\MasterProductController@storeShopProduct');

Route::get('/pagination-master-products','PickBazar\Http\Controllers\MasterProductController@paginationProduct');

Route::get('/created-master-products','PickBazar\Http\Controllers\MasterProductController@createdMasterProducts');

Route::get('/customer/getfeedApi/{app_id}','PickBazar\Http\Controllers\SettingsController@homeFeedApi');

Route::get('product-offers','PickBazar\Http\Controllers\ProductController@product_offers');

Route::put('products-commission/{shop_id}','PickBazar\Http\Controllers\ProductController@product_commission');

Route::put('shop-commission/{shop_id}','PickBazar\Http\Controllers\ShopController@shop_commission');

Route::put('shop-commission-type/{shop_id}','PickBazar\Http\Controllers\ShopController@shop_commission_type');

Route::put('update-referral-commission','PickBazar\Http\Controllers\ShopController@updateReferralCommission');

Route::get('get-referral-commission','PickBazar\Http\Controllers\ShopController@getReferralCommission');

Route::get('get-wallet-commission','PickBazar\Http\Controllers\InviteController@getWalletCommission');

Route::get('referral-network','PickBazar\Http\Controllers\InviteController@refferral_network');

Route::any('order/success', function () {
    $response = request()->all();

    $order_id = $response['orderId'] ?? null;
    $orderAmount = $response['orderAmount'] ?? null;
    $referenceId = $response['referenceId'] ?? null;
    $txStatus = $response['txStatus'] ?? null;
    $paymentMode = $response['paymentMode'] ?? null;
    $txMsg = $response['txMsg'] ?? null;
    $txTime = $response['txTime'] ?? null;
    $signature = $response['signature'] ?? null;

    if ($txStatus != "SUCCESS") {

        $parent_orderid = Order::where('tracking_number', $order_id)->first()->id;
        Order::where('tracking_number', $order_id)->update(['status' => 8]);
        Order::where('parent_id', $parent_orderid)->update(['status' => 8]);
    }

    $url = \Config::get('app.shop_url')."/orders/".$order_id;
    return redirect()->away($url);
});

Route::post('import-products', 'PickBazar\Http\Controllers\ProductController@importProducts');
Route::post('import-variation-options', 'PickBazar\Http\Controllers\ProductController@importVariationOptions');
Route::get('export-products/{shop_id}', 'PickBazar\Http\Controllers\ProductController@exportProducts');
Route::get('export-variation-options/{shop_id}', 'PickBazar\Http\Controllers\ProductController@exportVariableOptions');
Route::post('import-attributes', 'PickBazar\Http\Controllers\AttributeController@importAttributes');
Route::get('export-attributes/{shop_id}', 'PickBazar\Http\Controllers\AttributeController@exportAttributes');

Route::get('export-all-products', 'PickBazar\Http\Controllers\ProductController@exportAllProducts');
Route::post('import-all-products', 'PickBazar\Http\Controllers\ProductController@importAllProducts');

Route::get('export-all-variation-options', 'PickBazar\Http\Controllers\ProductController@exportAllVariableOptions');
Route::post('import-all-variation-options', 'PickBazar\Http\Controllers\ProductController@importAllVariationOptions');


Route::get('export-master-products', 'PickBazar\Http\Controllers\MasterProductController@exportMasterProducts');
Route::post('import-master-products', 'PickBazar\Http\Controllers\MasterProductController@importMasterProducts');

Route::get('export-master-variation-options', 'PickBazar\Http\Controllers\MasterProductController@exportMasterVariableOptions');
Route::post('import-master-variation-options', 'PickBazar\Http\Controllers\MasterProductController@importMasterVariationOptions');

Route::get('export-shops', 'PickBazar\Http\Controllers\ShopController@exportShop');
Route::post('import-shops', 'PickBazar\Http\Controllers\ShopController@importShop');

// busineesId, mobile, ParentBusinees Id
Route::apiResource('coupons', CouponController::class, [
    'only' => ['index', 'show']
]);

Route::post('coupons/verify', 'PickBazar\Http\Controllers\CouponController@verify');


Route::apiResource('order_status', OrderStatusController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('attributes', AttributeController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('all-shop', ShopController::class, [
    'only' => ['index', 'show']
]);


Route::apiResource('attribute-values', AttributeValueController::class, [
    'only' => ['index', 'show']
]);

Route::apiResource('settings', SettingsController::class, [
    'only' => ['index']
]);


Route::group(['middleware' => ['can:' . Permission::CUSTOMER, 'auth:sanctum']], function () {
    Route::post('/logout', 'PickBazar\Http\Controllers\UserController@logout');
    Route::apiResource('orders', OrderController::class, [
        'only' => ['index', 'show', 'store']
    ]);
    Route::get('orders/tracking_number/{tracking_number}', 'PickBazar\Http\Controllers\OrderController@findByTrackingNumber');
    Route::apiResource('attachments', AttachmentController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::post('checkout/verify', 'PickBazar\Http\Controllers\CheckoutController@verify');
    Route::get('me', 'PickBazar\Http\Controllers\UserController@me');
    Route::put('users/{id}', 'PickBazar\Http\Controllers\UserController@update');
    Route::post('/change-password', 'PickBazar\Http\Controllers\UserController@changePassword');
    Route::apiResource('address', AddressController::class, [
        'only' => ['destroy']
    ]);
});


Route::group(
    ['middleware' => ['permission:' . Permission::STAFF . '|' . Permission::STORE_OWNER, 'auth:sanctum']],
    function () {
        Route::get('analytics', 'PickBazar\Http\Controllers\AnalyticsController@analytics');
        Route::apiResource('products', ProductController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);
        Route::apiResource('master-products', MasterProductController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);
        Route::apiResource('attributes', AttributeController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);
        Route::apiResource('attribute-values', AttributeValueController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);
        Route::apiResource('orders', OrderController::class, [
            'only' => ['update', 'destroy']
        ]);
        Route::get('popular-products', 'PickBazar\Http\Controllers\AnalyticsController@popularProducts');
    }
);
Route::put('status-product/{id}',"PickBazar\Http\Controllers\ProductController@updateProductStatus");
Route::group(
    ['middleware' => ['permission:' . Permission::STORE_OWNER, 'auth:sanctum']],
    function () {
        Route::apiResource('all-shop', ShopController::class, [
            'only' => ['store', 'update', 'destroy']
        ]);
        Route::apiResource('withdraws', WithdrawController::class, [
            'only' => ['store', 'index', 'show']
        ]);


        Route::post('users/add-staff', 'PickBazar\Http\Controllers\ShopController@addStaff');
        Route::post('users/remove-staff', 'PickBazar\Http\Controllers\ShopController@removeStaff');
        Route::get('staffs', 'PickBazar\Http\Controllers\UserController@staffs');
        Route::get('my-shops', 'PickBazar\Http\Controllers\ShopController@myShops');
    }
);



Route::group(['middleware' => ['permission:' . Permission::SUPER_ADMIN, 'auth:sanctum']], function () {
    Route::apiResource('types', TypeController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('withdraws', WithdrawController::class, [
        'only' => ['update', 'destroy']
    ]);
    Route::apiResource('categories', CategoryController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('shop-categories', ShopCategoryController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('offers', OfferController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('tags', TagController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('coupons', CouponController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);
    Route::apiResource('order_status', OrderStatusController::class, [
        'only' => ['store', 'update', 'destroy']
    ]);

    Route::apiResource('settings', SettingsController::class, [
        'only' => ['store']
    ]);
    Route::apiResource('users', UserController::class);
    Route::post('users/ban-user', 'PickBazar\Http\Controllers\UserController@banUser');
    Route::post('users/active-user', 'PickBazar\Http\Controllers\UserController@activeUser');
    Route::apiResource('taxes', TaxController::class);
    Route::apiResource('shipping', ShippingController::class);
    Route::post('approve-shop', 'PickBazar\Http\Controllers\ShopController@approveShop');
    Route::post('disapprove-shop', 'PickBazar\Http\Controllers\ShopController@disApproveShop');
    Route::post('approve-withdraw', 'PickBazar\Http\Controllers\WithdrawController@approveWithdraw');
});

Route::get('user-withdraws', 'PickBazar\Http\Controllers\WithdrawController@fetchUserWithdraws');
Route::post('user-withdraws', 'PickBazar\Http\Controllers\WithdrawController@storeUserWithdraws');
