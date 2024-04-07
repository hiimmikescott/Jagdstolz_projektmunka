<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class adminUserTableData extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("users")->insert([ 
            "name" =>"Vitovszki Tomi", 
            "email" =>"tomin@gmail.com",
            "email_verified_at"=>"2001-09-23" , 
            "password" =>bcrypt("Aa123."), 
            "verifycode" =>"67891", 
            "birthdate"=>"2001.07.23", 
            "userlevel"=>"1"
        ]); 
        DB::table("users")->insert([ 
            "name" =>"Plesovszki István", 
            "email" =>"istvan@gmail.com",
            "email_verified_at"=>"2001-09-23" ,  
            "password" =>bcrypt("Aa123."), 
            "verifycode" =>"12345", 
            "birthdate"=>"2001.07.23", 
            "userlevel"=>"0"
        ]); 
    }
}
