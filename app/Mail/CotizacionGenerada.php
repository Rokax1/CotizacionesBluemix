<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use App\Cliente;
use Illuminate\Queue\SerializesModels;

class CotizacionGenerada extends Mailable
{
    use Queueable, SerializesModels;
    public $cliente;
    public $pdf;
    public $tipo;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Cliente $cliente,$pdf,$tipo ='Admin')
    {
        $this->cliente = $cliente;
        $this->pdf = $pdf;
        $this->tipo;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $cliente = $this->cliente;
        $pdf = $this->pdf;
        if($tipo == 'Admin'){
            return $this->view('emails.emailCotizacionAdmin',compact('cliente'));
        }else{
            return $this->view('emails.emailCotizacion',compact('cliente'));
        }
        
    }
}
