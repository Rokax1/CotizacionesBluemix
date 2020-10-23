import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    TextField, Container, Grid, Typography, Paper
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import CartProductItem from "../components/cartProductItem";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

export function ShoppingCart() {
    const cart = useSelector(state => state.cart.products);

    return (
        <Container maxWidth="lg" style={{marginTop: '70px'}} >
            <Typography variant="h6" color="textPrimary" align="center">{cart.length > 0 ? 'Resumen de Selección' : 'No se han agregado Productos'}</Typography>
            { cart.length > 0 ? <Grid
            style={{marginTop: "10px"}}
              container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              wrap="nowrap"
              
            >
                <Grid item lg={10} component={Paper}>
                    <List>
                        { cart.map( product => <CartProductItem product={product} key={product.id}></CartProductItem> ) }
                    </List>
                </Grid>
              
            </Grid>
            : 
             <IconButton aria-label="">
                 <FolderOpenIcon></FolderOpenIcon>
             </IconButton>
            }
        </Container>
    );
}

export default ShoppingCart;
