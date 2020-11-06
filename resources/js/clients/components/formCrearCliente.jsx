import { TextField, Grid, Button, Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { validate, clean, format } from "rut.js";
import { CreateClient } from '../services/clientService';
import { getClientesAction } from '../../redux/clienteDucks';

const useStyles = makeStyles(theme => (
    {
        textField: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        width: '35ch',
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }
))

export default function FormCrearCliente({handleClose,setContraseña}){
    const classes = useStyles();
    
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [error,setError] =  useState([]);
    const [formData,setFormData] = useState({});
    const [openBackDrop,setopenBackDrop] = useState(false);
    const [errorMail, setErrorMail] = useState(false);
    const handleOnChange = (e) => {
        if(e.target.name == 'rut'){
            format(e.target.value);
        }
        setFormData({...formData, [e.target.name] : e.target.value})
        if(e.target.name == 'email'){
            EmailValidator.validate(e.target.value) ? setErrorMail(false) : setErrorMail(true);
        }
        console.log(formData);
    }

    const CrearCliente = async () => {
        if(errorMail){
            alert('Porfavor, verifique el email');
        }else{
            setopenBackDrop(true);
            const response = await CreateClient(formData);
            if(response.created){
                setContraseña(response.contraseña);
                enqueueSnackbar(
                    'Cliente Registrado Correctamente', { 
                    variant: 'success',
                });
                dispatch(getClientesAction());
                handleClose();
            }else{
                enqueueSnackbar(
                    'Error al registrar el cliente', { 
                        variant: 'error',
                });
                setError(response.error);  
            }
            setopenBackDrop(false);
        }
    }
    return (
        
            <div>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <TextField
                error={error.razon_social ? true : false}
                helperText={error.razon_social ? error.razon_social : ''}
                name="razon_social"
                id="razon_social"
                label="Razón Social"
                placeholder="Razón Social"
                fullWidth
                margin="normal"
                variant="outlined"
                
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                />
            </Grid>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <TextField
                name="rut"
                id="rut"
                error={error.rut ? true : false}
                helperText={error.rut ? error.rut : ''}
                label="RUT"
                placeholder="Rut"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                />
            </Grid>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <TextField
                error={error.giro ? true : false}
                helperText={error.giro ? error.giro : ''}
                name="giro"
                id="giro"
                label="Giro"
                name="giro"
                placeholder="Giro"
                
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                />
            </Grid>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <TextField
                error={error.telefono ? true : false}
                name="telefono"
                id="fono"
                label="Fono"
                placeholder="Teléfono"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                helperText={error.telefono ? error.telefono : ''}
                />
            </Grid>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <TextField
                error={errorMail}
                name="email"
                style={{marginBottom:'20px'}}
                id="email"
                label="Email"
                placeholder="Email"
                fullWidth
                margin="normal"
                helperText={errorMail ? 'Debe ser un email valido' : ''}
                variant="outlined"
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                />
            </Grid>

            <Grid item xs={10} sm={10} md={12} lg={12}>
                <Button type="submit" variant="outlined" color="primary" style={{margintTop: '20px'}} onClick={CrearCliente}>
                    Guardar Cliente
                </Button>
            </Grid>
            <Backdrop className={classes.backdrop} open={openBackDrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            </div>
       
    );
}