<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;

class UserManagmentTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testUpdatePassword()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');
        $formData = [
         "formData" =>   [
                "password_actual" => 'password',
                "password" => 'Coso',
                "user" => $user->id
            ]
        ];
        $response = $this->json('PUT', 'api/user/change-password', $formData, ['Accept' => 'application/json'])
        ->assertStatus(200)->assertJson(
            [
                "updated" => true,
                "message" => "Actualizado Correctamente"
            ]
        );
    }

    public function testUpdatePasswordFail()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');
        $formData = [
                "password_actual" => 'asdasd',
                "password" => 'Coso',
                "user" => $user->id
        ];
        $response = $this->json('PUT', 'api/user/change-password', $formData, ['Accept' => 'application/json'])
        ->assertStatus(200)->assertJson(
            [
                "updated" => false,
                "message" => "Contraseña Invalida, Reintente"
            ]
        );
    }
}
