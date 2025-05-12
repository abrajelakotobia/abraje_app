<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'ADM',
            'email' => 'admin@gmail.com',
            'phone' => '0600000000',
            'password' => Hash::make('password'),
            'avatar' => 'default-avatar.png', // valeur par défaut si vide
            'utype' => 'ADM',
        ]);

        User::create([
            'name' => 'USR',
            'email' => 'user@gmail.com',
            'phone' => '0600000001',
            'password' => Hash::make('password'),
            'avatar' => 'default-avatar.png', // valeur par défaut si vide
            'utype' => 'USR',
        ]);
    }
}
