<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\FishingPlace;

use DB;

class FishingPlaceController extends Controller
{
    public function getFishingPlaces(){
        $fishingplaces = FishingPlace::all();

        return $fishingplaces;
    }
    public function getFishingPlace(Request $request){
        $id= $request["id"];
        $fishingplace = FishingPlace::where("id",$id)->first();

        return $fishingplace;
    }
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
        return "hozzaadva";
    }
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

        $fishingplace->save();
        return "modositva";
    }
    public function deleteFishingPlace(Request $request){
        $input=$request->all();
        $id = $input["id"];

        $fishingplace = FishingPlace::find($id);
        $fishingplace->delete();
        return "törölve";
    }
}
