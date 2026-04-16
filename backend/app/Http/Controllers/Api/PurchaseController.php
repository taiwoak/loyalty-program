<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Events\UserPurchaseEvent;

class PurchaseController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        if ($user->balance < $request->amount) {
            return response()->json([
                'message' => 'Insufficient balance'
            ], 400);
        }

        // Create purchase
        Purchase::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
        ]);

        // Deduct balance
        $user->balance -= $request->amount;
        $user->save();

        // Fire event
        event(new UserPurchaseEvent($user));

        return response()->json([
            'message' => 'Purchase successful',
            'balance' => $user->balance,
        ]);
    }
}