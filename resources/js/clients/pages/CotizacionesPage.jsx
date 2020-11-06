import { Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoaderComponent from '../../home/component/LoaderComponent';
import { getCotizacionesClienteAction } from '../../redux/clienteDucks';
import TablaCotizaciones from '../components/Cotizaciones';
import FormEditarPassword from '../components/formEditarPassword';
import Toolbar from '../components/listadoClientes/Toolbar';

export default function CotizacionesPage(){
    const dispatch = useDispatch();
    const cotizaciones = useSelector(state => state.cliente.cotizaciones);
    const loader = useSelector(state => state.cliente.loader_client_cotizaciones);
    console.log(cotizaciones);
    useEffect( () => {
        dispatch(getCotizacionesClienteAction());
    },[])
    return (
            <Container maxWidth="lg">
                
                <Grid container align="center" justify="center" style={{marginTop: '70px', marginBottom: '20px'}}>
                    <Grid item xs={11} sm={11} md={8} lg={8}>
                        <Typography variant="h6" color="initial" align="center">Cotizaciones Empresa</Typography>
                    </Grid>
                </Grid>
                <Divider></Divider>
                <Grid container align="center" justify="center" style={{marginTop: '40px', marginBottom: '70px'}} >
                    
                    <Grid item xs={11} sm={11} md={11} lg={11} component={Paper}>
                        { loader  ?  <LoaderComponent text="Cargando Cotizaciones"></LoaderComponent> : <TablaCotizaciones cotizaciones={cotizaciones}></TablaCotizaciones>}
                    </Grid>
                </Grid>
            </Container>
        
        
    );
}