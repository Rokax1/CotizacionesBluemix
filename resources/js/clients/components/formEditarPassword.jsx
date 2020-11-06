import { Button, Grid, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateUserPassword } from '../services/clientService';

export default function FormEditarPassword(){
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({});
    const [errorPassword, setErrorPassword] = useState(false);
    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
        if(e.target.name == 'password_confirm'){
            e.target.value == formData.password  ? setErrorPassword(false) : setErrorPassword(true);
        }
        console.log(formData);
    }

    const UpdateClientData = async () => {
        if(formData.password != ''){
            const respuesta =  await UpdateUserPassword(formData);
            enqueueSnackbar(
                respuesta.data.message, { 
                variant: respuesta.data.updated ? 'success' : 'error' ,
            });
        }else{
            alert('debe escribir la contraseña actual')
        }
           
    }
    return (
        
            <div>
            
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                id="giro"
                label="Contraseña Actual"
                name="password_actual"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                name="password"
                id="fono"
                type="password"
                label="Nueva Contraseña"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                error={errorPassword}
                name="password_confirm"
                style={{marginBottom:'20px'}}
                id="email"
                label="Confirmar Contraseña"
                fullWidth
                type="password"
                margin="normal"
                helperText={errorPassword ? 'Las Contraseñas No Coinciden' : ''}
                variant="outlined"
                onChange={handleOnChange}
                onKeyUp={handleOnChange}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Button disabled={errorPassword} variant="outlined" color="primary" style={{margintTop: '20px'}} onClick={UpdateClientData}>
                    Cambiar Contraseña
                </Button>

            </Grid>
            </div>
       
    );
}