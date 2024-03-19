<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    public function index()
    {
        $images = Image::latest()->get();

        $baseUrl = public_path('images');

        $images->transform(function($image) use ($baseUrl) {
            $image->url = $baseUrl . '/' . $image->filename;
            return $image;
        });

        return $images;
    }

    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
            'description' => 'required|string|max:255',
            'user_id' => 'required',
        ]);

        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(public_path('images'), $imageName);

        Image::create([
            'filename' => $imageName,
            'description' => $request->description,
            'user_id' => $request->user_id,
        ]);

        return response()->json(['message' => 'Image uploaded successfully.'], 201);
    }

    public function delete($id)
    {
        $image = Image::find($id);

        //---{  error  }---------------
        if(is_null($image)){
            return response()->json(["error" => "Nincs ilyen kép"], 404);
        }

        //---{  delete image from public folder  }---------------
        $imagePath = public_path('images') . '/' . $image->filename;
        if(file_exists($imagePath)) {
            unlink($imagePath);
        }

        //---{  delete image record from database  }---------------
        $image->delete();

        return response()->json(["message" => "Kép törölve"], 200);
    }

    public function modify(Request $request, $id)
    {
        $request->validate([
            'description' => 'required|string|max:255',
        ]);

        $image = Image::find($id);
        if (!$image) {
            return response()->json(['message' => 'Image not found.'], 404);
        }

        $image->description = $request->description;
        $image->save();

        return response()->json(['message' => 'Image description modified successfully.'], 200);
    }
}
