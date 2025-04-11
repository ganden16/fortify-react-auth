<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        collect([
            ['name' => 'kategori1'],
            ['name' => 'kategori2'],
            ['name' => 'kategori3'],
            ['name' => 'kategori4'],
        ])->each(fn ($data) => Category::create($data));

        collect([
            ['name' => 'admin'],
            ['name' => 'user'],
        ])->each(fn ($data) => Role::create($data));

        User::factory(10)->has(Product::factory(5))->create();

        User::factory()->has(Product::factory(5))->create([
            'name' => 'Achmad Alvin Ardiansyah',
            'email' => 'alvindian85@gmail.com',
            'email_verified_at' => now(),
            'role_id' => 1,
            'gender' => 0,
        ]);
        User::factory()->has(Product::factory(5))->create([
            'name' => 'Ganden Ardiansyah',
            'email' => 'user@gmail.com',
            'email_verified_at' => now(),
            'role_id' => 2,
            'gender' => 0,
        ]);
        User::factory()->has(Product::factory(5))->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'role_id' => 1,
            'gender' => 0,
        ]);

        User::factory()->has(Product::factory(5))->create([
            'name' => 'Joko Widodo',
            'email' => 'alvindian58@gmail.com',
            'role_id' => 2,
            'gender' => 0,
        ]);
    }
}
