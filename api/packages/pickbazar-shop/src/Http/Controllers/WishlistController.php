<?php


namespace PickBazar\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PickBazar\Database\Models\AbusiveReport;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Repositories\WishlistRepository;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\AbusiveReportCreateRequest;
use PickBazar\Http\Requests\WishlistCreateRequest;
use Prettus\Validator\Exceptions\ValidatorException;


class WishlistController extends CoreController
{
    public $repository;

    public function __construct(WishlistRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection|AbusiveReport[]
     */
    public function index(Request $request)
    {
        $limit = $request->limit ? $request->limit : 15;
        $user = $request->user();

        if (isset($user)) {
            return $this->repository->with(['product'])->where('user_id', $user->id)->paginate($limit);
        }
        throw new PickbazarException('NOT_AUTHORIZED');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param AbusiveReportCreateRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function store(WishlistCreateRequest $request)
    {
        return $this->repository->storeWishlist($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param AbusiveReportCreateRequest $request
     * @return mixed
     * @throws ValidatorException
     */
    public function toggle(WishlistCreateRequest $request)
    {
        return $this->repository->toggleWishlist($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(Request $request, $slug)
    {
        $request->slug = $slug;
        return $this->delete($request);
    }

    public function delete(Request $request)
    {
        if (!$request->user()) {
            throw new PickbazarException('NOT_AUTHORIZED');
        }
        $product = Product::where('slug', $request->slug)->first();
        //attempt to read propert id on null
        if (!$product) {
            throw new PickbazarException('PRODUCT_NOT_FOUND');
        }
        $this->repository->deleteWishlist($request, $product);
        return response()->json(['success' => true]);
    
        $wishlist = $this->repository->where('product_id', $product->id)->where('user_id', auth()->user()->id)->first();
        if (!empty($wishlist)) {
            return $wishlist->delete();
        }
        throw new PickbazarException('NOT_FOUND');
    }

    /**
     * Check in wishlist product for authenticated user
     *
     * @param int $product_id
     * @return JsonResponse
     */
    public function in_wishlist(Request $request, $product_id)
    {
        $request->product_id = $product_id;
        return $this->inWishlist($request);
    }

    public function inWishlist(Request $request)
    {
        if (auth()->user() && !empty($this->repository->where('product_id', $request->product_id)->where('user_id', auth()->user()->id)->first())) {
            return true;
        }
        return false;
    }
}
