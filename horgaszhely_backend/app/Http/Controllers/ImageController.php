<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ResponseController;



class ImageController extends ResponseController
{
    public function index()
    {
        //---{ picture collection for the view}
        
        $images = Image::latest()->get();

        $baseUrl = public_path('images');

        $images->transform(function($image) use ($baseUrl) {
            $image->url = $baseUrl . '/' . $image->filename;
            return $image;
        });

        return $this->sendResponse($images,"képek betöltve");
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

        return $this->sendResponse($imageName,"a kép sikeresen feltöltve.");
    }

    public function delete($id)
    {
        $image = Image::find($id);

        //---{  error  }---------------
        if(is_null($image)){
            return $this->sendError("Nincs ilyen kép");
        }

        //---{  delete image from public folder  }---------------
        $imagePath = public_path('images') . '/' . $image->filename;
        if(file_exists($imagePath)) {
            unlink($imagePath);
        }

        //---{  delete image record from database  }---------------
        $image->delete();

        return $this->sendResponse($image,"Kép törölve");
    }

    public function modify(Request $request, $id)
    {
        $request->validate([
            'description' => 'required|string|max:255',
        ]);

        $image = Image::find($id);
        if (!$image) {
            return $this->sendError("a kép nem találhato");
        }

        $image->description = $request->description;
        $image->save();

        return $this->sendResponse($image,"kép leirása sikeresen modositva");
    }
}
