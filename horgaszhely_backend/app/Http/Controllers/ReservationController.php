<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Reservation;
Use App\Http\Controllers\ResponseController;

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

    //---{  add reservation  }-----------------------------------

    public function addReservation(Request $request){
        $input = $request->all();

        $reservation = new Reservation;
        $reservation-> user_id=$input["user_id"];
        $reservation-> fishingplace_id=$input["fishingplace_id"];
        $reservation-> reservationStart=$input["reservationStart"];
        $reservation-> reservationEnd=$input["reservationEnd"];
        $reservation-> actualRate=$input["actualRate"];

        //---{  error  }--------------- TODO: validation
        
        if(is_null($reservation)){
            return $this->sendError("hibas adat");
        }
        
        //---{  success  }-------------
        
        $reservation->save();

        return  $this->sendResponse($reservation,"foglalás hozáadva");

    }

    //---{ modify reservation  }---------------------------------

    public function modifyReservation(Request $request){
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
        $reservation-> actualRate=$input["actualRate"];
            
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
}
