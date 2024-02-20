<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as faker;
use Illuminate\Support\Facades\Hash;

use DB;


class usersTableData extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();
        foreach(range(1,15) as $index){
                DB::table('users')->insert([
                'name'=>$faker->name(),
                'email'=>$faker->email(),
                'password'=> Hash::make($faker->password()),
                'profilepicture'=>$faker->imageUrl(120,120,'fish', true ),
                'validated'=>$faker->numberBetween(0,1),
                'birthdate'=>$faker->dateTime(),
                'userlevel'=>5
            ]);
        }    
    }
}
