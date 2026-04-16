<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\Events\UserPurchaseEvent;
use App\Events\BadgeUnlockedEvent;
use App\Listeners\HandleUserPurchase;
use App\Listeners\HandleBadgeUnlocked;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        UserPurchaseEvent::class => [
            HandleUserPurchase::class,
        ],

        BadgeUnlockedEvent::class => [
            HandleBadgeUnlocked::class,
        ],
    ];

    public function boot(): void
    {
        //
    }
}