import {
    ListItem,
    ListItemIcon,
    Box,
    IconButton,
    TextField,
    ListItemText,
    ListItemSecondaryAction,
    Avatar,
    ListItemAvatar, Divider
} from "@material-ui/core";
import React from "react";
import { useConfirm } from 'material-ui-confirm';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import {addCartProductAction} from '../../redux/cartDucks';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    itemText:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    }
}));

export default function VariantItemComponent(props){

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const confirm = useConfirm();
    const classes = useStyles();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.products);
    const {variante,product} = props;
    const img =  variante.image ?  variante.image : product.images[0];
    const agregarProductoCarro = (producto,isExist) => {
        console.log(producto)
        dispatch(addCartProductAction(producto));
        const message = isExist ? 'Cantidad Actualizada, Total: ' + isExist.quantity : 'Producto Agregado Correctamente';
        enqueueSnackbar(message, { 
            variant: 'success',
        });
    }
    const handleVariantAddToCart = () => {
        const producto = {...product};
        const producto_id = product.id;
        producto.quantity = 1;
        producto.producto_id = producto_id;
        producto.id = variante.id;
        producto.stock = variante.stock;
        producto.details = variante.options[0].name + ": " + variante.options[0].value;
        producto.sku = variante.sku;
        producto.tipo = 'Variante';
        producto.image = img;
        producto.price = variante.price;
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

    return (
        <div>
            <ListItem >
                <ListItemIcon>
                    <Box display="flex" alignItems="center">
                        <Avatar alt={variante.nombre} src={ img.url } variant="rounded" className={classes.large}>{variante.options[0].value.charAt(0)}</Avatar>
                    </Box>
                </ListItemIcon>
                <ListItemText
                    className={classes.itemText}
                    primary={variante.options[0].name}
                    secondary={variante.options[0].value + "/ $" + variante.price }
                ></ListItemText>
                <ListItemSecondaryAction>
                    <IconButton onClick={handleVariantAddToCart}>
                        <AddShoppingCartIcon></AddShoppingCartIcon>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="middle"/>
        </div>
    );
}