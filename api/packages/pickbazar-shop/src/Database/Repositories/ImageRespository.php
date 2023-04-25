<?php

namespace PickBazar\Repositories;

use PickBazar\Database\Models\Image;

class ImageRepository extends BaseRespository
{
    public function all()
    {
        return Image::all();
    }

    public function findOrFail($id)
    {
        return Image::findOrFail($id);
    }

    public function create($data)
    {
        return Image::create($data);
    }

    public function update($id, $data)
    {
        $image = $this->findOrFail($id);
        $image->update($data);

        return $image;
    }

    public function delete($id)
    {
        $image = $this->findOrFail($id);
        $image->delete();
    }
}
