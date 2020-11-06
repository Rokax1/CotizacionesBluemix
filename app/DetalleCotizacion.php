<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleCotizacion extends Model
{
    public function Producto(){
        return $this->BelongsTo('App\Producto');
    }
}
