<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Mail\AuthMail;
use App\Mail\WelcomeEmail;
use Illuminate\Http\Request;
use App\Http\Traits\GlobalTraits;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cookie;
use Laravel\Sanctum\PersonalAccessToken;
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
            'email' => trim($request->email),
            'password' => bcrypt($request->password),
            'last_seen_at' => now() // adation ....
        ]);

        if ($user) {

            Mail::to($user->email)->send(new WelcomeEmail($user));
            return $this->SendResponse($user, 'Success Register User  ', 200);
        }
        return $this->SendResponse(null, 'Error Register User  ', 401);
    }

    //=================================================================================
    public function login(Request $request)
    {
        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                $user = $request->user();
                $user->last_seen_at = now();
                $user->is_online = 1;
                $user->save();
                $token = $user->createToken('jwt')->plainTextToken;
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
    public function profile(Request $request)
    {
        $user = $request->user();
        $user->last_seen_at = now();
        $user->is_online = 1;
        $user->save();
        return response()->json($user);
    }
    //=================================================================================
    public function logout(Request $request)
    {
        /*     $cookie = Cookie::forget('jwt'); */
        $user = $request->user();
        $user->is_online = 0;
        $user->save();
        $cookie = cookie('jwt', '', 0, '/', null, false, true); // Clear the cookie
        return response()->json(['message' => 'Logged out successfully'])->withCookie($cookie);
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:855',
            'username' => 'required|string|max:855',
            //'avatar' => 'required',
            'phone' => 'regex:/^([0-9\s\-\+\(\)]*)$/|min:9',
            'status' => 'required',
            'roles' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->SendResponse([], $validator->errors(), 401);
        }
        $user = $request->user();
        if ($request->hasFile('avatar')) {
            $avatar = $request->file("avatar");
            $imageName = time() . '_' . $avatar->getClientOriginalName();
            $avatar->move(public_path("photo/"), $imageName);
            $user->avatar = $imageName;
            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = trim($request->email);
            if ($request->password) {
                $user->password = bcrypt($request->password);
            }
            $user->phone = $request->phone;
            $user->status = $request->status;
            $user->roles = $request->roles;
            $user->save();
            if ($user) {
                return $this->SendResponse($user, 'Success update profile User  ', 200);
            }
        } else {
            $user = $request->user();
            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = trim($request->email);
            if ($request->password) {
                $user->password = bcrypt($request->password);
            }
            $user->phone = $request->phone;
            $user->status = $request->status;
            $user->roles = $request->roles;
            $user->save();
            if ($user) {
                return $this->SendResponse($user, 'Success update profile User  ', 200);
            }
        }
    }
    public function setOnline(Request $request)
    {
        $user = $request->user();
        $user->last_seen_at = now();
        $user->is_online = 1;
        $user->save();
        return response()->json($user);
    }

    public function online()
    {
        // show all users is online
        $timeout = now()->subMinutes(1);
        $usersOnlin = User::where('last_seen_at', '>=', $timeout)->get();
        $usersOffline = User::where('last_seen_at', '<', $timeout)->get();
        foreach ($usersOffline as $user) {
            $user->is_online = 0;
            $user->save();
        }
        return response()->json(['online' => $usersOnlin, 'offline' => $usersOffline]);
    }

    public function logoutAnyUser($id)
    {
        $user = Auth::logoutOtherDevices($id);

        if ($user) {
            return $this->SendResponse($user, 'success logout user in sidout system   ', 200);
        }
        return $this->SendResponse(null, 'error logout user in sidout system   ', 400);
    }

    public function test()
    {
        $count = user::count();
        return $count;
    }

    public function RefreshToken(Request $request)
    {
        $cookieName = 'jwt';
        $currentToken = $request->cookie($cookieName);

        if (!$currentToken) {
            return response()->json(['message' => 'Token cookie not found'], 401);
        }

        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
        $newToken = $user->createToken('jwt')->plainTextToken;
        $expiresAt = now()->addMinutes(config('sanctum.expiration'));

        return response()->json(['token' => $newToken, 'expires_at' => $expiresAt])
            ->withCookie(cookie($cookieName, $newToken, config('sanctum.expiration')));
    }
}
