<?php

namespace App\Http\Controllers;

use App\Cliente;
use Mail;
use App\Mail\UserCreate;
use App\User;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $clientes = Cliente::Rut($request->rut)->RazonSocial($request->razon_social)->orderBy('id','DESC')->get();
        return response()->json($clientes, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'giro' => 'required',
            'razon_social' => 'required',
            'rut' => 'required|unique:clientes',
            'email' => 'required',
            'telefono' => 'required'
        ]);

        try {

            $password = rand(1000,10000);
            $user = new User();
            $user->name = $request->razon_social;
            $user->password = bcrypt($password);
            $user->rut = $request->rut;
            $user->rol = 'Cliente';
            $user->save();

            $cliente = new Cliente();
            $cliente->razon_social = $request->razon_social;
            $cliente->giro = $request->giro;
            $cliente->rut = $request->rut;
            $cliente->email = $request->email;
            $cliente->telefono = $request->telefono;
            $cliente->user_id = $user->id;
            $cliente->save();

            Mail::to('dyjps2012@gmail.com')->send(new UserCreate($cliente,$password));
            
            return response()->json(['created' =>  true, 'password' => $password], 200);
        } catch (\Throwable $th) {
            dd($th);
            return response()->json(['created' =>  false, 'message' => $th->getMessage()], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function show(Cliente $cliente)
    {
        return response()->json($cliente, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function edit(Cliente $cliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cliente $cliente)
    {
        try {
            $formData = $request->formData;
            $cliente->giro = isset($formData['giro']) ? $formData['giro'] : null;
            $cliente->telefono = isset($formData['telefono']) ? $formData['telefono'] : null;
            $cliente->email = isset($formData['email']) ? $formData['email'] : null;
            $cliente->update();
            return response()->json($cliente,200);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(),500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cliente $cliente)
    {
        $cliente->delete();
        return response()->json(['deleted' => true, 'message' => 'Eliminado Correctamente'], 200);
    }
}
