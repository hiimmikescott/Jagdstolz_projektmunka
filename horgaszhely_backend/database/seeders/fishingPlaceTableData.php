<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class fishingPlaceTableData extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::select("INSERT INTO fishing_places ( pier, firepit, shelter, description, longitude, latitude) VALUES
        ( TRUE, TRUE, TRUE, 'Gyönyörű tó tiszta vízzel és bőséges halállománnyal.', 19.572352, 47.536311),
        ( FALSE, TRUE, TRUE, 'Festői folyópart nyugodt hangulattal.', 19.572169, 47.534790),
        ( TRUE, FALSE, FALSE, 'Bársonyos növényzettel körülvett hangulatos tavacska.', 19.570300, 47.535814),
        ( TRUE, TRUE, TRUE, 'Csendes tó, karbantartott horgászlétesítményekkel.', 19.567223, 47.537463),
        ( FALSE, TRUE, FALSE, 'Nyugodt folyóparti hely rusztikus tűzhellyel.', 19.566816, 47.538346),
        ( FALSE, TRUE, TRUE, 'Nyugalmas tavacska fedett menedékkel a pihenéshez.', 19.574025, 47.535666);");
    }
}
