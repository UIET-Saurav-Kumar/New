<?php


namespace PickBazar\Database\Repositories;

use PickBazar\Database\Models\Profile;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;

class ProfileRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'contact'        => 'like',
        'customer.email' => 'like',
        'customer.name'  => 'like',
        'gender' => 'like',
        'occupation'=> 'like',
        'date_of_birth' => 'like',
        'home_location'=> 'like',
        'occupation'=> 'like',
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
        return Profile::class;
    }
    
}
