<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Badge;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
            ['name' => 'Beginner', 'required_achievements' => 1],
            ['name' => 'Intermediate', 'required_achievements' => 3],
            ['name' => 'Advanced', 'required_achievements' => 5],
        ];

        foreach ($badges as $badge) {
            Badge::create($badge);
        }
    }
}