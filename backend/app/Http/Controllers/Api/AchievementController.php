<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Achievement;
use App\Models\Badge;

class AchievementController extends Controller
{
    public function index(User $user)
    {
        if (auth()->id() !== $user->id) {
            return response()->json([
                'message' => 'Forbidden access to this resource',
            ], 403);
        }

        $unlockedAchievements = $user->achievements->pluck('name');

        $nextAchievements = Achievement::whereNotIn('id', $user->achievements->pluck('id'))
            ->pluck('name');

        $currentBadge = $user->badges()->orderByDesc('required_achievements')->first();

        $nextBadge = Badge::where('required_achievements', '>', $user->achievements()->count())
            ->orderBy('required_achievements')
            ->first();

        return response()->json([
            'unlocked_achievements' => $unlockedAchievements,
            'next_available_achievements' => $nextAchievements,
            'current_badge' => $currentBadge?->name,
            'next_badge' => $nextBadge?->name,
            'remaining_to_unlock_next_badge' =>
                $nextBadge
                    ? $nextBadge->required_achievements - $user->achievements()->count()
                    : 0,
        ]);
    }
}