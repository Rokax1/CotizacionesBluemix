<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    public function Cotizaciones(){
        return $this->hasMany('App\Cotizacion')->with('Detalles');
    }

    public function scopeRazonSocial($query,$parametro){
        if($parametro)
            return $query->where('razon_social','like',"%$parametro%");
    }

    public function scopeRut($query,$parametro){
        if($parametro)
            return $query->where('rut','=',$parametro);
    }
}
