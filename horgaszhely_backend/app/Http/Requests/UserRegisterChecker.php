<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rules\Password;


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
            "name"=>"required|max:20|unique:users",
            "email"=>[
                "required",
                "regex:/(.+)@(.+)\.(.+)/i",
                "unique:users",
            ],
            "password"=>["required",Password::min(6)->letters()->mixedCase()->numbers()->symbols(),"confirmed"],
            "password_confirmation"=>["required"],
            "birthdate"=>"required|date"
        ];
    }
    public function messages(){
        return[
            "name.required" => "A név megadása kötelező",
            "name.max" => "A név túl hosszú",
            "email.required" => "Az e-mail cím megadása kötelező",
            "email.email" => "Érvénytelen e-mail cím",
            "password.required" => "A jelszó megadása kötelező",
            "password.min" => "A jelszó túl rövid",
            "password.letters" => "A jelszónak tartalmaznia kell betűket",
            "password.mixed" => "A jelszónak kis- és nagybetűket is kell tartalmaznia",
            "password.symbols" => "A jelszónak tartalmaznia kell speciális karaktereket",
            "confirm_password.required" => "A jelszó megerősítése kötelező",
            "password_confirmation.required" => "A jelszavak nem egyeznek",
            "birthdate.required" => "A születési dátum megadása kötelező",
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
