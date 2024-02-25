<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class FishingPlaceChecker extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        "reservable"=>"required",
        "pier"=>"required",
        "firepit"=>"required",
        "shelter"=>"required",
        "averageRating"=>"required|min:1|max:5",
        "description"=>"required",
        "longitude"=>"required|numeric|min:-180.000000000|max:180.00000000",
        "latitude"=>"required||numeric|min:-90.0000000|max:90.00000000"
        ];
    }
    public function messages(){
        return[
            "reservable.required"=>"elvárt mezö",
            "pier.required"=>"elvárt mezö",
            "firepit.required"=>"elvárt mezö",
            "shelter.required"=>"elvárt mezö",
            "averageRating.required"=>"elvárt mezö",
            "averageRating.min"=>"nem megfelelö értékelés érték",
            "averageRating.max"=>"nem megfelelö értékelés érték",
            "description.required"=>"elvárt mezö",
            "longitude.required"=>"elvárt mezö",
            "latitude.required"=>"elvárt mezö",
            "longitude.numeric"=>"hoszusági kordinátának számnak kell lennie.",
            "latitude.numeric"=>"széleségi kordinátának számnak kell lennie.",
            "longitude.min"=>"nem valos kordináta",
            "longitude.max"=>"nem valos kordináta",
            "latitude.min"=>"nem valos kordináta",
            "latitude.max"=>"nem valos kordináta"
        ];
    }
    public function failedValidation(Validator $validator){
        throw new HttpResponseException(response()->json([
            "success"=>false,
            "message"=>"Adatbeviteli hiba",
            "data"=>$validator->errors()
        ]));
    }
}
