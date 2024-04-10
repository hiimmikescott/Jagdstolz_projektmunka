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
            "pier.required" => "Kötelező mező",
            "firepit.required" => "Kötelező mező",
            "shelter.required" => "Kötelező mező",
            "description.required" => "Kötelező mező",
            "longitude.required" => "Kötelező mező",
            "latitude.required" => "Kötelező mező",
            "longitude.numeric" => "A hosszúsági koordinátának számnak kell lennie.",
            "latitude.numeric" => "A szélességi koordinátának számnak kell lennie.",
            "longitude.between" => "Nem valós koordináta",
            "latitude.between" => "Nem valós koordináta",
            
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
