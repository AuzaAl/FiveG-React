<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Inventory extends Model
{
    protected $table = 'inventories'; // Pastikan nama tabel sesuai migrasi
    use HasFactory;
    protected $fillable = [
        'kode_barang',
        'nama_barang',
        'kategori',
        'deskripsi',
        'status',
        'lokasi_barang',
        'is_active',
    ];
}
