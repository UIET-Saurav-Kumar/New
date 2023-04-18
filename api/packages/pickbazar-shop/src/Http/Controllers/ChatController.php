<?php

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PickBazar\Database\Models\Message;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\Chat;
use PickBazar\Database\Models\Like;



class ChatController extends CoreController

 {
    

    public function likeUser(Request $request, $liker_id, $liked_id)
    {
        // Check if a chat already exists between the users
        $chat = Chat::where(function ($query) use ($liker_id, $liked_id) {
            $query->where('user1_id', $liker_id)
                ->where('user2_id', $liked_id);
        })->orWhere(function ($query) use ($liker_id, $liked_id) {
            $query->where('user1_id', $liked_id)
                ->where('user2_id', $liker_id);
        })->first();
    
        // If there's no chat between them, create one
        if (!$chat) {
            $chat = new Chat();
            $chat->user1_id = $liker_id;
            $chat->user2_id = $liked_id;
            $chat->save();
        }
    
        // Save the like with the chat_id
        $like = new Like();
        $like->liked_by = $liker_id; // User who liked the card
        $like->user_id = $liked_id; // The user whose card is liked
        $like->chat_id = $chat->id;
        $like->save();
    
        // Return a response or perform other actions as needed
    }
    


}


