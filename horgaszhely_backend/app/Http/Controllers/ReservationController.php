<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Reservation;

use DB;

class ReservationController extends Controller
{
    //---{ all reservation  }------------------------------------

    public function getReservations(){
        $reservations = Reservation::all();

        return $reservations;
    }

    //---{ one reservation  }------------------------------------

    public function getReservation(Request $request){
        $id = $request["id"];
        $reservation = Reservation::where("id",$id)->first();

        return $reservation;

    }

    //---{  add reservation  }-----------------------------------

    public function addReservation(Request $request){
        $input = $request->all();

        $reservation = new Reservation;
        $reservation-> user_id=$input["user_id"];
        $reservation-> fishingplace_id=$input["fishingplace_id"];
        $reservation-> reservationStart=$input["reservationStart"];
        $reservation-> reservationEnd=$input["reservationEnd"];
        $reservation-> actualRate=$input["actualRate"];

        $reservation->save();
        return "foglalas hozzaadva";
    }

    //---{ modify reservation  }---------------------------------

    public function modifyReservation(Request $request){
        $input = $request->all();
        $id = $input["id"];

        $reservation = Reservation::find($id);

        $reservation-> user_id=$input["user_id"];
        $reservation-> fishingplace_id=$input["fishingplace_id"];
        $reservation-> reservationStart=$input["reservationStart"];
        $reservation-> reservationEnd=$input["reservationEnd"];
        $reservation-> actualRate=$input["actualRate"];

        $reservation->save();
        return "foglalas modositva";
    }

    //---{  delete reservation  }---------------------------------

    public function deleteReservation(Request $request){
        $input=$request->all();
        $id = $input["id"];

        $reservation = Reservation::find($id);
        $reservation->delete();
        return "foglalas törölve";
    }
}
