<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Cliente;
use App\Producto;
use App\User;
use Tests\TestCase;

class CotizacionsManagmentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testSaveCotizacionSuccessFully()
    {
        $user = factory(User::class)->create();
        $cliente = factory(Cliente::class)->create();
        $producto = factory(Producto::class)->create();
        $this->actingAs($user, 'api');
        $detalle = [
         "detalles" =>   [
                "0" => [
                    "price" => 2000,
                    "name" => "PRODUCTO DE PRUEBA",
                    "quantity" => 2,
                    "sku" => $producto->codigo,
                ],
                "1" => [
                    "price" => 2000,
                    "name" => "PRODUCTO DE PRUEBA2",
                    "quantity" => 2,
                    "sku" => $producto->codigo,
                ],
                "2" => [
                    "price" => 2000,
                    "name" => "PRODUCTO DE PRUEBA3",
                    "quantity" => 2,
                    "sku" => $producto->codigo,
                ]
            ]
        ];

        $cotizacion = [
            'total' => 200,
            'cliente' => $cliente->id,
            'detalle' => $detalle
        ];
        $this->json('POST', 'api/cotizacion', $cotizacion, ['Accept' => 'application/json'])
        ->assertStatus(201);
    }
}
