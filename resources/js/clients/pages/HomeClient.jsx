import { makeStyles } from '@material-ui/styles';
import {useParams} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid'
import { Container,Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import {getProductsApi} from '../../services/apiProductsServices';
import CardProduct from '../../products/components/cardProduct';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getProductsAction } from '../../redux/productDucks';
import LoaderComponent from '../../home/component/LoaderComponent';
import CarruselHome from '../../home/component/carruselHome';



const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 48,
    }
}))

export function HomeClient(){
    let { category } = useParams();
    const classes = useStyles();
    const loader = useSelector(store => store.productos.loaderProductos);
    const page = useSelector(store => store.productos.page);
    const paginas = useSelector(store => store.productos.paginas);
    const dispatch = useDispatch();
    const products = useSelector(store => store.productos.productos);

    const handleChangePage = (event,value) => {
        dispatch(getProductsAction(null,value));
    }


    useEffect( () => {
        if(products.length == 0){
            if(category){
                dispatch(getProductsAction(category));
               
            }else{
                dispatch(getProductsAction('todas'));
            }
        }
    },[]);

    return (
       <Container maxWidth="lg">
          
          <Grid container className={classes.container} spacing={4}
            align="center"
            justify="center">
            { loader ? <LoaderComponent text="Cargando Productos ..."></LoaderComponent>    : products.map((product,index) => (
                        <Grid item lg={4} md={4} sm={12} key={index}>
                            <CardProduct producto={product.product}></CardProduct>
                        </Grid>
            ))}
            
          </Grid>
         { loader ? '' :   <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '30px'
            }}>
                <Pagination page={page} count={paginas} color="primary" size="small" onChange={handleChangePage}/>

            </div> 
         }
       </Container>
    );
}

export default HomeClient