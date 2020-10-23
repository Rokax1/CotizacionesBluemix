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

    const classes = useStyles();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.products);
    const {variante,product} = props;
    const img =  variante.image ?  variante.image : product.images[0];

    const handleVariantAddToCart = () => {
        product.quantity = 1;
        product.id = variante.id;
        product.details = variante.options[0].name + ": " + variante.options[0].value;
        product.image = img;
        product.price = variante.price;
        dispatch(addCartProductAction(product));
        const isExist = cart.find( p => p.id === product.id);
        const message = isExist ? 'Cantidad Actualizada, Total: ' + isExist.quantity : 'Producto Agregado Correctamente';
        enqueueSnackbar(message, { 
            variant: 'success',
        });
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