import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Toolbar from '../components/listadoClientes/Toolbar';
import ClienteIndividual from '../components/listadoClientes/clienteIndividual';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClientesAction } from '../../redux/clienteDucks';
import AlertaCliente from '../components/alertaCliente';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [clientesFiltro,setClientes] = useState(0);
  const [contraseña, setContraseña] = useState(false);
  const clientes = useSelector(state => state.cliente.clientes);

  const getClients = () => {
    dispatch(getClientesAction());
  }

  const handleBusqueda = (parametro) => {
    //aca va la logica de busqueda.
  }

  useEffect( () => {
    getClients();
  },[]);

  return (
      <Container maxWidth={false}>
        <Box style={{marginTop : "60px"}}>
          <Toolbar setContraseña={setContraseña} placeholder="Buscar Cliente (Rut,Razón Social)" handleBusqueda={handleBusqueda} buttonLabel="Crear Cliente" buttonEnabled={true}/>
        </Box>
        {contraseña ? <AlertaCliente message={'Cliente Guardado Con Éxito, Contraseña Temporal: ' + contraseña}></AlertaCliente> : ''}
        <Box mt={3}>
          { clientes.length > 0 ?  <ClienteIndividual clientes={clientesFiltro != 0 ? clientesFiltro :  clientes} /> : ''}
        </Box>
      </Container>
  );
};

export default CustomerListView;