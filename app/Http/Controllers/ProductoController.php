<?php

namespace App\Http\Controllers;

use App\Producto;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\JumpsellerApi;
class ProductoController extends Controller
{   
    
    public function index(Request $request)
    {   
        $JumpsellerApi = new JumpsellerApi();
        
        $params = [
            'page' => 1,
            'query' => '',
            'limit' => 21
        ];

        $page = $request->page ? $request->page : 1;
        $uri = $request->category == 'todas' ? "products" : "products/category/$request->category";
        if($request->querySearch != 'false'){
            $uri = "products/search";
            $params['query'] = $request->querySearch;
            $params['limit'] = 100;
        }
        $params['page'] = $page;
        
        $urls = [$uri, $uri.'/count']; //seteamos la url de consulta datos y contador
        $response = $JumpsellerApi->getMulti($urls,[ $params,[] ]); //enviamos las 2 peticiones
        $totalRegistros = $request->querySearch != "false" ? 1 : $response[1]->count;
        $nro_paginas = ceil($totalRegistros/21);
        $productos = $this->getPrecio($response[0]);
        $respuesta = [ 'productos' => $productos, 'paginas' => $nro_paginas ];
        return response()->json($respuesta, 200);
    }

    public function getPrecio($productos){
        
        foreach($productos as $producto){
            $producto = $producto->product;
            $pro = Producto::Sku($producto->sku)->first();
            if($pro){
                $producto->price = $pro->precio_mayor;
            }else{
                $producto->price = "No Encontrado";
            }
            foreach($producto->variants as $variante){
                if($variante){
                    $pro = Producto::Sku($variante->sku)->first();
                    if($pro){
                        $variante->price = $pro->precio_mayor;
                    }else{
                        $variante->price = "No Encontrado";
                    }
                }
            }
        }
        return $productos;
    }
   
}
