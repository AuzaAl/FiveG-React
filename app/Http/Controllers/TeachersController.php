<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Teachers;
use Inertia\Inertia;

class TeachersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $status = $request->query('status'); // 'active' | 'inactive'

        $query = Teachers::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                    $q->where('nip', 'like', "%{$search}%")
                        ->orWhere('nama_lengkap', 'like', "%{$search}%")
                        ->orWhere('jabatan', 'like', "%{$search}%")
                        ->orWhere('alamat', 'like', "%{$search}%")
                        ->orWhere('no_hp', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '') {
            $isActive = $status === 'active' ? 1 : 0;
            $query->where('is_active', $isActive);
        }

        $teachers = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Teacher/Index', [
            'teachers' => $teachers,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Teacher/Create');
    }

    public function store(Request $request)
    {
        request()->validate([
            'nip' => 'required|string|max:255|unique:teachers,nip',
            'nama_lengkap' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:teachers,email',
            'is_active' => 'nullable|boolean',
        ]);

        Teachers::create([
            'nip' => request('nip'),
            'nama_lengkap' => request('nama_lengkap'),
            'jabatan' => request('jabatan'),
            'alamat' => request('alamat'),
            'no_hp' => request('no_hp'),
            'email' => request('email'),
            'is_active' => request('is_active') ?? 1,
        ]);

        return redirect()->route('dashboard.teachers.index')->with('message', 'Guru berhasil ditambahkan');
    }

    public function show(Teachers $teacher)
    {
        return Inertia::render('Teacher/Show', [
            'teacher' => $teacher,
        ]);
    }

    public function edit(Teachers $teacher)
    {
        return Inertia::render('Teacher/Edit', [
            'teacher' => $teacher,
        ]);
    }

    public function update(Request $request, Teachers $teacher)
    {
        request()->validate([
            'nip' => 'required|string|max:255|unique:teachers,nip,' . $teacher->id,
            'nama_lengkap' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'alamat' => 'nullable|string|max:255',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:teachers,email,' . $teacher->id,
            'is_active' => 'nullable|boolean',
        ]);

        $teacher->update([
            'nip' => request('nip'),
            'nama_lengkap' => request('nama_lengkap'),
            'jabatan' => request('jabatan'),
            'alamat' => request('alamat'),
            'no_hp' => request('no_hp'),
            'email' => request('email'),
            'is_active' => request('is_active') ?? $teacher->is_active,
        ]);

        return redirect()->route('dashboard.teachers.index')->with('message', 'Guru berhasil diperbarui');
    }

    public function destroy(Teachers $teacher)
    {
        $teacher->delete();
        return redirect()->route('dashboard.teachers.index')->with('message', 'Guru berhasil dihapus');
    }
}
