<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Throwable;


class AuthController extends Controller
{

  
    public function login(Request $request){


            $request->validate([
                'rut'       => 'required|string',
                'password'    => 'required|string',

            ]);

            if (!Auth::attempt(['rut' => $request->rut, 'password' => $request->password])) {
                return response()->json([
                    'message' => 'Error de Credenciales',
                    'auth' => false
                ], 200);
            }
     
            $user = $request->user();
            if($user->rol == 'Cliente'){
                $user->cliente_id = $user->Cliente[0]->id;
            }else{
                $user->cliente_id = null;
            }
            //borrar token anterior 
            //$user->accessTokens()->delete();
            $tokenResult = $user->createToken('Personal Access Token');
    
            $token = $tokenResult->token;
           
            if ($request->remember_me) {
                $token->expires_at = Carbon::now()->addWeeks(1);
            }
            $token->save();

            return response()->json([
                'auth' => true,
                'user' => $user ,
                'coso' => $user->token(),
                'access_token' => $tokenResult->accessToken,
                'token_type'   => 'Bearer',
                'expires_at'   => Carbon::parse(
                    $tokenResult->token->expires_at
                )
                    ->toDateTimeString(),
                ],200);

      
    }

  
    public function logout(Request $request)
    {
       try {
        $request->user()->token()->revoke();
            return response()->json(['message' => 'Deslogeado Correctamente'],200);
       } catch (\Throwable $th) {
           return response()->json(['message' => $th->getMessage()],500);
       }
    }
}
