<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\FishingPlace;
Use App\Http\Controllers\ResponseController;

use DB;

class FishingPlaceController extends ResponseController
{
    //---{  all fishing place  }--------------------------------------------------------

    public function getFishingPlaces(){
        $fishingplaces = FishingPlace::all();

        //---{  success  }-------------

        return $this->sendResponse($fishingplaces,"horgaszhelyekbetöltve");
    }

    //---{  one fishing place  }--------------------------------------------------------

    public function getFishingPlace(Request $request){
        $id= $request["id"];
        $fishingplace = FishingPlace::where("id",$id)->first();

        //---{  error  }---------------

        if(is_null($fishingplace)){
            return $this->sendError("nincs ilyen horgaszhely");
        }
        
        //---{  success  }-------------

        return $this->sendResponse($fishingplace,"horgaszhely betöltve");
    }
 
    //---{  add fishing place  }--------------------------------------------------------
 
    public function addFishingPlace(Request $request){
        $input=$request->all();

        $fishingplace = new FishingPlace;
        $fishingplace->reservable=$input["reservable"];
        $fishingplace->pier=$input["pier"];
        $fishingplace->firepit=$input["firepit"];
        $fishingplace->shelter=$input["shelter"];
        $fishingplace->averageRating=$input["averageRating"];
        $fishingplace->description=$input["description"];
        $fishingplace->longitude=$input["longitude"];
        $fishingplace->latitude=$input["latitude"];

        $fishingplace->save();

        //---{  error  }--------------- TODO: validation 

        if(is_null($fishingplace)){
            return $this->sendError("sikertelen feltöltés");
        }

        //---{  success  }-------------

        return $this->sendResponse($fishingplace,"horgaszhely hozáadva");
    }

    //---{  modify fishingplace  }------------------------------------------------------

    public function modifyFishingPlace(Request $request){
        $input=$request->all();
        $id = $input["id"];


        $fishingplace = FishingPlace::find($id);
        
        $fishingplace->reservable=$input["reservable"];
        $fishingplace->pier=$input["pier"];
        $fishingplace->firepit=$input["firepit"];
        $fishingplace->shelter=$input["shelter"];
        $fishingplace->averageRating=$input["averageRating"];
        $fishingplace->description=$input["description"];
        $fishingplace->longitude=$input["longitude"];
        $fishingplace->latitude=$input["latitude"];

        
        //---{  error 1 }--------------- 
        
        if(is_null($fishingplace)){
            return $this->sendError("nincs ilyen horgaszhely");
        }
        
        //---{  error 2 }--------------- TODO: validation 
        
        if(is_null($fishingplace)){
            return $this->sendError("hibas adatok");
        }
        
        //---{  success  }-------------

        $fishingplace->save();
        
        return $this->sendResponse($fishingplace,"horgaszhely modositva");
    }

    //---{  delete fishingplace  }------------------------------------------------------

    public function deleteFishingPlace(Request $request){
        $input=$request->all();
        $id = $input["id"];
        $fishingplace = FishingPlace::find($id);

        //---{  error  }--------------- 

        if(is_null($fishingplace)){
            return $this->sendError("nincs ilyen horgaszhely");
        }

        $fishingplace->delete();

        //---{  success  }-------------

        return $this->sendResponse($fishingplace,"horgaszhely törölve");
    }
}
