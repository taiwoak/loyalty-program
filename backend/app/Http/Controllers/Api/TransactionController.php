<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->query('limit', 20);
        $transactions = Transaction::where('user_id', $request->user()->id)
            ->orderByDesc('id')
            ->paginate($limit);

        return response()->json([
            'data' => $transactions->items(),
            'total' => $transactions->total(),
            'page' => $transactions->currentPage(),
            'limit' => (int) $limit,
            'totalPages' => $transactions->lastPage(),
        ]);
    }
}
