<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;


class UserRegisterChecker extends FormRequest
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
            "name"=>"required|max:20",
            "email"=>"required|email",
            "password"=>"required|min:6",
            //"profilepicture"=>"required",
            "birthdate"=>"required"
        ];
    }
    public function messages(){
        return[
            "name.required"=>"Név kötelező",
            "name.max"=>"Név túl hosszú",
            "email.required"=>"Email kötelező",
            "email.email"=>"Valid email kötelező",
            "password.required"=>"Jelszó kötelező",
            "password.min"=>"Jelszó túl rövid",

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
