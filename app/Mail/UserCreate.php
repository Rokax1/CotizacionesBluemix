<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use App\Cliente;
use Illuminate\Queue\SerializesModels;

class UserCreate extends Mailable
{
    use Queueable, SerializesModels;
    public $cliente;
    public $password;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Cliente $cliente,$password)
    {
        $this->cliente = $cliente;
        $this->password = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $password = $this->password;
        $cliente = $this->cliente;
        return $this->view('emails.userCreate',compact('cliente','password'));
    }
}
