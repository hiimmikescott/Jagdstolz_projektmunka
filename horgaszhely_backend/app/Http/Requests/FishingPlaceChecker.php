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
        "averageRating"=>"required|size:1,5",
        "description"=>"required",
        "longitude"=>"required|",
        "latitude"=>"required|"
        ];
    }
    public function messages(){
        return[
            "reservable.required"=>"elvárt mezö",
            "pier.required"=>"elvárt mezö",
            "firepit.required"=>"elvárt mezö",
            "shelter.required"=>"elvárt mezö",
            "averageRating.required"=>"elvárt mezö",
            "averageRating.size"=>"nem megfelelö érték",
            "description.required"=>"elvárt mezö",
            "longitude.required"=>"elvárt mezö",
            "latitude.required"=>"elvárt mezö"
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
