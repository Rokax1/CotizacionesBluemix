import React, {useState,useEffect} from 'react';
import { red } from '@material-ui/core/colors';
import { useConfirm } from 'material-ui-confirm';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import CircularProgress from '@material-ui/core/CircularProgress';
import {addCartProductAction,RemoveCartProductAction} from '../../redux/cartDucks';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Fade, Grow } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import AlertDialogSlide from './dialogVariant';
import { useSnackbar } from 'notistack';
import { NavLink } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      marginBottom: '10'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
      maxWidth:250,
      minHeight:150
    },
    cover: {
      width: 150,
      height:150
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
}));


export function CardProduct(props){  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {producto} = props;
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [icon, setIcon] = useState('cart');
  const cart = useSelector(store => store.cart.products);
  const cartProduct = cart.find(item => item.id === producto.id);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleClickOpenModal = () => {
    setOpen(true);
  };

  const agregarProductoCarro = (producto, isExist) => {
    dispatch(addCartProductAction(producto));
    const message = isExist ? 'Cantidad Actualizada, Total: ' + isExist.quantity : 'Producto Agregado Correctamente';
    enqueueSnackbar(message, { 
          variant: 'success',
    });
  }

  const handleAddToCart = () => {
        producto.image = producto.images[0];
        const isExist = cart.find( p => p.id === producto.id);
        if(isExist){
          if(isExist.quantity >= producto.stock){
            confirm({ description: 'la cantidad de productos que estas cotizando excede nuestro stock, Quieres cotizarlo de todas maneras ?' })
            .then(() => { 
                agregarProductoCarro(producto,isExist);
             })
            .catch(() => { 
              //;
             });
          }else{
              agregarProductoCarro(producto,isExist);
          }
        }else{
            if(producto.stock == 0){
              confirm({ description: 'la cantidad de productos que estas cotizando excede nuestro stock, Quieres cotizarlo de todas maneras ?' })
              .then(() => { 
                  agregarProductoCarro(producto,isExist);
              })
              .catch(() => { 
                //;
              });
            }else{
              agregarProductoCarro(producto,isExist);
            }

        }      
  }

  const handleRemoveToCart = () => {
    alert('¿ Está seguro que desea quitar el producto del carro ?');
    dispatch(RemoveCartProductAction(producto));
    comprobarCarro();
  }

  const showProductPrice = () => {
          return producto.price == 'No Encontrado'
          ?
          <IconButton aria-label="Ver Detalles" onClick={handleClickOpenModal}>
              <ListIcon></ListIcon>
          </IconButton>
          :
          <Typography variant="subtitle1" color="textPrimary" style={{marginLeft:10}}>
              { '$' + producto.price}
          </Typography> 
  }
  
  return (
    <div>
    <Grow in={true} style={{ transformOrigin: '0 0 0' }}>
    <Card className={classes.root} elevation={3}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle2">
            {producto.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {producto.sku}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          
          { icon == 'cart' ? 
          <IconButton aria-label="Agregar Al Carro" onClick={  producto.variants.length > 0 ?  handleClickOpenModal : handleAddToCart }>
               <Badge badgeContent={cartProduct ? cartProduct.quantity : 0 } color="secondary"><AddShoppingCartIcon ></AddShoppingCartIcon></Badge> 
          </IconButton> :
          <IconButton aria-label="Quitar del Carro" onClick={handleRemoveToCart}>
            <RemoveShoppingCartIcon style={{ color: red[500] }}></RemoveShoppingCartIcon>
          </IconButton>
        }
          <IconButton aria-label="Ver Detalles" component={NavLink} to={'/details/' + producto.id }>
                <VisibilityIcon></VisibilityIcon>
          </IconButton>
          {showProductPrice()}
          
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={producto.images[0].url}
        title={producto.name}
      />
    </Card>
    </Grow>
    { producto.variants.length > 0 ? <AlertDialogSlide open={open} handleClose={handleCloseModal} product={producto}></AlertDialogSlide> : ''}
    </div>
    
  );
   
}

export default CardProduct