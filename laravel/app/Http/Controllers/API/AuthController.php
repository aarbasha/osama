<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Traits\GlobalTraits;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    use GlobalTraits;
    /*   public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    } */

    //=================================================================================

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'username' => 'required|string|min:6|unique:users',
            /*  'avatar' => 'required',
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:10', */
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return $this->SendResponse(null, $validator->errors(), 401);
        }
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        if ($user) {
            return $this->SendResponse($user, 'Success Register User  ', 200);
        }
        return $this->SendResponse(null, 'Error Register User  ', 401);
    }

    //=================================================================================
    public function login(Request $request)
    {
        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $token = $user->createToken('authToken')->plainTextToken;
                $cookie = cookie('jwt', $token, 60 * 24);
                return response()->json([
                    'user' => $user,
                    'token' => $token,
                ])->withCookie($cookie);
            } else {
                return response()->json([
                    'message' => 'Invalid login credentials',
                ], 401);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Unable to log in',
                'error' => $e->getMessage(),
            ], 500);
        }
       
    }
    //=================================================================================
    public function profile()
    {
        return Auth::user();
    }
    //=================================================================================
    public function logout(Request $request)
    {
        /*     $cookie = Cookie::forget('jwt'); */
        $cookie = cookie('jwt', '', 0, '/', null, false, true); // Clear the cookie
        return response()->json(['message' => 'Logged out successfully'])->withCookie($cookie);
    }
}
