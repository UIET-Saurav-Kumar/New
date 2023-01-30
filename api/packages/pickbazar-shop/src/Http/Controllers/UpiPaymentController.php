<?php

namespace PickBazar\Http\Controllers;

use PickBazar\Database\Models\UpiPayment;
use Illuminate\Http\JsonResponse;
use PickBazar\Database\Repositories\UpiPaymentRepository;
use Illuminate\Http\Request;


class UpiPaymentController extends CoreController
{
    public $upiPaymentRepo;

    public function __construct(UpiPaymentRepository $upiPaymentRepo)
    {
        $this->upiPaymentRepo = $upiPaymentRepo;
    }

    public function createPayment(Request $request)
    {
        // $validatedData = $request->validate([
        //     'upi_id' => 'required',
        //     'amount' => 'required|numeric',
        //     'transaction_id' => 'required'
        // ]);

        // $upiPayment = new UPIPayment();
        // $upiPayment->upi_id = $request->upi_id;
        // $upiPayment->amount = $request->amount;
        // $upiPayment->transaction_id = $request->transaction_id;
        // $upiPayment->status = 'pending';

        return $this->upiPaymentRepo->storePayment($request);

        // return response()->json([
        //     'message' => 'UPI Payment created successfully',
        //     'payment_id' => $upiPayment->id
        // ], 201);
    }

    // public function getPaymentStatus($paymentId)
    // {
    //     $upiPayment = $this->upiPaymentRepo->find($paymentId);
    //     if (!$upiPayment) {
    //         return response()->json([
    //             'error' => 'UPI Payment not found'
    //         ], 404);
    //     }

    //     return response()->json([
    //         'status' => $upiPayment->status
    //     ], 200);
    // }
}
