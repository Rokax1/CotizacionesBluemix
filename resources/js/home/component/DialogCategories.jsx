import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CategoryCard from './categoryCard';
import {getProductsAction} from '../../redux/productDucks';
import { HANDLE_OPEN_DRAWER_CATEGORIES } from "../../redux/types";


import {useDispatch, useSelector} from 'react-redux';
import LoaderComponent from './LoaderComponent';
import { Box, CircularProgress, Grid, Container } from '@material-ui/core';
import BuscadorComponent from './buscardorComponent';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  root: {
    flexGrow : 1
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  padding:{
    padding: 20
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const categories = useSelector( state => state.categories.categorias );
  const loader = useSelector( state => state.categories.loader );
  console.log(categories);
  const stateStoreDrawer = useSelector(
        state => state.globalActions.openDrawerCategories
  );

  const handleClose = () => {
    dispatch({ type: HANDLE_OPEN_DRAWER_CATEGORIES, value: false });
  };

  return (
    <div>
      <Dialog fullScreen open={stateStoreDrawer} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Buscador
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Cancelar
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Grid container spacing={4} align="center" justify="center">
                <Grid item lg={6} md={6} sm={10} xs={10} style={{marginTop : '20px'}}><BuscadorComponent handleClose={handleClose}></BuscadorComponent></Grid>
          </Grid>
          
          <Typography  className={classes.padding} variant="subtitle1" gutterBottom>
            Categorias
          </Typography>
          <Grid container spacing={3} align="center"
            justify="center" className={classes.padding}>
          {loader ? 
                      <div>
                        <Box display="flex" justifyContent="center" style={{marginTop: '50px'}}><CircularProgress size={40}/></Box>
                        <Box display="flex" justifyContent="center" style={{marginTop: '2px'}}> Cargando Categorias ... </Box>
                      </div>
                      : 
                        categories.map( (category, index) => (
                                      <Grid item lg={4} md={4} sm={12} key={index}>
                                          <CategoryCard category={category} handleClose={handleClose}></CategoryCard>
                                      </Grid>
                        ) )
                        
                      
            }
            
            
            
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}