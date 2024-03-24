<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\Email;

class emailController extends Controller
{
    public function sendEmailCode ($code,$email){
        $content = [
            "title" => "viszaigazolokod",
            "code" => $code
        ];
        Mail::to($email)->send(new Email($content));
    }
}
