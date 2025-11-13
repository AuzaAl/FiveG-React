<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Student extends Model
{
    protected $table = 'students'; // Pastikan nama tabel sesuai migrasi
    use HasFactory;
    protected $fillable = [
        'nisn',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'alamat',
        'jurusan',
        'angkatan',
        'no_hp',
        'email',
        'added_by',
        'is_active',
    ];
}