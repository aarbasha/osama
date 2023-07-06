<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use App\Models\Image;
use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Http\Traits\GlobalTraits;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostsController extends Controller
{
    use GlobalTraits;

    public function Posts()
    {
        $posts = Post::with('Categorie')->orderBy('created_at', 'desc')
            ->paginate(5);

        if ($posts) {
            return $this->SendResponse($posts, 'success this all posts', 200);
        }
        return $this->SendResponse(null, 'Error', 400);
    }

    public function all_Posts()
    {
        $posts = Post::all();

        if ($posts) {
            return $this->SendResponse($posts, 'success this all posts', 200);
        }
        return $this->SendResponse(null, 'Error', 400);
    }

    public function Post($id)
    {

        $post = Post::find($id);
        $images = Image::where('post_id', $id)->get();

        if ($post) {
            return $this->SendResponse([$post, $images], 'success this Post', 200);
        }
        return $this->SendResponse(null, 'Error', 400);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|unique:posts',
            'body' => 'required|string|max:9999999',
            'images' => 'required|max:50000',
            'cover' => 'required|mimes:jpeg,jpg,png,gif|max:50000',
            'tags' => 'required',
            'categorie_id' => 'required',
            /*    'document' => 'required|file|mimes:pdf,doc,docx,xls,xlsx|max:10000',
            'video' => 'required|file|mimes:mp4,mov,avi|max:20000',  */
        ]);
        if ($validator->fails()) {
            return $this->SendResponse(null, $validator->errors(), 401);
        }
        if ($request->hasFile("cover")) {
            $file = $request->file("cover");
            $imageName = time() . '_' . $file->getClientOriginalName();
            $post = new Post;
            $post->title = $request->title;
            $post->body = $request->body;
            $post->categorie_id =  $request->categorie_id;
            $post->auther = $request->auther;
            $post->tags = $request->tags;
            $post->cover = $imageName;
            $file->move(public_path("cover/"), $imageName);
            $post->save();

            if ($request->hasFile("images")) {
                $files = $request->file("images");
                foreach ($files as $imagefile) {
                    $imageName = time() . '_' . $imagefile->getClientOriginalName();
                    $image = new Image;
                    $image->url = $imageName;
                    $image->post_id = $post->id;
                    $image->save();
                    // ---------------------------------------------------------------------
                    $json_string = Categorie::where('id', $request->categorie_id)->get('name_folder');
                    $json_array = json_decode($json_string, true);
                    $value = $json_array[0]['name_folder'];
                    $imagefile->move(public_path('images' . "/" . $value), $imageName);
                    // -------------------------------------------------

                }
            }
            $images = Image::where('post_id', $post->id)->get();
            if ($post) {
                return $this->SendResponse([$post, $images], 'success', 200);
            }
        }
        return $this->SendResponse(null, 'Error', 401);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255|unique:posts',
            'body' => 'required|string|max:9999999',
            'images' => 'required|file|mimes:jpeg,jpg,png,gif,doc,docx,xls,xlsx|max:50000',
            'cover' => 'required|mimes:jpeg,jpg,png,gif,doc,docx,xls,xlsx|max:50000',
            'tags' => 'required',
            'categorie_id' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->SendResponse(null, $validator->errors(), 401);
        }

        $post = Post::findOrFail($id);
        if ($request->hasFile("cover")) {
            if (Storage::disk('public')->exists('cover/' . $post->cover)) {
                Storage::disk('public')->delete('cover/' . $post->cover);
            }
            $file = $request->file("cover");
            $imageName = time() . "_" . $file->getClientOriginalName();
            $file->move(public_path("cover/"), $imageName);
            $post->title = $request->title;
            $post->body = $request->body;
            $post->tags = $request->tags;
            $post->cover = $imageName;
            $post->auther = $request->auther;
            $post->categorie_id =  $request->categorie_id;
            $post->save();
        }
        if (!$request->hasFile("cover")) {
            $post->title = $request->title;
            $post->body = $request->body;
            $post->tags = $request->tags;
            $post->auther = $request->auther;
            $post->categorie_id =  $request->categorie_id;
            $post->save();
        }
        if ($request->hasFile("images")) {
            $files = $request->file("images");
            foreach ($files as $imagefile) {
                $imageName = time() . '_' . $imagefile->getClientOriginalName();
                $image = new Image;
                // ---------------------------------------------------------------------
                $json_string = Categorie::where('id', $request->categorie_id)->get('name_folder');
                $json_array = json_decode($json_string, true);
                $value = $json_array[0]['name_folder'];
                $imagefile->move(public_path('images' . "/" . $value), $imageName);

                // -------------------------------------------------
                $image->url = $imageName;
                $image->post_id = $post->id;
                $image->save();
            }
        }
        $images = Image::where('post_id', $post->id)->get();
        if ($post) {
            return $this->SendResponse([$post, $images], 'success', 200);
        }
    }

    public function destroy($id)
    {

        $post = Post::findOrFail($id);
        if (Storage::disk('public')->exists('cover/' . $post->cover)) {
            Storage::disk('public')->delete('cover/' . $post->cover);
        }
        $images = Image::where("post_id", $post->id)->get();
        /*  foreach ($images as $image) {
            $json_string = Categorie::where('id', $id)->get('name_folder');
            $json_array = json_decode($json_string, true);
            $value = $json_array[0]['name_folder'];
            if (Storage::disk('public')->exists('images/' . $value . '/' . $image)) {
                # Storage::disk('public')->delete('images/' . $value . '/' . $image);
                $image->delete();
            }
        } */
        if ($post) {
            $post->delete();
            return $this->SendResponse(null, 'success delete tha post', 200);
        }
        return $this->SendResponse(null, 'error was delete tha product before', 401);
    }

    public function path($id)
    {
        $post = Post::findOrFail($id);
        $images = Image::where("post_id", $post->id)->get();
        $json_string = Categorie::where('id', $id)->get('name_folder');
        $json_array = json_decode($json_string, true);
        $value = $json_array[0]['name_folder'];
        foreach ($images as $image) {
            if (Storage::disk('public')->exists("images/" . $value . "/" . $image->image)) {
                Storage::disk('public')->delete("images/" . $value . "/" . $image->image);
            }
        }

        return Storage::disk('public/images/' . $value . '/')->exists($image->image);
    }

    public function DeleteImage(Request $request, $id)
    {
        $images = Image::findOrFail($id);
        if (File::exists("images/" . $request . '/' . $images->url)) {
            File::delete("images/" . $request . '/' . $images->url);
        }
        $images = Image::find($id)->delete();
        return $this->SendResponse($images, 'success delet images from DB && File System ...', 200);
    }

    public function deletecover($id)
    {
        $cover = Post::findOrFail($id)->cover;
        if (File::exists("cover/" . $cover)) {
            File::delete("cover/" . $cover);
        }
        return back();
    }
}
