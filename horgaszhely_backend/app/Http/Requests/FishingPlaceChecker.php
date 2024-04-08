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
        "pier"=>"required",
        "firepit"=>"required",
        "shelter"=>"required",
        "description"=>"required",
        "longitude"=>"required|numeric|between:-180.0,180.0",
        "latitude"=>"required||numeric|between:-90.0,90.0"
        ];
    }
    public function messages(){
        return[
            "pier.required"=>"elvárt mezö",
            "firepit.required"=>"elvárt mezö",
            "shelter.required"=>"elvárt mezö",
            "description.required"=>"elvárt mezö",
            "longitude.required"=>"elvárt mezö",
            "latitude.required"=>"elvárt mezö",
            "longitude.numeric"=>"hoszusági kordinátának számnak kell lennie.",
            "latitude.numeric"=>"széleségi kordinátának számnak kell lennie.",
            "longitude.between"=>"nem valos kordináta",  
            "latitude.between"=>"nem valos kordináta",
            
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
