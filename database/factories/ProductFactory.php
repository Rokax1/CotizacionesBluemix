<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use App\Producto;
use Faker\Generator as Faker;

$factory->define(Producto::Class, function (Faker $faker) {
    return [
        "codigo" => rand(1000,2000),
        "descripcion" => $faker->word,
        "precio_mayor" => rand(1000,2000),
        "marca" => $faker->word
    ];
});
