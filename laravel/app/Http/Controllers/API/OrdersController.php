<?php

namespace App\Http\Controllers\API;

use App\Models\Orders;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Traits\GlobalTraits;
use Illuminate\Support\Facades\Validator;


class OrdersController extends Controller
{
    use GlobalTraits;

    public function orders()
    {
        $orders = Orders::all();
        if ($orders) {
            return $this->SendResponse($orders, 'success all orders', 200);
        }
        return $this->SendResponse(null, 'Error add orders', 400);
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

        $orders = new Orders;
        $orders->fullname = $request->fullname;
        $orders->mobile = $request->mobile;
        $orders->email = $request->email;
        $orders->body = $request->body;
        $orders->save();

        if ($orders) {
            return $this->SendResponse($orders, 'success add orders', 200);
        }
        return $this->SendResponse(null, 'Error add orders', 400);
    }


    public function destroy($id)
    {
        $orders = Orders::find($id);
        $orders->delete();
        if ($orders) {
            return $this->SendResponse(null, 'success delete orders', 200);
        }
        return $this->SendResponse(null, 'Error delete orders', 400);
    }
}
