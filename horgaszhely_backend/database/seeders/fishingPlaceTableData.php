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
        DB::select("INSERT INTO fishing_places (reservable, pier, firepit, shelter, averageRating, description, longitude, latitude) VALUES
        (TRUE, TRUE, TRUE, TRUE, 4, 'Beautiful lake with clear water and abundant fish.', 3456789, 1234567),
        (TRUE, FALSE, TRUE, TRUE, 5, 'Scenic riverbank with a peaceful atmosphere.', 4567891, 2345678),
        (FALSE, TRUE, FALSE, FALSE, 3, 'Cozy pond surrounded by lush greenery.', 5678901, 3456789),
        (TRUE, TRUE, TRUE, TRUE, 4, 'Quiet lake with well-maintained fishing facilities.', 6789012, 4567890),
        (TRUE, FALSE, TRUE, FALSE, 5, 'Serene river spot with a rustic firepit.', 7890123, 5678901),
        (FALSE, FALSE, TRUE, TRUE, 4, 'Tranquil pond with a covered shelter for relaxation.', 8901234, 6789012),
        (TRUE, TRUE, FALSE, TRUE, 5, 'Picturesque lake surrounded by tall trees.', 9012345, 7890123),
        (TRUE, FALSE, TRUE, TRUE, 3, 'Riverbank with a well-maintained pier for fishing.', 1234567, 8901234),
        (FALSE, TRUE, TRUE, FALSE, 4, 'Small lake with a cozy firepit for evening gatherings.', 2345678, 9012345),
        (TRUE, TRUE, TRUE, FALSE, 5, 'Secluded river spot with a high average rating.', 3456789, 1234567);");
    }
}
