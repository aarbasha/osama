<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Traits\GlobalTraits;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{

    use GlobalTraits;

    public function users()
    {
        $users = User::all();
        if ($users) {
            return $this->SendResponse($users, 'success all users', 200);
        }
        return $this->SendResponse(null, 'error all users', 400);
    }

    public function user($id)
    {
        $user = User::find($id);
        if ($user) {
            return $this->SendResponse($user, 'success all users', 200);
        }
        return $this->SendResponse(null, 'error all users', 400);
    }

    public function store(Request $request)
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
        if ($request->hasFile('avatar')) {
            $users = new User;
            $avatar = $request->file("avatar");
            $imageName = time() . '_' . $avatar->getClientOriginalName();
            $avatar->move(public_path("photo/"), $imageName);
            $users->avatar = $imageName;
            $users->name = $request->name;
            $users->username = $request->username;
            $users->email = trim($request->email);
            if ($request->password) {
                $users->password = bcrypt($request->password);
            }
            $users->phone = $request->phone;
            $users->status = $request->status;
            $users->roles = $request->roles;
            $users->save();
            if ($users) {
                return $this->SendResponse($users, 'Success add  User  ', 200);
            }
            return $this->SendResponse(null, 'error add  User  ', 400);
        } else {
            $users = new User;
            $users->name = $request->name;
            $users->username = $request->username;
            $users->email = trim($request->email);
            if ($request->password) {
                $users->password = bcrypt($request->password);
            }
            $users->phone = $request->phone;
            $users->status = $request->status;
            $users->roles = $request->roles;
            $users->save();
            if ($users) {
                return $this->SendResponse($users, 'Success add User  ', 200);
            }
            return $this->SendResponse(null, 'error add  User  ', 400);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100',
            'username' => 'required|string|min:5',
            'phone' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:9',
            'password' => 'string|min:8'
        ]);

        if ($validator->fails()) {
            return $this->SendResponse(null, $validator->errors(), 401);
        }
        if ($request->hasFile("avatar")) {
            $file = $request->file("avatar");
            $imageName = time() . '_' . $file->getClientOriginalName();
            $user = User::find($id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->username = $request->username;
            $user->phone = $request->phone;
            $user->avatar = $imageName;
            $user->roles = $request->roles;
            $user->status = $request->status;
            if ($request->password) {
                $user->password = bcrypt($request->password);
            }
            $user->update();
            $file->move(public_path("photo/"), $imageName);
            if ($user) {
                return $this->SendResponse($user, "success", 200);
            }
            return $this->SendResponse(null, "Error", 401);
        } elseif (!$request->hasFile("avatar")) {
            $user = User::find($id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->username = $request->username;
            $user->phone = $request->phone;
            $user->roles = $request->roles;
            $user->status = $request->status;
            if ($request->password) {
                $user->password = bcrypt($request->password);
            }
            $user->update();
            if ($user) {
                return $this->SendResponse($user, "success", 200);
            }
            return $this->SendResponse(null, "Error", 401);
        }
    }

    public function destroy($id)
    {
        $user  = User::findOrFail($id);
        $user->delete();

        if ($user) {
            return $this->SendResponse($user, 'Success delete User  ', 200);
        }
        return $this->SendResponse(null, 'error delete  User  ', 400);
    }

    public function UsersOnline()
    {
        // show all users is online
        $timeout = now()->subMinutes(2);
        $usersOnlin = User::where('last_seen_at', '>=', $timeout)->get();
        /* $SetusersOffline = User::where('last_seen_at', '<', $timeout)->get();
        foreach ($SetusersOffline as $user) {
            $user->is_online = 0;
            $user->save();
        } */
        if ($usersOnlin) {
            return $this->SendResponse($usersOnlin , 'suucess all user online' , 200);
        }
        return $this->SendResponse($usersOnlin , 'not user online tha user is offline ' , 400);
    }


}
