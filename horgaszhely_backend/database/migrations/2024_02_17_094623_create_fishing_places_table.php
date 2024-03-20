<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fishing_places', function (Blueprint $table) {
            $table->id();
            $table->boolean("reservable")->default(0);
            $table->boolean("pier")->default(0);
            $table->boolean("firepit")->default(0);
            $table->boolean("shelter")->default(0);
            // $table->integer("averageRating");
            $table->string("description");
            $table->string("longitude");
            $table->string("latitude");
            //$table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fishing_places');
    }
};

