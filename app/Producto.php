<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    public function scopeSku($query,$sku){
        return $query->where('codigo',$sku);
    }
}
