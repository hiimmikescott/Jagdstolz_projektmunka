<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FishingPlaceController;
use App\Http\Controllers\ReservationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//---{  fishingplace routes  }-----------------------------------------------------------------

Route::get("/fishingplaces",[FishingPlaceController::class , "getFishingPlaces" ]);
Route::get("/fishingplace",[FishingPlaceController::class , "getFishingPlace" ]);
Route::post("/addfishingplace",[FishingPlaceController::class , "addFishingPlace" ]);
Route::put("/modifyfishingplace",[FishingPlaceController::class , "modifyFishingPlace" ]);
Route::delete("/deletefishingplace",[FishingPlaceController::class , "deleteFishingPlace" ]);

//---{  reservation routes  }------------------------------------------------------------------

Route::get("/getreservations",[ReservationController::class , "getReservations"]);
Route::get("/getreservation",[ReservationController::class , "getReservation"]);
Route::post("/addreservation",[ReservationController::class , "addReservation"]);
Route::put("/modifyreservation",[ReservationController::class , "modifyReservation"]);
Route::delete("/deletereservation",[ReservationController::class , "deleteReservation"]);