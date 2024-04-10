<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class reservationTableData extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("reservations")->insert([
            "user_id" => "2",
            "fishingplace_id" => "3",
            "reservationStart" => "2024-05-28",
            "reservationEnd" => "2024-05-30",
            "guestNumber" => "3"
        ]);
        DB::table("reservations")->insert([
            "user_id" => "2",
            "fishingplace_id" => "4",
            "reservationStart" => "2024-05-28",
            "reservationEnd" => "2024-05-30",
            "guestNumber" => "4"
        ]);
    }
}
