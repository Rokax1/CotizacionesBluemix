import React from 'react';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import { Chip } from '@material-ui/core';

export default function ChipEstado({estado}){

    const pendiente = {
        color : 'black',
        background : yellow['A700']
    };

    const terminada = {
        color : 'white',
        background : grey[900]
    };

    const rechazada = {
        color : 'white',
        background : red[700]
    };

    const aprobada = {
        color : 'white',
        background : green[700]
    };



    const getColor = () =>{
        switch (estado) {
            case 'Pendiente':
                return pendiente;
                break;
            case 'Terminada':
                return terminada;
                break;
            case 'Rechazada':
                return rechazada;
                break;
            case 'Aprobada':
                return aprobada;
                break;
        
            default:
                break;
        }
    };
    
    return (
        <Chip
            style={{backgroundColor: getColor().background, color: getColor().color }}
            label={estado}
            size="small"
        />
    )
}