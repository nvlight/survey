<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name'  => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);

        /** @var User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'success' => true,
            'user' => $user,
            'token' => $token,
        ]);

    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            //'email' => 'required|email|string|exists:users,email',
            'email' => 'required|email|string',
            'password' => [
                'required',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ],
            'remember' => 'boolean',
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)){
            return response([
                'success' => false,
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }

        $user = Auth::user();
        return response([
            'success' => true,
            'user' => $user,
            'token' => $user->createToken('main')->plainTextToken,
        ]);
    }

    public function logout()
    {
        /** @var User $user */
        $user = Auth::user();

//        return response([
//            'success' => false,
//        ], 422);

        // revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true,
        ]);
    }
}
