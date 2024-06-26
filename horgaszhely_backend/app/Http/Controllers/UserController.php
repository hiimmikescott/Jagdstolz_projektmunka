<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
Use App\Http\Controllers\ResponseController;
Use App\Http\Requests\UserChecker;

use DB;

class UserController extends ResponseController
{
    //---{  all user  }----------------------------------------------------------

    public function getUsers(){
        $users = User::all();

        //---{  success  }----------

        return $this->sendResponse($users, "Összes felhasználó betöltve");
    }

    //---{  one user  }----------------------------------------------------------

    public function getUser(Request $request){

        //---{ user auth }-----------------
        auth( "sanctum" )->user();

        $id = $request["id"];
        $user = User::where("id",$id)->first();

        //---{  error  }------------

        if(is_null($user)){
            return $this->sendError("A keresett felhasználó nem található");
        }

        //---{  success  }----------

        return $this->sendResponse($user, "Egy felhasználó betöltve");
    }

    //---{  modify user  }-------------------------------------------------------

    public function modifyUser(UserChecker $request){

        //---{ user auth }-----------------
        auth( "sanctum" )->user();

        $request->validated();
        $input=$request->all();
        $id = $input["id"];

        $user = User::where("id",$id)->first();

         //---{  error  }------------

         if(is_null($user)){
            return $this->sendError("A keresett felhasználó nem található");
        }

        //---{  success  }----------

        $user->name=$input["name"];
        $user->email=$input["email"];
        //$user->profilepicture=$input["profilepicture"];
        $user->birthdate=$input["birthdate"];

        $user->save();

        return $this->sendResponse($user, "Felhasználó adatai módosítva");
    }

    //---{  delete user  }--------------------------------------------------------

    public function deleteUser(Request $request){

        //---{ user auth }-----------------
        auth( "sanctum" )->user();
        
        $input=$request->all();
        $id = $input["id"];

        $user = User::where("id",$id)->first();

         //---{  error  }------------

         if(is_null($user)){
            return $this->sendError("A keresett felhasználó nem található");
        }

        $user->delete();

        //---{  success  }-----------

        return $this->sendResponse($user, "Felhasználó törölve");
    }
}
