<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\JumpsellerApi;

class CategoriesController extends Controller
{
    public function getCategories(){
        $JumpsellerApi = new JumpsellerApi();
        $response = $JumpsellerApi->get('categories',[]);
        return response()->json($response, 200); 
    }
}
