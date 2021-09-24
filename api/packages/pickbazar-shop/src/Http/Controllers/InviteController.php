<?php

namespace PickBazar\Http\Controllers;

use App\Models\ReferralEarning;
use App\Models\User;
use Illuminate\Http\Request;
use PickBazar\Database\Models\Invite;

class InviteController extends CoreController
{
    
    public function refferral_network(Request $request)
    {
        $root = $request->user();
        // $root=User::find(3);
        
        $data=$this->getNode($root,true);

        $first_layer_invitees=$this->get_invitees($root->id);

        foreach($first_layer_invitees as $invitee){
            $second_layer_invitees=$this->get_invitees($invitee->invitee_id);

            $first_layer=[];
            $second_layer=[];

            $first_layer=$this->getNode($invitee);

            foreach($second_layer_invitees as $key=> $second_invitees){
                $third_layer=[];

                $third_layer_invitees=$this->get_invitees($second_invitees->invitee_id);
                array_push($second_layer,$this->getNode($second_invitees));

                foreach($third_layer_invitees as $third_invitee){
                    array_push($third_layer,$this->getNode($third_invitee));
                }

                $second_layer[$key]["children"]=$third_layer;
            }

            if(isset($first_layer["children"])){
                $first_layer["children"]=$second_layer;
                array_push($data["children"],$first_layer);
            }
        }

        return [
            "data"=>$data
        ];
    }

    private function get_invitees($id){
        return Invite::where('user_id',$id)->get();
    }
    private function getNode($invitee , $is_root=false){
        return [
            "id"=>$invitee->id,
            "name"=>($is_root)?$invitee->name:$invitee->invitee_name,
            "children"=>[]
        ];
    }

    public function getWalletCommission(Request $request)
    {
        $user = $request->user();

        $balance=$user->balance;
        $customer_level=ReferralEarning::where('user_id',$user->id)->where('level',"0")->get();
        $level1=ReferralEarning::where('user_id',$user->id)->where('level',"1")->get();
        $level2=ReferralEarning::where('user_id',$user->id)->where('level',"2")->get();
        $level3=ReferralEarning::where('user_id',$user->id)->where('level',"3")->get();

        return [
            "balance"=>$balance,
            "customer_level"=>$customer_level,
            "level1"=>$level1,
            "level2"=>$level2,
            "level3"=>$level3,
        ];
    }
}