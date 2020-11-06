<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleCotizacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_cotizacions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('cantidad');
            $table->bigInteger('valor');
            $table->bigInteger('uid_jumpseller');
            $table->bigInteger('uid_variante')->nullable();
            $table->enum('tipo',['Producto','Variante']);
            $table->boolean('sin_stock');
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            $table->foreignId('cotizacion_id')->constrained('cotizacions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_cotizacions');
    }
}
