<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Achievement;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $achievements = [
            ['name' => 'First Purchase', 'threshold' => 1],
            ['name' => '3 Purchases', 'threshold' => 3],
            ['name' => '5 Purchases', 'threshold' => 5],
            ['name' => '10 Purchases', 'threshold' => 10],
            ['name' => '20 Purchases', 'threshold' => 20],
        ];

        foreach ($achievements as $achievement) {
            Achievement::create($achievement);
        }
    }
}