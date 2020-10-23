<?php

namespace App;
use JMathai\PhpMultiCurl\MultiCurl;
class JumpsellerApi{

    protected $baseUri =  "https://api.jumpseller.com/v1/";
    protected $credentials = [
        "login" => '542be9ea3442c76231e0428e2ff39c2a',
        "authtoken" => '2778f682abfe2af64b289640be2e7ebb',
    ];

    public function get($urlConsulta,$parametrosAdicionales){
        $url = $this->baseUri.$urlConsulta;
        $parametros = array_merge($this->credentials,$parametrosAdicionales);
        $consulta = http_build_query($parametros);
        $ch = curl_init($url.".json?".$consulta);    
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET"); //get method
        $result = curl_exec($ch);
        $result = json_decode($result);
        return $result;
        curl_close($ch);
        
    }
    public function getMulti($urls,$param){
        $mc = MultiCurl::getInstance();
        $calls = [];
        for ($i=0; $i < count($urls) ; $i++) { 
            $url = $this->baseUri.$urls[$i];
            $parametros = array_merge($this->credentials,$param[$i]);
            $consulta = http_build_query($parametros);
            $ch = curl_init($url.".json?".$consulta);    
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET"); //get method
            $call = $mc->addCurl($ch);
            array_push($calls,$call);
        }
        $result = [];
        foreach ($calls as $call) {
            array_push($result,json_decode($call->response));
        }

        return $result;
       
    }
   
}