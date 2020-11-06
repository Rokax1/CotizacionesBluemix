import { Box, Button, Grid, List, Paper, Typography } from '@material-ui/core';
import React from 'react';
import CartProductItem from '../components/cartProductItem';

export default function CartPage({cart,total}){



    return (
        <div>
        <Grid container spacing={3}  direction="row" style={{marginTop:'10px'}}
        >
            <Grid item lg={12} xs={12} component={Paper}>
            
                {
                    cart.length <= 0 ? 

                    <Typography variant="h6" color="textPrimary" align="center">{cart.length > 0 ? 'Resumen de Selección' : 'No se han agregado Productos'}</Typography>
                    :
                    <div>
                    <List>
                        { cart.map( product => <CartProductItem product={product} key={product.id}></CartProductItem> ) }
                    </List>
                    </div>
                }

                        
            </Grid>
        </Grid>
        { cart.length > 0 ? <Grid container spacing={3}   direction="row"
        >
               <Grid item lg={12} xs={12} component={Paper}>
                   <Box display="flex" flexDirection="row-reverse">
                       <Typography variant="h6" color="initial">Total: ${new Number(total).toLocaleString('es-CL')}</Typography>
                   </Box>
               </Grid>
        </Grid>:'' }
       </div>
    );
}