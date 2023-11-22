<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function getAll(Request $request)
    {
        if ($request['category']) {
            $product = Product::where('category_id', (int)$request['category'])->orderBy('updated_at','DESC')->get();
        } else {
            $product = Product::orderBy('updated_at','DESC')->get();
        }
        return response()->json([
            'status' => true,
            'message' => 'list data produk',
            'data' => $product->load(['author', 'category', 'editor'])
        ], 200);
    }

    public function findOne(Product $product)
    {
        if ($product) {
            return response()->json([
                'status' => true,
                'message' => 'data produk',
                'data' => $product->load('category', 'author', 'editor')
            ]);
        }
        return response()->json([
            'status' => false,
            'message' => 'data produk tidak ditemukan',
        ], 404);
    }

    public function add(Request $request)
    {
        $data = [
            'name' => $request['name'],
            'category_id' => $request['category_id'],
            'price' => $request['price'],
            'description' => $request['description'],
        ];
        $rules = [
            'name' => 'required',
            'category_id' => 'required|numeric',
            'price' => 'required',
            'description' => 'required',
        ];


        $validator = Validator::make($data, $rules);
        $validator->validate();

        $data['created_by'] = $request->user()->id;
        $data['price'] = (int)$request['price'];
        $newProduct = new Product($data);
        $newProduct->save();

        return response()->json([
            'status' => true,
            'message' => 'tambah produk sukses',
            'data' => $newProduct->load('category', 'author')
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $data = [
            'name' => $request['name'],
            'category_id' => $request['category_id'],
            'price' => $request['price'],
            'description' => $request['description'],
        ];
        $rules = [
            'name' => 'required',
            'category_id' => 'required|numeric',
            'price' => 'required',
            'description' => 'required',
        ];


        $validator = Validator::make($data, $rules);
        $validator->validate();

        $data['updated_by'] = $request->user()->id;

        $data['price'] = (int)$request['price'];
        Product::where('id', $id)->update($data);

        return response()->json([
            'status' => true,
            'message' => 'update produk sukses',
            'data' => Product::find($id)->load('category', 'author', 'editor')
        ], 200);
    }

    public function delete($id)
    {
        $isProduk = Product::find($id);
        if (!$isProduk) {
            return response()->json([
                'status' => false,
                'message' => 'data produk tidak ditemukan'
            ], 400);
        }
        Product::destroy($id);
        return response()->json([
            'status' => true,
            'message' => 'hapus produk berhasil, id produk = ' . $id
        ]);
    }
}
