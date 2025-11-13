<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        // 1 sample specific (seperti yang kamu punya)
        Student::factory()->create([
            'nisn' => '1234567890',
            'nama_lengkap' => 'Test Student',
            'tempat_lahir' => 'Jakarta',
            'tanggal_lahir' => '2000-01-01',
            'alamat' => 'Jalan Jalan No. 1',
            'jurusan' => 'SMP',
            'angkatan' => '12',
            'no_hp' => '081234567890',
            'email' => 'test@student.example.com',
            'added_by' => 'admin',
            'is_active' => 1,
        ]);

        // 10 random students
        Student::factory()->count(10)->create();

        // contoh membuat 5 inactive
        Student::factory()->count(5)->inactive()->create();
    }
}
