import { TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import * as EmailValidator from 'email-validator';
import { useDispatch } from 'react-redux';
import { UpdateClientDataAction,getClientesAction } from '../../redux/clienteDucks';
import { useSnackbar } from 'notistack';
import { validate, clean, format } from "rut.js";

const useStyles = makeStyles(theme => (
    {
        textField: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        width: '35ch',
        },
    }
))

export default function FormEditCliente({cliente,handleClose}){
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({giro: cliente.giro,telefono:cliente.telefono,email : cliente.email});
    const [errorMail, setErrorMail] = useState(false);
    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
        if(e.target.name == 'email'){
            EmailValidator.validate(e.target.value) ? setErrorMail(false) : setErrorMail(true);
        }
        console.log(formData);
    }

    const UpdateClientData = async () => {
        if(errorMail){
            alert('Porfavor, verifique el email');
        }else{
            const coso = await dispatch(UpdateClientDataAction(cliente.id,formData));
            enqueueSnackbar(
                'Actualizado Correctamente', { 
                variant: 'success',
            });
            dispatch(getClientesAction());
            handleClose();
        }
    }
    return (
        
            <div>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <TextField
                disabled
                id="razon_social"
                label="Razón Social"
                placeholder={cliente.razon_social}
                value={cliente.razon_social}
                fullWidth
                margin="normal"
                variant="outlined"
                
                />
            </Grid>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <TextField
                disabled
                id="rut"
                label="RUT"
                placeholder={cliente.rut}
                value={format(cliente.rut)}
                fullWidth
                margin="normal"
                variant="outlined"
                />
            </Grid>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <TextField
                
                id="giro"
                label="Giro"
                name="giro"
                placeholder={cliente.giro}
                defaultValue={cliente.giro}
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                />
            </Grid>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <TextField
                name="telefono"
                id="fono"
                label="Fono"
                placeholder={cliente.telefono}
                defaultValue={cliente.telefono}
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                />
            </Grid>
            <Grid item xs={10} sm={10} md={12} lg={12}>
                <TextField
                error={errorMail}
                name="email"
                style={{marginBottom:'20px'}}
                id="email"
                label="Email"
                placeholder={cliente.email}
                defaultValue={cliente.email}
                fullWidth
                margin="normal"
                helperText={errorMail ? 'Debe ser un email valido' : ''}
                variant="outlined"
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                />
            </Grid>

            <Grid item xs={10} sm={10} md={12} lg={12}>
                <Button variant="outlined" color="primary" style={{margintTop: '20px'}} onClick={UpdateClientData}>
                    Guardar Cambios
                </Button>

            </Grid>
            </div>
       
    );
}