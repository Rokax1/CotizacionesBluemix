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
                                value={product.quantity}
                                variant="outlined"
                                type="number"
                                size="small"
                        />
                </Grid>
                <Grid item lg={2} sm={3} xs={3}>        
                        <ListItemSecondaryAction>
                            <IconButton>
                                <DeleteIcon></DeleteIcon>
                            </IconButton>
                        </ListItemSecondaryAction>
                </Grid>
              
            </Grid>
        </ListItem>
    );
}