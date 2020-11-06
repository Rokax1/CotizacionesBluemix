import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {  Grid } from '@material-ui/core';
import FormEditCliente from './formEditarCliente';
import FormCrearCliente from './formCrearCliente';
import AlertaCliente from '../components/alertaCliente';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
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

export default function DialogClient({cliente,open,handleCloseDialog,isStore,setContraseña}) {

  const classes = useStyles();
  const handleClose = () => {
    handleCloseDialog();
  };


  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title}>
              Editar Cliente
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Cancelar
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Grid container align="center" justify="center">
                <Grid item lg={6} md={6} sm={12} xs={12} style={{marginTop : '20px'}} >
                  {isStore ? <FormCrearCliente handleClose={handleClose} setContraseña={setContraseña}></FormCrearCliente> : <FormEditCliente cliente={cliente} handleClose={handleClose} setContraseña={setContraseña}></FormEditCliente> }
                </Grid>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}