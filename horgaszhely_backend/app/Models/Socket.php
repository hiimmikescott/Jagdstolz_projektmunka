<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socket extends Model
{
    use HasFactory;

    protected $fillable =[
        "user_id",
        "fishingplace_id",
        "reservationStart",
        "reservationEnd",
        "actualRate"
    ];
    public function fishingplace(){
        return $this->belongsTo(FishingPlace::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
