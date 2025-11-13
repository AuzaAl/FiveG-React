<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $status = $request->query('status'); // 'active' | 'inactive'

        $query = Student::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nisn', 'like', "%{$search}%")
                    ->orWhere('nama_lengkap', 'like', "%{$search}%")
                    ->orWhere('tempat_lahir', 'like', "%{$search}%")
                    ->orWhere('alamat', 'like', "%{$search}%")
                    ->orWhere('jurusan', 'like', "%{$search}%")
                    ->orWhere('angkatan', 'like', "%{$search}%")
                    ->orWhere('no_hp', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('added_by', 'like', "%{$search}%");
            });
        }

        if ($status !== null && $status !== '') {
            $isActive = $status === 'active' ? 1 : 0;
            $query->where('is_active', $isActive);
        }

        $students = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('Student/Index', [
            'students' => $students,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Student/Create');
    }

    public function store(Request $request)
    {
        request()->validate([
            'nisn' => 'required|string|max:20|unique:students,nisn',
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string|max:255',
            'jurusan' => 'nullable|string|max:255',
            'angkatan' => 'nullable|integer',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:students,email',
            'added_by' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        Student::create([
            'nisn' => request('nisn'),
            'nama_lengkap' => request('nama_lengkap'),
            'tempat_lahir' => request('tempat_lahir'),
            'tanggal_lahir' => request('tanggal_lahir'),
            'alamat' => request('alamat'),
            'jurusan' => request('jurusan'),
            'angkatan' => request('angkatan'),
            'no_hp' => request('no_hp'),
            'email' => request('email'),
            'added_by' => request('added_by'),
            'is_active' => request('is_active') ?? 1,
        ]);

        return redirect()->route('dashboard.students.index')->with('message', 'Siswa berhasil ditambahkan');
    }

    public function show(Student $student)
    {
        return Inertia::render('Student/Show', [
            'student' => $student,
        ]);
    }

    public function edit(Student $student)
    {
        return Inertia::render('Student/Edit', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        request()->validate([
            'nisn' => 'required|string|max:20|unique:students,nisn,' . $student->id,
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string|max:255',
            'jurusan' => 'nullable|string|max:255',
            'angkatan' => 'nullable|integer',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:students,email,' . $student->id,
            'added_by' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        $student->update([
            'nisn' => request('nisn'),
            'nama_lengkap' => request('nama_lengkap'),
            'tempat_lahir' => request('tempat_lahir'),
            'tanggal_lahir' => request('tanggal_lahir'),
            'alamat' => request('alamat'),
            'jurusan' => request('jurusan'),
            'angkatan' => request('angkatan'),
            'no_hp' => request('no_hp'),
            'email' => request('email'),
            'added_by' => request('added_by'),
            'is_active' => request('is_active') ?? $student->is_active,
        ]);

        return redirect()->route('dashboard.students.index')->with('message', 'Siswa berhasil diperbarui');
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('dashboard.students.index')->with('message', 'Siswa berhasil dihapus');
    }

    public function findByNisn(string $nisn)
    {
        $student = Student::where('nisn', $nisn)->first();
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        return response()->json([
            'nisn' => $student->nisn,
            'nama_lengkap' => $student->nama_lengkap,
            'is_active' => (bool) $student->is_active,
        ]);
    }
}