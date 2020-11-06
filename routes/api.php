<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function () {
    

    // DEJAR COMENTARIOS COMO CABECERA DE LAS RUTAS POR CADA MODULO. Para llevar orden by putazo.
    /**
     * 
     * Users 
     * 
     */
    Route::put('user/change-password','UserController@changePassword');
    //products
    Route::apiResource('product','ProductoController');
    Route::post('product/getPrice','ProductoController@getPrecio');
    Route::get('getProduct/{id}','ProductoController@getProducto');
    //categories
    Route::get('getCategories','CategoriesController@getCategories');
    //cotizaciones
    Route::apiResource('cotizacion','CotizacionController');
    Route::get('detalles/cotizacion/{id}', 'CotizacionController@getDetalles');
    Route::get('mis-cotizaciones','CotizacionController@misCotizaciones');
    //clientes
    Route::apiResource('cliente','ClienteController');
    Route::post('sendMail','CotizacionController@sendMail');
 
 
});

Route::post('login', 'AuthController@login')->name('login');
