<?php

namespace App\Listeners;

use App\Events\UserPurchaseEvent;
use App\Events\AchievementUnlockedEvent;
use App\Events\BadgeUnlockedEvent;
use App\Models\Achievement;
use App\Models\Badge;

class HandleUserPurchase
{
    public function handle(UserPurchaseEvent $event): void
    {
        $user = $event->user;

        // Total purchases
        $purchaseCount = $user->purchases()->count();

        // Unlock Achievements
        $achievements = Achievement::where('threshold', '<=', $purchaseCount)->get();

        foreach ($achievements as $achievement) {
            if (!$user->hasAchievement($achievement->id)) {
                $user->achievements()->attach($achievement->id);

                event(new AchievementUnlockedEvent($user, $achievement));
            }
        }

        // Unlock Badge
        $achievementCount = $user->achievements()->count();

        $badge = Badge::where('required_achievements', '<=', $achievementCount)
                      ->orderByDesc('required_achievements')
                      ->first();

        if ($badge && !$user->hasBadge($badge->id)) {
            $user->badges()->attach($badge->id);

            event(new BadgeUnlockedEvent($user, $badge));
        }
    }
}