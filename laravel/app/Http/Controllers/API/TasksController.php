<?php

namespace App\Http\Controllers\API;

use App\Models\Task;
use App\Models\Orders;
use Illuminate\Http\Request;
use App\Http\Traits\GlobalTraits;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TasksController extends Controller
{
    use GlobalTraits;

    public function tasks()
    {
        $tasks =  Task::all();
        if ($tasks) {
            return $this->SendResponse($tasks, 'success all tasks', 200);
        }
        return $this->SendResponse(null, 'Error tasks', 400);
    }

    public function task($id)
    {
        $task = Task::find($id);
        if ($task) {
            return $this->SendResponse($task, 'success tha task', 200);
        }
        return $this->SendResponse(null, 'Error get task', 400);
    }

    public function create(Request $request, $id)
    {
        /*  $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'body' => 'required|string|max:9999999',
            'mobile' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:9|max:13',
            'email' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->SendResponse(null, $validator->errors(), 401);
        } */

        $orders = Orders::find($id);
        $tasks = new Task;
        $tasks->fullname = $orders->fullname;
        $tasks->body = $orders->body;
        $tasks->mobile = $orders->mobile;
        $tasks->email = $orders->email;
        $tasks->auther = $request->auther;
        $tasks->save();
        if ($tasks) {
            return $this->SendResponse($tasks, 'success craete tasks', 200);
        }
        return $this->SendResponse(null, 'Error craete tasks', 400);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'body' => 'required|string|max:9999999',
            'mobile' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:9|max:13',
            'email' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->SendResponse(null, $validator->errors(), 401);
        }
        $tasks = new Task;
        $tasks->fullname = $request->fullname;
        $tasks->body = $request->body;
        $tasks->mobile = $request->mobile;
        $tasks->email = $request->email;
        $tasks->auther = $request->auther;
        $tasks->delivery_time = $request->delivery_time;
        $tasks->status = $request->status;
        $tasks->save();
        if ($tasks) {
            return $this->SendResponse($tasks, 'success craete tasks', 200);
        }
        return $this->SendResponse(null, 'Error craete tasks', 400);
    }



    public function update(Request  $request, $id)
    {
         $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'body' => 'required|string|max:9999999',
            'mobile' => 'required|regex:/^([0-9\s\-\+\(\)]*)$/|min:9|max:13',
            'email' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->SendResponse(null, $validator->errors(), 401);
        } 
        $tasks = Task::find($id);
        $tasks->fullname = $request->fullname;
        $tasks->body = $request->body;
        $tasks->mobile = $request->mobile;
        $tasks->email = $request->email;
        $tasks->auther = $request->auther;
        $tasks->delivery_time = $request->delivery_time;
        $tasks->status = $request->status;
        $tasks->save();
        if ($tasks) {
            return $this->SendResponse($tasks, 'success update tasks', 200);
        }
        return $this->SendResponse(null, 'Error update tasks', 400);
    }


    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();
        if ($task) {
            return $this->SendResponse(null, 'success delete task', 200);
        }
        return $this->SendResponse(null, 'Error not delete tasks', 400);
    }
}
