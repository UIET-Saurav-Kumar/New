<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Database\Models\Like;
use PickBazar\Database\Repositories\LikesRepository;
use PickBazar\Events\UserLiked;
use PickBazar\Database\Models\User;

class LikesController extends CoreController
{
    protected $likesRepository;

    public function __construct(LikesRepository $likesRepository)
    {
        $this->likesRepository = $likesRepository;
    }

    public function store(Request $request)
    {
        // return $request;
        // Fetch the user details
     
        $like = $this->likesRepository->store([
            'user_id' => $request->params['user_id'],
            'chat_id'=> $request->params['chat_id'],
            'user_name' => $request->params['user_name'],
            'liked_by' => $request->params['liked_by'],
            'status' => $request->params['status'],
            'liked_by_name'=> $request->params['liked_by_name'],
        ]);
    
        // Trigger the UserLiked event
        event(new UserLiked($like->user_id, $like->liked_by, $like->status));
    
        return response()->json(['success' => true]);
    }

    public function getAllLikes()
    {
        $likes = $this->likesRepository->getAllLikes();
        return response()->json($likes);
    }
    

    public function getLikesByUserId($userId)
    {
        $likes = $this->likesRepository->getLikesByUserId($userId);
        return response()->json($likes);
    }

    public function update(Request $request)
    {
        $id = $request->params['id'];
        $like = Like::findOrFail($id);
        $like->status = 'Accepted';
        $like->save();

        return response()->json(['success' => true]);
    }

}
