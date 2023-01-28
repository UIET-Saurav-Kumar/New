<?php

namespace PickBazar\Http\Controllers;

use PickBazar\Database\Models\UPIPayment;
use PickBazar\Database\Repositories\UPIPaymentRepository;
use Illuminate\Http\Request;

class UPIPaymentsController extends Controller
{
    protected $upiPaymentRepo;

    public function __construct(UPIPaymentRepository $upiPaymentRepo)
    {
        $this->upiPaymentRepo = $upiPaymentRepo;
    }

    public function createPayment(Request $request)
    {
        $validatedData = $request->validate([
            'upi_id' => 'required',
            'amount' => 'required|numeric',
            'transaction_id' => 'required'
        ]);

        $upiPayment = new UPIPayment();
        $upiPayment->upi_id = $request->upi_id;
        $upiPayment->amount = $request->amount;
        $upiPayment->transaction_id = $request->transaction_id;
        $upiPayment->status = 'pending';

        $this->upiPaymentRepo->save($upiPayment);

        return response()->json([
            'message' => 'UPI Payment created successfully',
            'payment_id' => $upiPayment->id
        ], 201);
    }

    public function getPaymentStatus($paymentId)
    {
        $upiPayment = $this->upiPaymentRepo->find($paymentId);
        if (!$upiPayment) {
            return response()->json([
                'error' => 'UPI Payment not found'
            ], 404);
        }

        return response()->json([
            'status' => $upiPayment->status
        ], 200);
    }
}
