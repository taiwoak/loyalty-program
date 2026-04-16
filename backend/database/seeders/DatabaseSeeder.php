<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\AchievementSeeder;
use Database\Seeders\BadgeSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AchievementSeeder::class,
            BadgeSeeder::class,
        ]);
    }
}