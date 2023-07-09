<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // ToDo
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Index/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $images = $request->validate([
            "images" => 'required|array',
            "images.*" => '',
        ]);

        foreach ($images["images"] as $image) {
            $path = Storage::put('public/images', $image);
        }
        
        // TODO: Write this data to a database table
        // TODO: Hook the Discord bot into the database table
        // TODO: Symlink the images folder in the Discord bot folder to public/images here
        // TODO: Profit prolly
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // ToDo
    }
}
