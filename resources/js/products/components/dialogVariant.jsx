import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PersonIcon from '@material-ui/icons/Person';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import VariantItemComponent from './variantItem';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  
  const {open, handleClose, product} = props;

  return (
    <div>

      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="lg"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Variedades</DialogTitle>
        <DialogContent>
        <List>
            { product.variants.map( (variant,index) =>  {
                return <VariantItemComponent variante={variant} key={index} product={product}></VariantItemComponent>
            })}
        </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}