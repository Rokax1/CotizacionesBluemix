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
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Cliente $cliente,$pdf)
    {
        $this->cliente = $cliente;
        $this->pdf = $pdf;
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
        return $this->attachData($pdf,'Cotizacion.pdf',['mime' => 'aplication/pdf'])->view('emails.emailCotizacion',compact('cliente'));
    }
}
