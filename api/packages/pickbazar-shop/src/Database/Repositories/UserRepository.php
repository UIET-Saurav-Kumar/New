<?php

namespace PickBazar\Database\Repositories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use PickBazar\Database\Models\User;
use Prettus\Validator\Exceptions\ValidatorException;
use Spatie\Permission\Models\Permission;
use PickBazar\Enums\Permission as UserPermission;
use Prettus\Repository\Criteria\RequestCriteria;
use Prettus\Repository\Exceptions\RepositoryException;
use PickBazar\Mail\ForgetPassword;
use Illuminate\Support\Facades\Mail;
use PickBazar\Database\Models\Address;
use PickBazar\Database\Models\Profile;
use PickBazar\Database\Models\Shop;
use PickBazar\Exceptions\PickbazarException;


class UserRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name' => 'like',
        'email' => 'like',
        'phone_number'=> 'like',
        'occupation' => 'like',
        'created_at' => 'like',
    ];

    /**
     * @var array
     */
    protected $dataArray = [
        'name',
        'email',
        'shop_id',
        "phone_number",
        'current_location',
        'gender',
        'date_of_birth',
        'occupation',
        'role',
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return User::class;
    }

    public function boot()
    {
        try {
            $this->pushCriteria(app(RequestCriteria::class));
        } catch (RepositoryException $e) {
        }
    }

    public function storeUser($request)
    {
        
        try {
            $user = $this->create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
                'phone_number' => $request->phone_number,
                //user current_location
                'current_location' => $request->current_location ? json_encode($request->current_location) : null,


                'gender'=> $request->gender,
                'date_of_birth'=> $request->date_of_birth,
                'occupation'=> $request->occupation,
                'role'=> $request->permissions[0]->name,
            ]);

            $user->givePermissionTo(UserPermission::CUSTOMER);
            if (isset($request['address']) && count($request['address'])) {
                $user->address()->createMany($request['address']);
            }
            if (isset($request['profile'])) {
                $user->profile()->create($request['profile']);
            }
            $user->profile = $user->profile;
            $user->address = $user->address;
            $user->shop = $user->shop;
            $user->current_location = json_decode($user->current_location, true);
            $user->managed_shop = $user->managed_shop;
            return $user;
        } catch (ValidatorException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }

    public function updateUser($request, $user)
    {
        // return $request;
        try {
            if (isset($request['address']) && count($request['address'])) {
                foreach ($request['address'] as $address) {
                    if (isset($address['id'])) {
                        Address::findOrFail($address['id'])->update($address);
                    } else {
                        $address['customer_id'] = $user->id;
                        Address::create($address);
                    }
                }
            }
            if (isset($request['profile'])) {
                if (isset($request['profile']['id'])) {
                    Profile::findOrFail($request['profile']['id'])->update($request['profile']);
                } else {
                    $profile = $request['profile'];
                    $profile['customer_id'] = $user->id;
                    Profile::create($profile);
                }
            }
            $updateData = array_diff_key($request->only($this->dataArray), array_flip(['profile', 'address', 'shop']));
            $updateData['current_location'] = $request->current_location ? json_encode($request->current_location) : null;

    
            $user->update($updateData);
            $user->profile = $user->profile;
            $user->address = $user->address;
            $user->shop = $user->shop;
            $user->managed_shop = $user->managed_shop;
            return $user;
        } catch (ValidationException $e) {
            throw new PickbazarException('PICKBAZAR_ERROR.SOMETHING_WENT_WRONG');
        }
    }
    

    public function sendResetEmail($email, $token)
    {
        try {
            Mail::to($email)->send(new ForgetPassword($token));
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
