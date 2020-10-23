<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;
use App\Producto;
use Laravel\Passport\Passport;

class ProductoManagmentTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_get_precio()
    {
        $user = factory(User::class)->create();
        $producto1 = factory(Producto::class)->create();
        $producto2 = factory(Producto::class)->create();
        $this->actingAs($user, 'api');
        $products = [
           "products" => [ 
            [
                'codigo' => $producto1->codigo,
            ],
            [
                'codigo' => $producto2->codigo,
            ],
            [
                'codigo' => '00000'
            ]
           ]
        ];
        $response = $this->postJson('api/product/getPrice',$products,['Accept' => 'application/json']);
        $response->assertStatus(200);
        $response->assertJson([
            'products' => 
            [
                "0" => [
                    'codigo' => $producto1->codigo,
                    'precio' => $producto1->precio_mayor
                ],
                "1" => [
                    'codigo' => $producto2->codigo,
                    'precio' => $producto2->precio_mayor
                ],
                "2" => [
                    'codigo' => '00000',
                    'precio' => 'not found'
                ]
            ]
        ]);
        
    }
}
