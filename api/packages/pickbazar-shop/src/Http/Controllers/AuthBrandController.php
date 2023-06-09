<?php
namespace PickBazar\Http\Controllers;

use PickBazar\Database\Models\AuthBrand;
use Illuminate\Http\Request;

class AuthBrandController extends CoreController
{
    public function store(Request $request)
{
    try {
        $brand = AuthBrand::create($request->all());
        return response()->json($brand, 201);
    } catch (\Exception $e) {
        // Log the error message
        Log::error($e->getMessage());

        // Return a response with a 500 (Internal Server Error) status code.
        return response()->json([
            'message' => 'Error occurred while creating the brand. Please try again later.',
            'error' => $e->getMessage()
        ], 500);
    }
}


    public function index()
    {
        $brands = AuthBrand::all();
        return response()->json($brands, 200);
    }


    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            // 'brand_id' => 'required|exists:brands,id',
        ]);

        $userBrand = UserBrand::findOrFail($id);
        $userBrand->update($validatedData);

        return response()->json(['message' => 'Brand authorization updated successfully.']);
    }
}
