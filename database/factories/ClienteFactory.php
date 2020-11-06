<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Cliente;
use Faker\Generator as Faker;

$factory->define(Cliente::class, function (Faker $faker) {
    return [
        'razon_social' => $faker->name,
        'rut' => rand(100,4000), // password
         'user_id' => 1
    ];
});
