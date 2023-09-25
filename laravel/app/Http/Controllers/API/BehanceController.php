<?php

namespace App\Http\Controllers\Api;

use App\Models\behance;
use Illuminate\Http\Request;
use App\Http\Traits\GlobalTraits;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;

class BehanceController extends Controller
{

    use GlobalTraits;

    public function allPostBehance()
    {
        $posts = behance::all();

        if ($posts) {
            return $this->SendResponse($posts, 'success this all post for behance', 200);
        }
        return $this->SendResponse(null, 'Error this  post for behance is not found', 400);
    }

    public function SinglePostBehance($id)
    {
        $post = behance::find($id);

        if ($post) {
            return $this->SendResponse($post, 'success this post for behance', 200);
        }
        return $this->SendResponse(null, 'Error this post for behance is not found', 400);
    }


    public function store(Request $request)
    {
        $validator = Validator($request->all(), [
            'title' => 'required|string|max:255|unique:behances',
            'url' => 'required|string|max:855',
            'cover' => 'required|image|max:9999999999',
            'tags' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->SendResponse([], $validator->errors(), 401);
        }
        if ($request->hasFile("cover")) {
            $file = $request->file("cover");
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path("cover/"), $imageName);
            $postBehance = new behance;
            $postBehance->title = $request->title;
            $postBehance->url = $request->url;
            $postBehance->tags = json_encode($request->tags);
            $postBehance->auther = $request->auther;
            $postBehance->cover = $imageName;
            $postBehance->save();
            if ($postBehance) {
                return $this->SendResponse($postBehance, 'success', 200);
            }
            return $this->SendResponse([], 'Error', 401);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator($request->all(), [
            'title' => 'required|string|max:255|unique:behances',
            'url' => 'required|string|max:855',
            'cover' => 'image|max:9999999999',
            'tags' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->SendResponse([], $validator->errors(), 401);
        }
        if ($request->hasFile("cover")) {
            $file = $request->file("cover");
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path("cover/"), $imageName);
            $postBehance = behance::find($id);
            $postBehance->title = $request->title;
            $postBehance->url = $request->url;
            $postBehance->tags = $request->tags;
            $postBehance->auther = $request->auther;
            $postBehance->cover = $imageName;
            $postBehance->update();
            if ($postBehance) {
                return $this->SendResponse($postBehance, 'success', 200);
            }
            return $this->SendResponse([], 'Error', 401);
        } else {
            $postBehance = behance::find($id);
            $postBehance->title = $request->title;
            $postBehance->url = $request->url;
            $postBehance->tags = json_encode($request->tags);
            $postBehance->auther = $request->auther;
            $postBehance->update();
            if ($postBehance) {
                return $this->SendResponse($postBehance, 'success', 200);
            }
            return $this->SendResponse([], 'Error', 401);
        }
    }

    public function destroy($id)
    {
        $postBehance = behance::find($id);
        $filePath = public_path('cover/' . $postBehance->cover);
        if ($postBehance) {
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
                echo 'delete file';
            }
            $postBehance->delete();
            return $this->SendResponse(null, 'success delete file', 200);
        }
    }
}
