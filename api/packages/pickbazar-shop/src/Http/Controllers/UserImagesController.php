<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Pickbazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use PickBazar\Database\Repositories\ImageRepository;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\Image;


class UserImagesController extends CoreController

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
                'image_data' => 'required|array',
                'image_data.*.id' => 'required|integer',
                'image_data.*.original' => 'required|url',
                'image_data.*.thumbnail' => 'required|url',
                'user_id' => 'required'
            ]);
    
            // Try to find an existing record for the user
            $imageRecord = Image::where('user_id', $request->user_id)->first();
    
            if ($imageRecord) {
                // Update the existing record with new image data
                $currentImageData = json_decode($imageRecord->image_data);
                $newImageData = array_merge($currentImageData, $request->input('image_data'));
                $imageRecord->image_data = json_encode($newImageData);
                $imageRecord->save();
            } else {
                // If no record found, create a new one
                $imageRecord = Image::create([
                    'image_data' => json_encode($request->input('image_data')),
                    'user_id' => $request->user_id,
                ]);
            }
    
            return response()->json($imageRecord, 201);
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

    public function getImagesByUserId($user_id)
    {
        try {
            $images = Image::where('user_id', $user_id)->get();
    
            $images->transform(function ($image) {
                $image->image_data = json_decode($image->image_data);
                return $image;
            });
    
            return response()->json($images, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching images: ' . $e->getMessage()], 500);
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
            $image = $this->imageRepository->find($id);
            if ($image) {
                $this->imageRepository->delete($id);
                return response()->json(null, 204);
            } else {
                return response()->json(['error' => 'Image not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error deleting image: ' . $e->getMessage()], 500);
        }
    }

}
