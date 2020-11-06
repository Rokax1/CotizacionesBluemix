import { Avatar, Button, Grid, Paper, Typography, Box,CircularProgress, ListItemSecondaryAction, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ApartmentIcon from '@material-ui/icons/Apartment';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import RateReviewIcon from '@material-ui/icons/RateReview';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClientDataAction } from '../../redux/clienteDucks';
import { HANDLE_OPEN_DIALOG_CLIENT_EDIT } from '../../redux/types';
import { validate, clean, format } from "rut.js";
import { ChangeTipoCotizacion } from '../../redux/cartDucks';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default function ConfirmPage({count_productos,total}){

    const classes = useStyles();
    const dispatch = useDispatch();
    const tipo = useSelector(state => state.cart.tipo_cotizacion);
    const cliente = useSelector(state => state.cliente.cliente);
    const loader = useSelector(state => state.cliente.loader);
    const stateStoreDialogEditClient = useSelector(
        state => state.globalActions.openDialogEditClient
    );
    const getCliente = () => {
        dispatch(getClientDataAction());
    };

    const handleDrawerOpenCategories = () => {
        dispatch({ type: HANDLE_OPEN_DIALOG_CLIENT_EDIT, value: !stateStoreDialogEditClient });
    };
    
    const handleOnCheck = (e) => {
        dispatch(ChangeTipoCotizacion(e.target.value));
    }

    useEffect( () => {
        getCliente();
    },[])

    return (
        <div>
        <Grid item lg={12} xs={12} component={Paper}>
                    <List className={classes.root} style={{marginBottom: '20px'}}>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <ApartmentIcon />
                            </Avatar>
                            </ListItemAvatar>
                          {loader ? <CircularProgress color="secondary" /> : <ListItemText primary="Nombre" secondary={cliente.razon_social} />}  
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <WorkIcon />
                            </Avatar>
                            </ListItemAvatar>
                            {loader ? <CircularProgress color="secondary" /> :  <ListItemText primary="RUT" secondary={ format(cliente.rut)} /> }
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <EmailIcon />
                            </Avatar>
                            </ListItemAvatar>
                            {loader ? <CircularProgress color="secondary" /> :<ListItemText primary="EMAIL" secondary={cliente.email ? cliente.email : 'No Definido'} />}
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <PhoneIphoneIcon />
                            </Avatar>
                            </ListItemAvatar>
                            {loader ? <CircularProgress color="secondary" /> :<ListItemText primary="TELÉFONO" secondary={cliente.telefono ? cliente.telefono : 'Sin Definir'} />}
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <ShoppingCartIcon />
                            </Avatar>
                            </ListItemAvatar>
                           <ListItemText primary="Nº Productos" secondary={count_productos} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <AttachMoneyIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Total Cotización" secondary={"$" + total} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Avatar>
                                <RateReviewIcon />
                            </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Tipo Cotizacion" secondary={tipo} />
                        </ListItem>
                    </List>
                    
        </Grid>
        <Grid item xs={12}>
            
            <Grid container>
                <Grid item xs={12}>
                    <Button variant="text" color="primary" variant="contained" onClick={handleDrawerOpenCategories}>
                        Actualizar Datos
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <FormControl component="fieldset">
                            <RadioGroup row aria-label="position" name="position">
                                                <FormControlLabel
                                                onClick={handleOnCheck}
                                                checked={tipo == 'IVA'}
                                                value="IVA"
                                                control={<Radio color="primary" />}
                                                label="I.V.A. INCLUIDO"
                                                labelPlacement="start"
                                                />
                                                <FormControlLabel
                                                value="NETO"
                                                checked={tipo == 'NETO'}
                                                onClick={handleOnCheck}
                                                control={<Radio color="primary"/>}
                                                label="NETO"
                                                labelPlacement="start"
                                                />
                        
                            </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
        
        </div>
    );
}