<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Teachers extends Model
{
    protected $table = 'teachers'; // Pastikan nama tabel sesuai migrasi
    use HasFactory;
    protected $fillable = [
        'nip',
        'nama_lengkap',
        'jabatan',
        'alamat',
        'no_hp',
        'email',
        'is_active'
    ];
}
