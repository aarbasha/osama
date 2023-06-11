<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Traits\GlobalTraits;
use Illuminate\Http\Request;
use App\Models\Categorie;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Storage;

class CategorieController extends Controller
{
    use GlobalTraits;


    /*  public function __construct()
    {
        $this->middleware(
            'auth:sanctum',
            ['except' =>
            ['index', 'subCategory', 'store', 'update', 'storeSubCategories', 'destroy']]
        );
    } */

    public function categories()
    {
        $categories = Categorie::all();

        if ($categories) {
            return $this->SendResponse($categories, 'Sucess , this is all categories', 200);
        }
        return $this->SendResponse(null, 'Error , tha categories is undifaind', 401);
    }

    public function index(Request $request)
    {

        /*    $sortField = $request->input('sort_field', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $perPage = $request->input('per_page', 10);

        orderBy('created_at', 'desc')
            ->paginate(5); */


        $categories = Categorie::orderBy('created_at', 'desc')
            ->paginate(5);

        if ($categories) {
            return $this->SendResponse($categories, 'Sucess , this is all categories', 200);
        }
        return $this->SendResponse(null, 'Error , tha categories is undifaind', 401);
    }

    public function subCategory()
    {
        $subCategory = Categorie::with('children')->whereNull('parent_id')->get();


        if ($subCategory) {
            return $this->SendResponse($subCategory, 'Sucess , this is all  SUB categories', 200);
        }
        return $this->SendResponse(null, 'Error , tha categories is undifaind', 401);
    }

    public function store(Request $request)
    {
        $validator = Validator($request->all(), [
            'name' => 'required|string|max:255|unique:categories',
            'info' => 'required|string|max:855',
            'cover' => 'required|image|max:9999999999',
            'name_folder' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->SendResponse([], $validator->errors(), 401);
        }
        // create group folder in public
        $this->CreateMultieFolders();

        if ($request->hasFile("cover")) {
            $file = $request->file("cover");
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path("cover/"), $imageName);
            $Categories = new Categorie;
            $Categories->name = $request->name;
            $Categories->info = $request->info;
            $Categories->auther = $request->auther;
            $Categories->cover = $imageName;
            $Categories->name_folder = $request->name_folder;
            $Categories->save();
            //  create folder from images is project

            $pathfolder = public_path('images' . "//" . $request->name_folder);
            if ($Categories) {
                if (!file_exists($pathfolder)) {
                    mkdir($pathfolder);
                    return $this->SendResponse($Categories, 'success and create folder', 200);
                } elseif (file_exists(public_path('images' . "//" . $request->name_folder))) {
                    // !mkdir($pathfolder);
                    return $this->SendResponse($Categories, 'tha folder alredy exist', 200);
                }
                return $this->SendResponse($Categories, 'success', 200);
            }
            return $this->SendResponse([], 'Error', 401);
        }
    }

    public function storeSubCategories(Request $request)
    {

        $validator = Validator($request->all(), [
            'name' => 'required|string|max:255|unique:categories',
            'info' => 'required|string|max:855',
            'cover' => 'required',
            'name_folder' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->SendResponse([], $validator->errors(), 401);
        }
        // create group folder in public
        $this->CreateMultieFolders();


        if ($request->hasFile("cover")) {
            $file = $request->file("cover");
            $imageName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path("cover/"), $imageName);
            $Categories = new Categorie;
            $Categories->parent_id = $request->parent_id;
            $Categories->name = $request->name;
            $Categories->info = $request->info;
            $Categories->auther = $request->auther;
            $Categories->cover = $imageName;
            $Categories->name_folder = $request->name_folder;
            $Categories->save();
            //  create folder from images is project

            $pathfolder = public_path('images' . "//" . $request->name_folder);
            if ($Categories) {
                if (!file_exists($pathfolder)) {
                    mkdir($pathfolder);
                    return $this->SendResponse($Categories, 'success and create folder', 200);
                } elseif (file_exists(public_path('images' . "//" . $request->name_folder))) {
                    // !mkdir($pathfolder);
                    return $this->SendResponse($Categories, 'tha folder alredy exist', 200);
                }
                return $this->SendResponse($Categories, 'success', 200);
            }
            return $this->SendResponse([], 'Error', 401);
        }
    }

    public function categorie($id)
    {
        $categorie = Categorie::where('id', $id)->get();
        if ($categorie) {
            return $this->SendResponse($categorie, 'success', 200);
        }
        return $this->SendResponse(null, 'error tha categorie not found', 400);
    }

    public function subCategorie($id)
    {
        $categorie = Categorie::where('parent_id', $id)->get();
        if ($categorie) {
            return $this->SendResponse($categorie, 'success', 200);
        }
        return $this->SendResponse(null, 'error tha categorie not found', 400);
    }

    public function update(Request $request, $id)
    {

        $validator = Validator($request->all(), [
            'name' => 'required|string|max:255|unique:categories',
            'info' => 'required|string|max:855',
            'cover' => 'required',
            'name_folder' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->SendResponse([], $validator->errors(), 401);
        }

        $this->CreateMultieFolders();

        $Categories = Categorie::findOrFail($id);
        if ($request->hasFile("cover")) {
            if (File::exists("cover/" . $Categories->cover)) {
                File::delete("cover/" . $Categories->cover);
            }
            $file = $request->file("cover");
            $imageName = time() . "_" . $file->getClientOriginalName();
            $file->move(public_path("cover/"), $imageName);
            $Categories->name = $request->name;
            $Categories->info = $request->info;
            $Categories->name_folder = $request->name_folder;
            $Categories->cover = $imageName;
            $Categories->auther = $request->auther;
            $Categories->save();
        }
        if (!$request->hasFile("cover")) {
            $Categories->name = $request->name;
            $Categories->info = $request->info;
            $Categories->name_folder = $request->name_folder;
            $Categories->auther = $request->auther;
            $Categories->save();
        }
        $json_string = Categorie::where('id', $id)->get('name_folder');
        $json_array = json_decode($json_string, true);
        $value = $json_array[0]['name_folder'];
        $oldFolder = public_path('images' . "//" . $value);
        $newFolder = public_path('images' . "//" . $request->name_folder);

        if ($request->name_folder) {
            if (file_exists($newFolder)) {
                rename($oldFolder,  $newFolder);
                return ' Sorry folder old dasnt exist ....';
            } elseif (!file_exists($newFolder)) {
                mkdir($newFolder);
            }
        }
        if ($Categories) {
            return $this->SendResponse($Categories, "Success update Categories", 200);
        }
        return $this->SendResponse(null, "Error not update Categories", 200);
    }


    public function destroy($id)
    {
        $Categorie = Categorie::find($id);
        if ($Categorie) {
            $json_string = Categorie::where('id', $id)->get('name_folder');
            $json_array = json_decode($json_string, true);
            $value = $json_array[0]['name_folder'];
            $oldFolder = public_path('images' . "/" . $value);
            if (file_exists($oldFolder)) {
                $folders = $oldFolder;
                $files = glob($folders . '/*');
                foreach ($files as $file) {
                    if (is_file($file)) {
                        unlink($file);
                    }
                }
                rmdir($oldFolder);
            }

            $Categorie->delete();
            return $this->SendResponse($oldFolder, "success deleted is Categorie", 200);
        }
        return $this->SendResponse(null, "Error tha categoure not deleted", 400);
    }

    public function creteFoldersInPublic()
    {
        // create group folder in public
        $path = public_path();
        $folders = array('images', 'photo', 'cover');
        foreach ($folders as $folder) {
            if (!is_dir($path . '/' . $folder)) {
                mkdir($path . '/' . $folder, 0777);
                return 'created folder success';
            } else {
                return 'ths folder alredy exist ...';
            }
        }
    }
}
