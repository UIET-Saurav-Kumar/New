<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Pickbazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use PickBazar\Database\Repositories\ImageRepository;


class ImagesController extends CoreController

{
    protected $imageRepository;

    public function __construct(ImageRepository $imageRepository)
    {
        $this->imageRepository = $imageRepository;
    }

    public function index()
    {
        try {
            $images = $this->imageRepository->all();
            return response()->json($images);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching images: ' . $e->getMessage()], 500);
        }
    }
    
    
    public function store(Request $request)
    {  
        try {
            $validatedData = $request->validate([
                'image_data' => 'required',
                'user_id' => 'required'
            ]);
    
            $image = $this->imageRepository->create($validatedData);
            return response()->json($image, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error storing image: ' . $e->getMessage()], 500);
        }
    }
    
    public function show($id)
    {
        try {
            $image = $this->imageRepository->findOrFail($id);
            return response()->json($image);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching image: ' . $e->getMessage()], 500);
        }
    }
    
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'image_data' => 'required',
                'user_id' => 'required'
            ]);
    
            $image = $this->imageRepository->update($id, $validatedData);
            return response()->json($image, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error updating image: ' . $e->getMessage()], 500);
        }
    }
    
    public function destroy($id)
    {
        try {
            $this->imageRepository->delete($id);
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting image: ' . $e->getMessage()], 500);
        }
    }
}
