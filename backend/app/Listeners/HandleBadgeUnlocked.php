<?php

namespace App\Listeners;

use App\Events\BadgeUnlockedEvent;

class HandleBadgeUnlocked
{
    public function handle(BadgeUnlockedEvent $event): void
    {
        $user = $event->user;

        // Add ₦300 cashback and record transaction
        $user->balance += 300;
        $user->save();

        \App\Models\Transaction::create([
            'user_id' => $user->id,
            'amount' => 300,
            'type' => 'cashback',
        ]);

        // Simulate payment provider
        \Log::info("₦300 cashback awarded to user {$user->id} for badge {$event->badge->name}");
    }
}