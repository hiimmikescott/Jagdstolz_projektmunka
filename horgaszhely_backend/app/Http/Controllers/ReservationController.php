<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Reservation;
Use App\Http\Controllers\ResponseController;
Use App\Http\Requests\ReservationChecker;

use DB;

class ReservationController extends ResponseController
{
    //---{ all reservation  }------------------------------------

    public function getReservations(){
        $reservations = Reservation::all();

        return $this->sendResponse($reservations,"öszes foglalás");
    }

    //---{ one reservation  }------------------------------------

    public function getReservation(Request $request){
        $id = $request["id"];
        $reservation = Reservation::where("id",$id)->first();

        //---{  error  }---------------

        if(is_null($reservation)){
            return $this->sendError("nincs ilyen foglalás");
        }

        //---{  success  }-------------

        return  $this->sendResponse($reservation,"egy  foglalás");

    }

    //---{  user reservation  }-----------------------------------

    public function getUserReservations(Request $request){
        $user_id = $request["user_id"];
        $reservations = Reservation::where("user_id",$user_id)->get();

        //---{  error  }---------------

        if(is_null($reservations)){
            return $this->sendError("nincs ilyen foglalás");
        }

        //---{  success  }-------------

        return  $this->sendResponse($reservations,"egy  foglalás");

    }

    //---{  add reservation  }-----------------------------------

    public function addReservation(ReservationChecker $request){
        $request->validated();
        $input = $request->all();

        $reservation = new Reservation;
        $reservation-> user_id=$input["user_id"];
        $reservation-> fishingplace_id=$input["fishingplace_id"];
        $reservation-> reservationStart=$input["reservationStart"];
        $reservation-> reservationEnd=$input["reservationEnd"];
        //$reservation-> actualRate=$input["actualRate"];
        $reservation-> guestNumber=$input["guestNumber"];

        //---{  success  }-------------

        $reservation->save();

        return  $this->sendResponse($reservation,"foglalás hozáadva");

    }

    //---{ modify reservation  }---------------------------------

    public function modifyReservation(ReservationChecker $request){
        $request->validated();
        $input = $request->all();
        $id = $input["id"];

        $reservation = Reservation::where("id",$id)->first();

        //---{  error 1 }---------------

        if(is_null($reservation)){
            return $this->sendError("nincs ilyen foglalás");
        }

        //---{  success  }-------------

        $reservation-> user_id=$input["user_id"];
        $reservation-> fishingplace_id=$input["fishingplace_id"];
        $reservation-> reservationStart=$input["reservationStart"];
        $reservation-> reservationEnd=$input["reservationEnd"];
        //$reservation-> actualRate=$input["actualRate"];
        $reservation-> guestNumber=$input["guestNumber"];

        $reservation->save();

        return  $this->sendResponse($reservation,"foglalás modositva");

    }

    //---{  user reservation modify}

    public function modifyUserReservation(ReservationChecker $request){
        $request->validated();
        $input = $request->all();
        $id = $input["id"];
        $user_id = $input["user_id"];

        $reservations = Reservation::where("user_id",$user_id)->get();

        $reservation = Reservation::where("id",$id)->first();

        //---{  error 1 }---------------

        if(is_null($reservation)){
            return $this->sendError("nincs ilyen foglalás");
        }

        //---{  success  }-------------

        $reservation-> user_id=$input["user_id"];
        $reservation-> fishingplace_id=$input["fishingplace_id"];
        $reservation-> reservationStart=$input["reservationStart"];
        $reservation-> reservationEnd=$input["reservationEnd"];
        //$reservation-> actualRate=$input["actualRate"];
        $reservation-> guestNumber=$input["guestNumber"];

        $reservation->save();

        return  $this->sendResponse($reservation,"foglalás modositva");

    }

    //---{  delete reservation  }---------------------------------

    public function deleteReservation(Request $request){
        $input=$request->all();
        $id = $input["id"];

        $reservation = Reservation::find($id);

        //---{  error  }---------------

        if(is_null($reservation)){
            return $this->sendError("nincs ilyen foglalás");
        }

        //---{  success  }-------------

        $reservation->delete();

        return  $this->sendResponse($reservation,"foglalás törölve");

    }

    //---{  delete user reservation  }---------------------------------

    public function deleteUserReservation(Request $request){
        $input=$request->all();
        $id = $input["id"];
        $user_id = $input["user_id"];

        $reservation = Reservation::where("user_id",$user_id)->get();

        $reservation = Reservation::find($id);

        //---{  error  }---------------

        if(is_null($reservation)){
            return $this->sendError("nincs ilyen foglalás");
        }

        //---{  success  }-------------

        $reservation->delete();

        return  $this->sendResponse($reservation,"foglalás törölve");

    }

    //---{ test  }----------------------

    public function test(Request $request){
        
        $available =  true ;
        
        $input=$request->all();
        $fishingplace_id = $input ["fishingplace_id"];
        $reservations = Reservation::where("fishingplace_id",$fishingplace_id)->get();


        foreach ($reservations as $reservation ) {
            $test= gettype($reservation -> reservationStart);
            $startDate = date('Y-m-d', strtotime($reservation -> reservationStart));
            $endDate = date('Y-m-d', strtotime($reservation -> reservationEnd));

            // if (($currentDate >= $startDate) && ($currentDate <= $endDate)){
            //     return "Current date is between two dates";
            // }else{
            //     return "Current date is not between two dates";
            // }
        }
        
        return gettype($startDate);
    }
}
