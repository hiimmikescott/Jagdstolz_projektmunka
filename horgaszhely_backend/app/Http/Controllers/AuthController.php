<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ResponseController;
use App\Models\User;
use App\Http\Requests\UserRegisterChecker;
use App\Http\Requests\UserLoginChecker;

class AuthController extends ResponseController
{
    public function userRegister(UserRegisterChecker $request){

        //---{  user registration  }------------------------------------------------

        $request->validated();
        $input = $request->all();
        $input["password"]=bcrypt($input["password"]);
        $user = User::create($input);

        //---{  success  }---------------------------

        $success["name"] = $user->name;
        return $this->sendResponse($success,"sikeres regisztrácio");
    }


    public function userLogin(UserLoginChecker $request){

        //---{  user login  }-----------------------------------------------------------

        $request->validated();
        if(Auth::attempt(["email"=>$request->email,"password"=>$request->password])){
            $user = Auth::user();

            //---{  success  }--------------------------

            $success["token"] = $user->createToken($user->name."token")->plainTextToken;
            $success["name"]=$user->name;
            return $this->sendResponse($success,"Sikeres bejelentkezés");
        }
        else{
            return $this->sendError("Adatbeviteli hiba",["Hibás email vagy jelszó"],401);
        }
    }
    public function userLogout(Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Successfully logged out']);
    }

}
