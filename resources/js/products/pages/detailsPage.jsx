import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Backdrop, Button, Chip, CircularProgress, TextField } from '@material-ui/core';
import SliderDetailVariant from '../components/sliderDetailVariant';
import AlertDialogSlide from '../components/dialogVariant';
import HomeClient from '../../clients/pages/HomeClient';
import { getProductAction,getProductsAction } from '../../redux/productDucks';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      fontSize: '16px',
      color: theme.palette.text.primary,
    },
    chipContainer:{
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
    },
    largeAvatar: {
        width: 300,
        height: 300,
    },
    container: {
        marginTop: 80,
    }
}));

export default function DetailsPage(){
   
  const classes = useStyles();
  const dispatch = useDispatch();
  let { id } = useParams();
  const producto = useSelector(state => state.productos.producto) ;
  const [open, setOpen] = useState(false);
  const [loader,setLoader] = useState(true);

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleClickOpenModal = () => {
    setOpen(true);
  };

  const getProduct = async () => {
    setLoader(true);
    await dispatch(getProductAction(id));
    setLoader(false);
  }

  const handleClickCategory = (category) => {
    dispatch(getProductsAction(category));
  }

  useEffect( () => {
      getProduct();
  },[id]);
  
  return (
    <div className={classes.container}>
    { loader ? <Backdrop className={classes.backdrop} open={loader}>
                <CircularProgress color="inherit" />
               </Backdrop> : 
    <Container component={Paper}>
      <Grid container spacing={3}>
       <Grid item xs={12} md={4}>
           <Box display="flex" justifyContent="center" alignItems="stretch" >
              <Avatar variant="square" src={producto.images[0].url} className={classes.largeAvatar} onClick={handleClickOpenModal}></Avatar>
           </Box>
        </Grid>
        <Grid item xs={12} md={8}>
              <Typography variant="h5" color="initial">{producto.name}</Typography>
              
              <Grid container>
                <Grid item xs={12}>
                      {parse(producto.description)}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textPrimary">SKU: {producto.sku}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" style={{color:'red'}} >PRECIO MAYORISTA: ${producto.price}</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12} className={classes.chipContainer}>
                    {producto.categories.map( cat => {
                        return <Chip variant="outlined" onClick={ () => handleClickCategory(cat.id)} key={cat.id} avatar={<Avatar>{cat.name.charAt(0)}</Avatar>} label={cat.name} color="primary"/>
                    })}
                </Grid>
                <Grid item xs={12} md={12} lg={12} style={{marginTop:'20px'}}>
                    <Box display="flex" justifyContent="flex-start">
                { producto.variants.length > 0 ?  
                  
                    
                        <Button color="primary" variant="outlined" onClick={handleClickOpenModal}>Ver Variedades</Button> 
                    
                  
                  : ''}
                  
                    <TextField
                      style={{marginLeft : '10px'}}
                      type="number"
                        label="Cantidad"
                        placeholder="Cantidad"
                        id="outlined-size-small"
                        defaultValue="adsa"
                        variant="outlined"
                        size="small"
                      />
                      <Button color="primary" variant="contained" style={{marginLeft : '5px'}} onClick={handleClickOpenModal}>Añadir al Carro</Button>
                    
                  
                  </Box>
             </Grid>
        </Grid>
      </Grid>
      </Grid>
      <HomeClient></HomeClient>
      { producto.variants.length > 0 ? <AlertDialogSlide open={open} handleClose={handleCloseModal} product={producto}></AlertDialogSlide> : ''}
    </Container>

    }

    </div>
  );
}