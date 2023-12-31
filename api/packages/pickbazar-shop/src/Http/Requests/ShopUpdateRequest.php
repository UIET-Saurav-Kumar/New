<?php

namespace PickBazar\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ShopUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'                   => ['string', 'max:255'],
            'categories'             => ['array'],
            'is_active'              => ['boolean'],
            'description'            => ['nullable', 'string'],
            'balance'                => ['array'],
            'image'                  => ['array'],
            'cover_image'            => ['array'],
            'settings'               => ['array'],
            'address'                => ['array'],
            "is_featured"            => ['nullable']
        ];
    }

    public function failedValidation(Validator $validator)
    {
        // TODO: Need to check from the request if it's coming from GraphQL API or not.
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
