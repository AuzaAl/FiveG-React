<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StudentFactory extends Factory
{
    protected $model = \App\Models\Student::class;

    public function definition(): array
    {
        $angkatan = $this->faker->numberBetween(1, 12);

        return [
            'nisn' => $this->faker->unique()->numerify('##########'), // 10 digits
            'nama_lengkap' => $this->faker->name(),
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->date('Y-m-d', '2008-01-01'), // contoh batasan
            'alamat' => $this->faker->address(),
            'jurusan' => $this->faker->randomElement(['PPLG','BCF','TO','ANIM']),
            'angkatan' => (string)$angkatan,
            'no_hp' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'added_by' => $this->faker->randomElement(['admin','guru','seeder']),
            'is_active' => $this->faker->boolean(90), // 90% active
        ];
    }

    // contoh state: student tidak aktif
    public function inactive()
    {
        return $this->state(fn(array $attributes) => ['is_active' => false]);
    }
}
