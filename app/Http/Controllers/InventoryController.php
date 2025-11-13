<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $status = $request->query('status'); // 'active' | 'inactive'
        $kategori = $request->query('kategori');

        $query = Inventory::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('kode_barang', 'like', "%{$search}%")
                    ->orWhere('nama_barang', 'like', "%{$search}%")
                    ->orWhere('kategori', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%")
                    ->orWhere('lokasi_barang', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '') {
            $isActive = $status === 'active' ? 1 : 0;
            $query->where('is_active', $isActive);
        }

        if ($kategori) {
            $query->where('kategori', $kategori);
        }

        $inventories = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        $kategoriList = Inventory::query()
            ->select('kategori')
            ->whereNotNull('kategori')
            ->where('kategori', '!=', '')
            ->distinct()
            ->orderBy('kategori')
            ->pluck('kategori');

        return Inertia::render('Inventory/Index', [
            'inventories' => $inventories,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'kategori' => $kategori,
            ],
            'kategoriList' => $kategoriList,
        ]);
    }

    public function create()
    {
        return Inertia::render('Inventory/Create');
    }

    public function store(Request $request)
    {
        // Normalize possible frontend typo: map kategori/category/kategory to 'kategori'
        $request->merge([
            'kategori' => $request->input('kategori') ?? $request->input('category') ?? $request->input('kategory'),
        ]);

        request()->validate([
             'kode_barang' => 'required|string|max:20|unique:inventories,kode_barang',
            'nama_barang' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'deskripsi' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'lokasi_barang' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        Inventory::create([
            'kode_barang' => request('kode_barang'),
            'nama_barang' => request('nama_barang'),
            'kategori' => request('kategori'),
            'deskripsi' => request('deskripsi'),
            'status' => request('status'),
            'lokasi_barang' => request('lokasi_barang'),
            'is_active' => request('is_active') ?? 1,
        ]);

        return redirect()->route('dashboard.inventories.index')->with('message', 'Barang berhasil ditambahkan');
    }

    public function show(Inventory $inventory)
    {
        return Inertia::render('Inventory/Show', [
            'inventory' => $inventory,
        ]);
    }

    public function edit(Inventory $inventory)
    {
        return Inertia::render('Inventory/Edit', [
            'inventory' => $inventory,
        ]);
    }

    public function update(Request $request, Inventory $inventory)
    {
        // Normalize possible frontend typo: map kategori/category/kategory to 'kategori'
        $request->merge([
            'kategori' => $request->input('kategori') ?? $request->input('category') ?? $request->input('kategory'),
        ]);

        request()->validate([
            'kode_barang' => 'required|string|max:20|unique:inventories,kode_barang,' . $inventory->id,
            'nama_barang' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'deskripsi' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'lokasi_barang' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        $inventory->update([
            'kode_barang' => request('kode_barang'),
            'nama_barang' => request('nama_barang'),
            'kategori' => request('kategori'),
            'deskripsi' => request('deskripsi'),
            'status' => request('status'),
            'lokasi_barang' => request('lokasi_barang'),
            'is_active' => request('is_active') ?? $inventory->is_active,
        ]);

        return redirect()->route('dashboard.inventories.index')->with('message', 'Barang berhasil diperbarui');
    }

    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        return redirect()->route('dashboard.inventories.index')->with('message', 'Barang berhasil dihapus');
    }

    public function findByKode(string $kode)
    {
        $inventory = Inventory::where('kode_barang', $kode)->first();
        if (!$inventory) {
            return response()->json(['message' => 'Inventory not found'], 404);
        }
        return response()->json([
            'kode_barang' => $inventory->kode_barang,
            'nama_barang' => $inventory->nama_barang,
            'kategori' => $inventory->kategori,
            'status' => $inventory->status,
        ]);
    }
}
