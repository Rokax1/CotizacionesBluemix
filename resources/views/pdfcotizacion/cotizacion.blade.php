<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Cotización</title>

<style type="text/css">
    @page {
            margin-top: 2cm;
            margin-left: 2cm;
            margin-right: 2cm;
            margin-bottom: 2cm;
    }
    * {
        font-family: Verdana, Arial, sans-serif;
    }
    table{
        font-size: small;
    }
    tfoot tr td{
        font-weight: bold;
        font-size: small;
    }
    .gray {
        background-color:  #3b5998;
    }

    .blue {
        background-color:  blue;
        color:white;
    }

    
</style>

</head>
<body>

  <table width="100%">
    <tr>
        <td valign="top"><img src="http://cotizaciones-bluemix.test/images/bluemix.png" alt="" width="120"/></td>
        <td valign="top" align="center">
            <h3>Cotización Blue Mix Web</h3>
        </td>
        <td valign="top" align="left">
          <h3>Nº: {{$cotizacion->id}}</h3>
      </td>
    </tr>
    <tr>
      <td width="100" style="margin-top:20px"><strong></strong></td>
    </tr>

  </table>
  <br>
  <table width="100%" style="font-size: 12px">
    <tr>
        <td><strong>Sr(a)(es): </strong> {{$cotizacion->Cliente->razon_social}} </td>
        <td><strong>Ciudad:</strong> {{$cotizacion->Cliente->ciudad}}</td>
        
        
    </tr>

  <tr>
    <td> <strong>Dirección:</strong> {{$cotizacion->Cliente->direccion}}</td>
    <td> <strong>Vendedor: </strong> SIN ASIGNAR </td>
  </tr>
  <tr>
    <td> <strong>Rut: </strong>  {{$cotizacion->Cliente->rut}} </td>
    <td> <strong>Fecha Cotiz.: </strong> {{$cotizacion->fecha->format('d-m-Y')}}</td>
  </tr>
  <tr>
    <td> <strong>Giro:</strong> {{$cotizacion->Cliente->giro ? $cotizacion->Cliente->giro : 'NO ESPECIFICADO'}}</td>
    <td> <strong>Hora: </strong> {{$cotizacion->fecha->format('H:i')}} </td>
  </tr>
  <tr>
    <td> <strong>Fono: </strong>  {{$cotizacion->Cliente->telefono}} </td>
    <td> <strong>Contacto Blue Mix.: </strong> ventas@bluemix.cl</td>
  </tr>
  <tr>
    <td> <strong></strong> </td>
    <td> <strong>Tipo: </strong> {{$cotizacion->tipo}}</td>
  </tr>

  </table>

  <br/>

  <table width="100%">
    <thead style="background-color: blue; color:white;">
      <tr style=" font-size: 12px">
        <th>Código</th>
        <th style="width: 350px">Detalle</th>
        <th>Marca</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody style="border-bottom: 1px solid black;, font-size: 10px">
      @foreach ($cotizacion->Detalles as $detalle)
        @if ($detalle->cantidad > 0)
        <tr style=" font-size: 12px">
          <td scope="row" valign="top" align="center">{{$detalle->Producto->codigo}}</td>
            <td>{{ $detalle->Producto->descripcion }}</td>
            <td valign="top" align="center">{{$detalle->Producto->marca}}</td>
            <td valign="top" align="center">{{$detalle->cantidad}}</td>
          <td valign="top" align="center">@money($detalle->valor)</td>
          
          <td valign="top" align="center">@money($detalle->valor * $detalle->cantidad)</td>
        </tr>  
        @endif
      @endforeach
    </tbody>
    <tfoot>
        <tr style=" font-size: 12px">
            <td colspan="5" align="left">Items: {{count($cotizacion->Detalles)}}</td>
            <td align="center">@money($cotizacion->total)</td>
        </tr>
    </tfoot>
  </table> <br>
  <table style="width:100%">
    <tr style=" font-size: 12px"><td style="text-align: center"><Strong>{{ $cotizacion->tipo == 'IVA' ? 'I.V.A. Incuido, válida por 15 días' : 'Valores Neto, válida por 15 días' }}</Strong></td> </tr> <br><br> 
  </table>
  <table width="100%" style="z-index:2">
    <tr>
        <td valign="bottom"  align="center"><img src="{{asset('images/firma.png')}}" alt="" width="200"/></td>
    </tr>
  </table>
</body>
</html>