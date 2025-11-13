<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kode_barang' => $this->faker->unique()->numerify('#####'),
            'nama_barang' => $this->faker->words(2, true),
            'kategori' => $this->faker->randomElement(['Laptop', 'Projektor', 'Keyboard', 'Monitor']),
            'deskripsi' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['Tersedia', 'Dipinjam']),
            'lokasi_barang' => $this->faker->randomElement(['Ruang Guru PPLG']),
            'is_active' => 1,

        ];
    }
}
