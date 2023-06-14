<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Anas',
            'username' => 'anas',
            'email' => 'anas@laravel.com',
            'password' => bcrypt('12345678'),
            'roles' => 0, //menger
            'status' => true, // active
        ]);


        \App\Models\User::factory()->create([
            'name' => 'Osama',
            'username' => 'osama',
            'email' => 'osama@laravel.com',
            'password' => bcrypt('12345678'),
            'roles' => 0, //menger
            'status' => true, // active
        ]);
    }
}
