<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cotizacion extends Model
{
    public function Detalles(){
        return $this->hasMany('App\DetalleCotizacion')->with('Producto');
    }

    public function Cliente(){
        return $this->belongsTo('App\Cliente');
    }

    public function scopeNumero($query,$parametro){
        if($parametro)
            return $query->where('id','=',$parametro);
    }

    public function scopeRazonSocial($query,$parametro){
        if($parametro)
            return $query->whereHas('cliente', function($q) use ($parametro) {
                $q->RazonSocial($parametro);
            });
    }

    protected $casts = [
        'fecha' => 'datetime'
    ];
}
