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

        //---{ user auth }-----------------
        auth( "sanctum" )->user();
        
        $reservations = Reservation::all();

        return $this->sendResponse($reservations,"Összes foglalás");
    }

    //---{ one reservation  }------------------------------------

    public function getReservation(Request $request){

        //---{ user auth }-----------------
        auth( "sanctum" )->user();
        
        $id = $request["id"];
        $reservation = Reservation::where("id",$id)->first();

        //---{  error  }---------------

        if(is_null($reservation)){
            return $this->sendError("A keresett foglalás nem található");
        }

        //---{  success  }-------------

        return  $this->sendResponse($reservation,"Egy foglalás");

    }

//---{  user reservation  }--------------------------------------------------

    public function getUserReservations(Request $request){

        //---{ user auth }-----------------
        auth( "sanctum" )->user();

        $user_id = $request["user_id"];
        $reservations = Reservation::where("user_id",$user_id)->get();

        //---{  error  }---------------

        if(is_null($reservations)){
            return $this->sendError("A felhasználónak nincs foglalása");
        }

        //---{  success  }-------------

        return  $this->sendResponse($reservations,"A felhasználó foglalásai");

    }

    //---{  add reservation  }-----------------------------------

    public function addReservation(ReservationChecker $request){

        //---{ user auth }-----------------
        auth( "sanctum" )->user();

        $request->validated();
        $input = $request->all();

        if ($this->testDate($input)) {
            $reservation = new Reservation;
            $reservation-> user_id=$input["user_id"];
            $reservation-> fishingplace_id=$input["fishingplace_id"];
            $reservation-> reservationStart=$input["reservationStart"];
            $reservation-> reservationEnd=$input["reservationEnd"];
            $reservation-> guestNumber=$input["guestNumber"];
    
            //---{  success  }-------------
    
            $reservation->save();
    
            return  $this->sendResponse($reservation,"Foglalás hozzáadva");
        }else{
            return  $this->sendError("Erre az időpontra már foglalt a hely");
        }
    }

//---{ modify reservation  }--------------------------------------------

    public function modifyReservation(ReservationChecker $request){

        //---{ user auth }-----------------
        auth( "sanctum" )->user();

        $request->validated();
        $input = $request->all();
        $id = $input["id"];

        $reservation = Reservation::where("id",$id)->first();

        //---{  error 1 }---------------

        if(is_null($reservation)){
            return $this->sendError("A keresett foglalás nem található");
        }

        //---{  success  }-------------
        if ($this->testDate($input)) {
            $reservation-> user_id=$input["user_id"];
            $reservation-> fishingplace_id=$input["fishingplace_id"];
            $reservation-> reservationStart=$input["reservationStart"];
            $reservation-> reservationEnd=$input["reservationEnd"];
            $reservation-> guestNumber=$input["guestNumber"];
            
            $reservation->save();
            
            return  $this->sendResponse($reservation,"Foglalás módosítva");
        }else{
            return  $this->sendError("Erre az időpontra már foglalt a hely"); 
        }



    }

//---{ modify user reservation }---------------------------------------------

    public function modifyUserReservation(ReservationChecker $request){

        //---{ user auth }-----------------
        auth( "sanctum" )->user();

        $request->validated();
        $input = $request->all();
        $id = $input["id"];
        $user_id = $input["user_id"];

        $reservations = Reservation::where("user_id",$user_id)->get();

        $reservation = Reservation::where("id",$id)->first();

        //---{  error 1 }---------------

        if(is_null($reservation)){
            return $this->sendError("A keresett foglalás nem található");
        }

        //---{  success  }-------------
        if ($this->testDate($input)) {
            $reservation-> user_id=$input["user_id"];
            $reservation-> fishingplace_id=$input["fishingplace_id"];
            $reservation-> reservationStart=$input["reservationStart"];
            $reservation-> reservationEnd=$input["reservationEnd"];
            $reservation-> guestNumber=$input["guestNumber"];

        $reservation->save();

        return  $this->sendResponse($reservation,"Foglalás módosítva");
        }else{
            return  $this->sendError("Erre az időpontra már foglalt a hely"); 
        }

    }



//---{  delete reservation  }---------------------------------

    public function deleteReservation(Request $request){

        //---{ user auth }-----------------
        auth( "sanctum" )->user();

        $input=$request->all();
        $id = $input["id"];

        $reservation = Reservation::find($id);

        //---{  error  }---------------

        if(is_null($reservation)){
            return $this->sendError("A keresett foglalás nem található");
        }

        //---{  success  }-------------

        $reservation->delete();

        return  $this->sendResponse($reservation,"Foglalás törölve");

    }

//---{  delete user reservation  }---------------------------------

    public function deleteUserReservation(Request $request){

        //---{ user auth }-----------------
        auth( "sanctum" )->user();

        $input=$request->all();
        $id = $input["id"];
        $user_id = $input["user_id"];

        $reservation = Reservation::where("user_id",$user_id)->get();

        $reservation = Reservation::find($id);

        //---{  error  }---------------

        if(is_null($reservation)){
            return $this->sendError("A keresett foglalás nem található");
        }

        //---{  success  }-------------

        $reservation->delete();

        return  $this->sendResponse($reservation,"Foglalás törölve");

    }

//---{ reservation date validation }---------------------------------------------------------

    public function testDate($input){
        

        $available =  true;

        $newreservationstart = $input["reservationStart"];
        $newreservationend = $input["reservationEnd"];

        $currentDate = date('Y-m-d');
        $currentDate = date('Y-m-d', strtotime($currentDate));

        $fishingplace_id = $input ["fishingplace_id"];
        $reservations = Reservation::where("fishingplace_id",$fishingplace_id)->get();

//---{ time validation }--------------------------------------------------------------------

        foreach ($reservations as $reservation ) {
            
            $startDate = date('Y-m-d', strtotime($reservation -> reservationStart));
            $endDate = date('Y-m-d', strtotime($reservation -> reservationEnd));

            //---{ date available? }-----------------------------------

            if (($newreservationstart >= $startDate) && ($newreservationstart <= $endDate)){ 
                $available = false;
            }

            if (($newreservationend >= $startDate) && ($newreservationend <= $endDate)){
                $available = false;
            }

            if (($newreservationstart <= $startDate) && ($newreservationend >= $endDate)){
                $available = false;
            }

            //---{ yesterday part }-----------------------------

            if (($newreservationstart <= $currentDate)){
                $available = false;
            }

            //---{ end after start }----------------------------

            if (($newreservationstart > $newreservationend)){
                $available = false;
            }
        }

        return $available; 
    }
}
