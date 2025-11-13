<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Category::query()
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Category/Index', [
            'Categories' => $categories,
            'filters' => [
                'search' => $request->input('search', ''),
                'status' => $request->input('status', null),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Category/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'category' => 'nullable'
        ]);

        Category::create([
            'category' => $request->category
        ]);

        return redirect()->route('dashboard.categories.index')->with('message', 'Kategori berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::findOrFail($id);
        if (!$category) {
            return abort(404, 'Kategori tidak ditemukan');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = Category::findOrFail($id);
        if (!$category) {
            return abort(404, 'Kategori tidak ditemukan');
        }
        return Inertia::render('Category/Edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'category' => 'nullable'
        ]);

        $category = Category::findOrFail($id);
        if (!$category) {
            return abort(404, 'Kategori tidak ditemukan');
        };

        $category->update([
            'category' => $request->category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        if (!$category) {
            return abort(404, 'Kategori tidak ditemukan');
        }
        $category->delete();
        return redirect()->route('dashboard.categories.index')->with('message', 'Kategori berhasil dihapus');
    }
}
