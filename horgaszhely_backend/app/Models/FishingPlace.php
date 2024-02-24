<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FishingPlace extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable =[
        "reservable",
        "pier",
        "firepit",
        "shelter",
        "averageRating",
        "description",
        "longitude",
        "latitude",
    ];
    public function Reservation(){
        return $this->hasMany(Reservation::class);
    }
}
