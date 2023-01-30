<?php

namespace PickBazar\Database\Models;

use Illuminate\Database\Eloquent\Model;

class UpiPayment extends Model
{
    protected $table = 'upi_payments';

    protected $fillable = [
        'user_id', 'transaction_id', 'sender_upi_id', 'reciever_upi_id ', 'amount', 'status'
    ];

    public function user()
    {
        
        return $this->belongsTo(User::class);
    }
}
