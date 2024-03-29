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
        DB::select("INSERT INTO fishing_places (reservable, pier, firepit, shelter, description, longitude, latitude) VALUES
        (TRUE, TRUE, TRUE, TRUE, 'Beautiful lake with clear water and abundant fish.', 19.572352, 47.536311),
        (TRUE, FALSE, TRUE, TRUE, 'Scenic riverbank with a peaceful atmosphere.', 19.572169, 47.534790),
        (FALSE, TRUE, FALSE, FALSE, 'Cozy pond surrounded by lush greenery.', 19.570300, 47.535814),
        (TRUE, TRUE, TRUE, TRUE, 'Quiet lake with well-maintained fishing facilities.', 19.567223, 47.537463),
        (TRUE, FALSE, TRUE, FALSE, 'Serene river spot with a rustic firepit.', 19.566816, 47.538346),
        (FALSE, FALSE, TRUE, TRUE, 'Tranquil pond with a covered shelter for relaxation.', 19.574025, 47.535666);");
    }
}
