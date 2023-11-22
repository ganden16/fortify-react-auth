<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function getAll(Request $request)
    {
        $category = Category::orderBy('updated_at','DESC')->get();

        return response()->json([
            'status' => true,
            'message' => 'list data kategori',
            'data' => $category
        ], 200);
    }

    public function findOne(Category $category)
    {
        return response()->json([
            'status' => true,
            'message' => 'data kategori',
            'data' => $category
        ], 200);
    }

    public function add(Request $request)
    {
        $data = [
            'name' => $request['name'],
        ];
        $rules = [
            'name' => 'required',
        ];

        $validator = Validator::make($data, $rules);
        $validator->validate();

        $newCategory = new Category($data);
        $newCategory->save();

        return response()->json([
            'status' => true,
            'message' => 'tambah kategori sukses',
            'data' => $newCategory
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $data = [
            'name' => $request['name'],
        ];
        $rules = [
            'name' => 'required',
        ];

        $validator = Validator::make($data, $rules);
        $validator->validate();

        Category::where('id', $id)->update($data);

        return response()->json([
            'status' => true,
            'message' => 'update kategori sukses',
            'data' => Category::find($id)
        ], 200);
    }

    public function delete($id)
    {
        $isCategory = Category::find($id);
        if (!$isCategory) {
            return response()->json([
                'status' => false,
                'message' => 'data kategori tidak ditemukan'
            ], 400);
        }
        Category::destroy($id);
        return response()->json([
            'status' => true,
            'message' => 'hapus kategori berhasil, id kategori = ' . $id
        ]);
    }
}
