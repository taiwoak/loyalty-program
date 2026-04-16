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
        $initialBadgeCount = $user->badges()->count();

        if ($user->balance < $request->amount) {
            return response()->json([
                'message' => 'Insufficient balance'
            ], 400);
        }

        // Create purchase and record transaction
        Purchase::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
        ]);

        \App\Models\Transaction::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'type' => 'purchase',
        ]);

        // Deduct balance
        $user->balance -= $request->amount;
        $user->save();

        // Fire event
        event(new UserPurchaseEvent($user));

        // Refresh user to get updated balance and badge info from listeners
        $user->refresh();

        $response = [
            'message' => 'Purchase successful',
            'balance' => $user->balance,
        ];

        // Check if a new badge was unlocked during the event
        if ($user->badges()->count() > $initialBadgeCount) {
            $latestBadge = $user->badges()->orderByDesc('required_achievements')->first();
            $response['cashback'] = "Congratulations! You unlocked the {$latestBadge->name} badge and earned ₦300 cashback.";
        } else {
            $response['cashback'] = null;
        }

        return response()->json($response);
    }
}