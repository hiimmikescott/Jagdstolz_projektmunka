<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ReservationChecker extends FormRequest
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
        "user_id"=>"required",
        "fishingplace_id"=>"required",
        "reservationStart"=>"required",
        "reservationEnd"=>"required",
        //"actualRate"=>"required|min:1|max:5",
        "guestNumber"=>"required|numeric|between:1,20"
        ];
    }
    public function messages(){
        return[
        "user_id.required"=>"elvárt mezö",
        "fishingplace_id.required"=>"elvárt mezö",
        "reservationStart.required"=>"elvárt mezö",
        "reservationEnd.required"=>"elvárt mezö",
        // "actualRate.required"=>"elvárt mezö",
        // "actualRate.min"=>"az erték min 1",
        // "actualRate.max"=>"az érték max 5"
        "guestNumber.numeric"=>"a mezö csak szám lehet",
        "guestNumber.between:1,20"=>"enyi före nem lehet foglalni",
        "guestNumber.required"=>"elvárt mezo"
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
