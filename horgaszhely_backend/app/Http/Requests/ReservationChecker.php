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
            "user_id.required" => "Kötelező mező",
            "fishingplace_id.required" => "Kötelező mező",
            "reservationStart.required" => "Kötelező mező",
            "reservationStart.date" => "Nem érvényes dátum",
            "reservationStart.after" => "Tegnapra már nem tudsz időpontot foglalni",
            "reservationEnd.required" => "Kötelező mező",
            "reservationEnd.date" => "Nem érvényes dátum",
            "reservationEnd.after" => "A befejező dátumnak a kezdő dátum után kell lennie",
            "guestNumber.numeric" => "A mező csak számot tartalmazhat",
            "guestNumber.between:1,20" => "Ennyi főre nem lehet foglalni",
            "guestNumber.required" => "Kötelező mező",
            
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
