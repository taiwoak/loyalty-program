<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable
{
    use HasFactory, Notifiable;

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

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    public function achievements()
    {
        return $this->belongsToMany(Achievement::class)
                    ->withTimestamps();
    }

    public function badges()
    {
        return $this->belongsToMany(Badge::class)
                    ->withTimestamps();
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