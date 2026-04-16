<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens; 
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'balance',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    public function achievements()
    {
        return $this->belongsToMany(
            Achievement::class,
            'user_achievements',
            'user_id',
            'achievement_id'
        )->withTimestamps();
    }

    public function badges()
    {
        return $this->belongsToMany(
            Badge::class,
            'user_badges',
            'user_id',
            'badge_id'
        )->withTimestamps();
    }

    public function hasAchievement($achievementId)
    {
        return $this->achievements->contains($achievementId);
    }

    public function hasBadge($badgeId)
    {
        return $this->badges->contains($badgeId);
    }
    
}