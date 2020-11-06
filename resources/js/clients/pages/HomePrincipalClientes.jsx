import React, { useEffect, useState } from 'react';
import { getProductosDestacados } from '../../redux/productDucks';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import LoaderComponent from '../../home/component/LoaderComponent';
import CardProduct from '../../products/components/cardProduct';
import { Container, Grid } from '@material-ui/core';
import CarruselHome from '../../home/component/carruselHome';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 48,
    }
}))

export default function HomePrincipalCliente(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const [loader,setLoader]  = useState(true);
    const products = useSelector(store => store.productos.productosDestacados);

    const consultarProductosDestacados = async () => {

        if(products.length == 0){
            setLoader(true);
            await dispatch(getProductosDestacados());
            setLoader(false);
        }
    }
    useEffect( () => {
        consultarProductosDestacados();
    },[]);

    return (
        <Container maxWidth="lg">
          
          <Grid container className={classes.container} spacing={4}
            align="center"
            justify="center">
            <Grid item lg={12}>
                <CarruselHome></CarruselHome>
            </Grid>
            { loader ? <LoaderComponent text="Cargando Productos Destacados ..."></LoaderComponent>    : products.map((product,index) => (
                        <Grid item lg={4} md={4} sm={12} key={index}>
                            <CardProduct producto={product.product}></CardProduct>
                        </Grid>
            ))}
            </Grid>
        </Container>
    );
}