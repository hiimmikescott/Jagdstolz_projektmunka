<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ResponseController;
use App\Http\Controllers\emailController;
use App\Models\User;
use App\Http\Requests\UserRegisterChecker;
use App\Http\Requests\UserLoginChecker;

use Nette\Utils\Random;

class AuthController extends ResponseController
{
    public function userRegister(UserRegisterChecker $request){

        //---{  user registration  }------------------------------------------------

        $request->validated();
        $input = $request->all();
        $input["password"]=bcrypt($input["password"]);
        $emailcode = $this->genEmailCode();
        (new emailController)->sendEmailCode($emailCode , $code);
        $input["verifycode"]=$emailcode;
        $user = User::create($input);

        //---{  success  }---------------------------

         $success["name"] = $user->name;
         return $this->sendResponse($success,"sikeres regisztrácio");
    }

    public function emailverify (Request $request){
        $code = $request->all();
        $user = User::where("verifycode",$code)->first();
        if (!empty($user)) {
            $time = date("Y-m-d", time());
            $user-> email_verified_at = $time;
            $user ->save();
            return $this->sendResponse($time,"sikeres viszaigazolás");
        } else {
            return $this->sendError("hibás viszaigazolokod");
        }
    }


    public function userLogin(UserLoginChecker $request){

        //---{  user login  }-----------------------------------------------------------

        $request->validated();
        if(Auth::attempt(["email"=>$request->email,"password"=>$request->password])){
            
            $user = Auth::user();
            
            if (!empty($user->email_verified_at)) {
                

                //---{  success  }--------------------------

                $success["token"] = $user->createToken($user->name."token")->plainTextToken;
                $success["name"]=$user->name;
                $success["id"]=$user->id;
                return $this->sendResponse($success,"Sikeres bejelentkezés");
            
            } else {
                return $this->sendError("bejelentkezési hiba, felhasználoi fiok még nincs visza igazolva");    
            }
        }
        else{
            return $this->sendError("Adatbeviteli hiba, hibás email vagy jelszó");
        }
    }

    public function userLogout(Request $request){

        //---{  user logout  }----------------------------------------------------------

        auth( "sanctum" )->user()->currentAccessToken()->delete();
        return $this->sendResponse("Sikeres kijelentkezés",[]);
    }

    //---{  email verify code generator  }----------------------------------------------  

    private function genEmailCode(){
        return Random::generate(5,"0-9");
    }

}
