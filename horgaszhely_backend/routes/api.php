<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FishingPlaceController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

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

//---{  user reservation routes}

Route::get("/getuserreservations",[ReservationController::class , "getUserReservations"]);
Route::put("/modifyuserreservation",[ReservationController::class , "modifyUserReservation"]);
Route::delete("/deleteuserreservation",[ReservationController::class , "deleteUserReservation"]);


//---{  user routes }--------------------------------------------------------------------------------

Route::get("/getusers",[UserController::class , "getUsers"]);
Route::get("/getuser",[UserController::class , "getUser"]);
Route::put("/modifyuser",[UserController::class , "modifyUser"]);
Route::delete("/deleteuser",[UserController::class , "deleteUser"]);

//---{  userAuth routes  }---------------------------------------------------------------------------

Route::post("/userregister",[AuthController::class , "userRegister"]);
Route::post("/userlogin",[AuthController::class , "userLogin"]);
Route::post("/userlogout",[AuthController::class , "userLogout"]);
