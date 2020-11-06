import {
    ListItem,
    ListItemIcon,
    Box,
    IconButton,
    TextField,
    ListItemText,
    ListItemSecondaryAction,
    Avatar,
    ListItemAvatar, Grid, Divider
} from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { useConfirm } from 'material-ui-confirm';
import { RemoveCartProductAction, UpdateQuantityCartAction } from "../../redux/cartDucks";

const useStyles = makeStyles( theme => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    listItemText:{
        fontSize:'0.6em',//Insert your required size
    }
}))


export default function CartProductItem({product}){
    const classes = useStyles();
    const confirm = useConfirm();
    const dispatch = useDispatch();

    const handleClickRemove = () => {
        dispatch(RemoveCartProductAction(product));
    }

    const handleInputChange = (e) => {
        if(e.target.name == 'quantity'){
            if(e.target.value === 0){
                
            }else{
                product.quantity = e.target.value
                
            }

            if(product.quantity >= product.stock){
                confirm({ description: 'la cantidad de productos que estas cotizando excede nuestro stock, Quieres cotizarlo de todas maneras ?' })
                      .then(() => { 
                            dispatch(UpdateQuantityCartAction(product));
                       })
                      .catch(() => { 
                            
                       });
            }else{
                dispatch(UpdateQuantityCartAction(product));
            }
        }
    }

    return (
        <ListItem divider={true}>

            <Grid
              container
              spacing={2}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
            >
                 <Grid item lg={4} sm={12} xs={12}>
                        <ListItemText
                            className={classes.listItemText}
                            primary={product.name}
                            secondary={product.details}
                        ></ListItemText>
                </Grid>
                <Grid item lg={3} sm={5} xs={5}>
                        <ListItemIcon>
                            <Avatar alt={product.name} src={ product.image.url } variant="rounded" className={classes.large}></Avatar>
                        </ListItemIcon>
                </Grid>
                <Grid item lg={3} sm={4} xs={4}>
                        <TextField
                                id="outlined-basic"
                                defaultValue={product.quantity}
                                variant="outlined"
                                inputProps={{ min: "0", step: "1" }}
                                name="quantity"
                                type="number"
                                onChange={handleInputChange}
                                size="small"
                        />
                </Grid>
                <Grid item lg={2} sm={3} xs={3}>        
                        <ListItemSecondaryAction>
                            <IconButton onClick={handleClickRemove}>
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                        </ListItemSecondaryAction>
                </Grid>
              
            </Grid>
        </ListItem>
    );
}