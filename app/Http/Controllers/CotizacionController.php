<?php

namespace App\Http\Controllers;

use App\Cotizacion;
use App\DetalleCotizacion;
use App\Producto;
use App\Events\CotizacionAddEvent;
use Illuminate\Http\Request;
use Mail;
use App\JumpsellerApi;
use App\Mail\CotizacionGenerada;
use PDF;
use Auth;

class CotizacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cotizaciones = Cotizacion::RazonSocial($request->razon_social)->Numero($request->numero)->with('Detalles','Cliente')->get();    
        return response()->json($cotizaciones, 200);
    }

    public function misCotizaciones(Request $request){
        $user = Auth::User();
        $cotizaciones = $user->Cliente[0]->Cotizaciones;
        return response()->json($cotizaciones, 200);
    }
    public function test(){
        Mail::to('dyjps2012@gmail.com')->send(new CotizacionGenerada());
        return view('emails.emailCotizacion');
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
        try {
            $cotizacion = new Cotizacion();
            $cotizacion->fecha = now();
            $cotizacion->total = $request->tipo == 'IVA' ?  $request->total : $this->quitarIva($request->total);
            $cotizacion->tipo = $request->tipo;
            $cotizacion->iva = round($request->total * 0.19);
            $cotizacion->cliente_id = $request->cliente;
            $cotizacion->save();

            foreach($request->detalle['detalles'] as $detalle){
                $sin_stock = false;
                if($detalle['quantity'] >= $detalle['stock']){
                    $sin_stock = true;
                }
                $producto = Producto::Sku($detalle['sku'])->first();
                $det_cot = new DetalleCotizacion();
                $det_cot->producto_id = $producto->id;
                $det_cot->uid_jumpseller = $detalle['id'];
                $det_cot->sin_stock = $sin_stock;
                $det_cot->valor = $request->tipo == 'IVA' ?  $detalle['price'] : $this->quitarIva($detalle['price']);
                $det_cot->cantidad = $detalle['quantity'];
                $det_cot->cotizacion_id = $cotizacion->id;
                $det_cot->save();
            }
            event(new CotizacionAddEvent("El Cliente ".$cotizacion->Cliente->razon_social." a hecho una nueva cotización"));
            return response()->json(['created' =>  true, "pdf" => "/cotizacion/pdf/$cotizacion->id", "cliente" => $request->cliente, 'cotizacion' => $cotizacion->id], 201);
        } catch (\Throwable $th) {
            dd($th);
            return response()->json(['created' => false, "error" => $th->getMessage()], 500);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Cotizacion  $cotizacion
     * @return \Illuminate\Http\Response
     */
    public function show(Cotizacion $cotizacion)
    {  
        $pdf = PDF::loadView('pdfcotizacion.cotizacion',compact('cotizacion'));
        return $pdf->stream('cotizacion-bluemix.pdf');
        
    }

    public function showDetails(){
        
    }

    public function sendMail(Request $request){
        $cotizacion = Cotizacion::find($request->cotizacion);
        //Mail::to('dyjps2012@gmail.com')->send(new CotizacionGenerada($cotizacion->cliente,$pdf)); //email al administrador
        $pdf = PDF::loadView('pdfcotizacion.cotizacion',compact('cotizacion'));
        $pdf = $pdf->output();
        if($cotizacion->cliente->email){
            Mail::to($cotizacion->cliente->email)->send(new CotizacionGenerada($cotizacion->cliente,$pdf));
        }
    }

    public function getDetalles($id){
        $JumpsellerApi = new JumpsellerApi();
        $detalles = Cotizacion::find($id)->Detalles;
        $listadoStocks = collect();
        foreach($detalles as $detalle){
            if($detalle->sin_stock){
                $respuesta = $JumpsellerApi->get("products/$detalle->uid_jumpseller",[]);
                dd($respuesta);
                $detalle->stock = $respuesta[0]->product->stock;
                $listadoStocks->push($detalle);
            }
        }
        return response()->json($listadoStocks, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Cotizacion  $cotizacion
     * @return \Illuminate\Http\Response
     */
    public function edit(Cotizacion $cotizacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Cotizacion  $cotizacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cotizacion $cotizacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Cotizacion  $cotizacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cotizacion $cotizacion)
    {
        try {
            $cotizacion->delete();
            return response()->json(["message" => 'Eliminada Correctamente'], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => 'Ocurrio un error al eliminar,intente nuevamente'], 200);
        }
        
    }
    
    private function quitarIva($valor){
        $quitar = $valor * 0.19;
        $total = round($valor - $quitar);
        return $total;
    }

    private function getProducto($id){
        $JumpsellerApi = new JumpsellerApi();
        $respuesta = $JumpsellerApi->get("products/$id",[]);
        return $respuesta;
    }
}
