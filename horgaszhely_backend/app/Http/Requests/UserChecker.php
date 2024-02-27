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
            "name.required"=>"a név elvárt",
            "name.max"=>"nemlehet 30 karakternél hoszab",
            "email.required"=>"email elvárt",
            "email.email"=>"nem email formatum",
            "birthdate.required"=>"szuletési datum kötelezö",
            "birthdate.date"=>"szuletési datum kötelezö dátum formátumban"
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
