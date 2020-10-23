<?php

use Illuminate\Database\Seeder;
use App\User;
class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = "diego";
        $user->password = bcrypt('secret');
        $user->rut = '19.072.378-K';
        $user->rol = 'Cliente';
        $user->save();
    }
}
