<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserChecker extends FormRequest
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
            "name"=>"required|max:30",
            "email"=>"required|email",
            "birthdate"=>"required|date"
        ];
    }
    public function messages(){
        return[
            "name.required" => "A név megadása kötelező",
            "name.max" => "A név nem lehet hosszabb 30 karakternél",
            "email.required" => "Az e-mail cím megadása kötelező",
            "email.email" => "Érvénytelen e-mail cím formátum",
            "birthdate.required" => "A születési dátum megadása kötelező",
            "birthdate.date" => "A születési dátumot dátum formátumban kell megadni",

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
