import { Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoaderComponent from '../../component/LoaderComponent';
import TablaCotizaciones from '../../../clients/components/Cotizaciones';
import { filterCotizacion, getCotizacionesAdminAction } from '../../../redux/cotizacionDucks';
import Pusher from "pusher-js";
import { useSnackbar } from 'notistack';
import Toolbar from '../../../clients/components/listadoClientes/Toolbar';


const pusher = new Pusher("7baeddcbd7b3dae47a09", {
    cluster: "us2",
    encrypted: true
});
export const channel = pusher.subscribe("canal-cotizaciones");

export default function CotizacionesPageAdmin(){
    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar} = useSnackbar();
    const cotizaciones = useSelector(state => state.cotizaciones.cotizaciones);
    const loader = useSelector(state => state.cotizaciones.loader);
    const search = (tipo,parametro) => {
        dispatch(filterCotizacion(tipo,parametro));
    }
    const getCotizaciones = () => {
        dispatch(getCotizacionesAdminAction());
    }
    useEffect( () => {
        getCotizaciones();
        channel.bind("create-cotizacion", data => {
            console.log(data.message);
            getCotizaciones();
            enqueueSnackbar(data.message, { 
                variant: 'warning',
                autoHideDuration:10000
            });
        });
    },[])
    return (
            <Container maxWidth="lg">
                
                <Grid container align="center" justify="center" style={{marginTop: '70px', marginBottom: '20px'}}>
                    <Grid item xs={11} sm={11} md={8} lg={8}>
                        <Typography variant="h6" color="initial" align="center">Panel de Cotizaciones</Typography>
                    </Grid>
                </Grid>
                
                <Divider></Divider>
                <Grid container align="center" justify="center" style={{marginTop: '40px', marginBottom: '70px'}} >
                    <Grid item xs={11} sm={11} md={11} lg={11}>
                        <Toolbar placeholder="Buscar Cotización (Nº, Razón Social)" buttonEnabled={false} handleBusqueda={search}/>
                    </Grid>
                    <Grid item xs={11} sm={11} md={11} lg={11} component={Paper}>
                        { loader  ?  <LoaderComponent text="Cargando Cotizaciones"></LoaderComponent> : <TablaCotizaciones cotizaciones={cotizaciones}></TablaCotizaciones>}
                    </Grid>
                </Grid>
            </Container>
        
        
    );
}