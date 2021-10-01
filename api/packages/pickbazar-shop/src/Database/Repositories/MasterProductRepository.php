<?php


namespace PickBazar\Database\Repositories;

use Exception;
use PickBazar\Enums\ProductType;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Shop;
use PickBazar\Database\Models\Product;
use PickBazar\Database\Models\Category;
use PickBazar\Database\Models\MasterProduct;
use PickBazar\Exceptions\PickbazarException;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Validator\Exceptions\ValidatorException;
use Prettus\Repository\Exceptions\RepositoryException;

class MasterProductRepository extends BaseRepository
{

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name'        => 'like',
        'status',
        'type.slug',
        'categories.slug',
    ];

    protected $dataArray = [
        'name',
        'price',
        'sale_price',
        'max_price',
        'min_price',
        'type_id',
        'product_type',
        'quantity',
        'unit',
        'description',
        'sku',
        'image',
        'gallery',
        'status',
        'height',
        'length',
        'width',
        'in_stock',
        'is_taxable',
    ];

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return MasterProduct::class;
    }

    public function storeProduct($request)
    {
        try {
            $data = $request->only($this->dataArray);
            $product = $this->create($data);
            if (isset($request['categories'])) {
                $product->categories()->attach($request['categories']);
            }
            if (isset($request['tags'])) {
                $product->tags()->attach($request['tags']);
            }
            if (isset($request['variations'])) {
                $product->variations()->attach($request['variations']);
            }
            if (isset($request['variation_options'])) {
                $product->variation_options()->createMany($request['variation_options']['upsert']);
            }
            $product->categories = $product->categories;
            $product->variation_options = $product->variation_options;
            $product->variations = $product->variations;
            $product->type = $product->type;
            $product->tags = $product->tags;
            return $product;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function updateProduct($request, $id)
    {
        try {
            $product = $this->findOrFail($id);
            if(isset($request->is_featured)){
                $product->is_featured=$request->is_featured;
            }
            if (isset($request['categories'])) {
                $product->categories()->sync($request['categories']);
            }
            if (isset($request['tags'])) {
                $product->tags()->sync($request['tags']);
            }
            if (isset($request['variations'])) {
                $product->variations()->sync($request['variations']);
            }
            if (isset($request['variation_options'])) {
                if (isset($request['variation_options']['upsert'])) {
                    foreach ($request['variation_options']['upsert'] as $key => $variation) {
                        if (isset($variation['id'])) {
                            $product->variation_options()->where('id', $variation['id'])->update($variation);
                        } else {
                            $product->variation_options()->create($variation);
                        }
                    }
                }
                if (isset($request['variation_options']['delete'])) {
                    foreach ($request['variation_options']['delete'] as $key => $id) {
                        try {
                            $product->variation_options()->where('id', $id)->delete();
                        } catch (Exception $e) {
                        }
                    }
                }
            }
            $product->update($request->only($this->dataArray));
            if ($product->product_type === ProductType::SIMPLE) {
                $product->variations()->delete();
                $product->variation_options()->delete();
            }
            $product->categories = $product->categories;
            $product->variation_options = $product->variation_options;
            $product->variations = $product->variations;
            $product->type = $product->type;
            $product->tags = $product->tags;
            return $product;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function fetchRelated($slug, $limit = 10)
    {
        try {
            $product = $this->findOneByFieldOrFail('id', $slug);
            $categories = $product->categories->pluck('id');
            $products = $this->whereHas('categories', function ($query) use ($categories) {
                $query->whereIn('categories.id', $categories);
            })->with('type')->limit($limit);
            return $products;
        } catch (Exception $e) {
            return [];
        }
    }


    
}
