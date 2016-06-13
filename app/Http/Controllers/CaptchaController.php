<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class CaptchaController extends Controller
{
    public function create($phone) {
        $response = GetResponse(OK);

        return response()->json($response);
    }

    public function get(Request $request) {
        $captcha = $request->input('captcha');

        // TODO compare captcha in session
        if ('mugeda' === $captcha) {
            $response = GetResponse(OK);
        } else {
            $response = GetResponse(INVALID_OR_MISSING_ARGUMENT);
        }

        return response()->json($response);
    }
}
