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
        "reservationStart"=>"required|date|after:yesterday",
        "reservationEnd"=>"required|date|after:reservationStart",
        "guestNumber"=>"required|numeric|between:1,20"
        ];
    }
    public function messages(){
        return[
        "user_id.required"=>"elvárt mezö",
        "fishingplace_id.required"=>"elvárt mezö",
        "reservationStart.required"=>"elvárt mezö",
        "reservationStart.date"=>"nem dátum",
        "reservationStart.after"=>"tegnapra már nem tudsz idöpontot foglalni",
        "reservationEnd.required"=>"elvárt mezö",
        "reservationEnd.date"=>"nem dátum",
        "reservationEnd.after"=>"a kezdeti dátum nak korában kell lennie ",
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
