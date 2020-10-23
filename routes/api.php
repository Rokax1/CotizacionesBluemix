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
    //products
    Route::apiResource('product','ProductoController');
    Route::post('product/getPrice','ProductoController@getPrecio');
    //categories
    Route::get('getCategories','CategoriesController@getCategories');
 
 
 
});

Route::post('login', 'AuthController@login')->name('login');
