import { Container, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import FormEditarPassword from '../components/formEditarPassword';

export default function PasswordChangePage(){
    return (
            <Container maxWidth="lg">
                <Grid container align="center" justify="center" style={{marginTop: '70px', marginBottom: '20px'}}>
                    <Grid item xs={11} sm={11} md={8} lg={8}>
                        <Typography variant="h6" color="initial" align="center">Cambio de Contraseña</Typography>
                    </Grid>
                </Grid>
                <Divider></Divider>
                <Grid container align="center" justify="center" style={{marginTop: '40px', marginBottom: '70px'}} >
                    <Grid item xs={11} sm={11} md={8} lg={8}>
                        <FormEditarPassword></FormEditarPassword>
                    </Grid>
                </Grid>
            </Container>
        
        
    );
}

