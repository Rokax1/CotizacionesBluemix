import {
    Avatar,
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    TextField, Container, Grid, Typography, Paper, Stepper, Step, StepLabel
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalLinearStepper from "../components/stepsComponent";
import CartPage from "./cartPageProducts";
import ConfirmPage from "./confirmPage";
import { PDFViewer } from 'react-view-pdf';
import { SaveCartToCotizacionAction } from "../../redux/cartDucks";

export function StepsPageCotizacion() {
    const cart = useSelector(state => state.cart.products);
    const disabled = cart.length > 0;
    const dispatch = useDispatch()
    const total = useSelector(state => state.cart.total);
    const cotizacion = useSelector(state => state.cart.cotizacion);
    const [step,setStep] = useState(1);
    const saveCotizacion = () => {
      dispatch(SaveCartToCotizacionAction())
    }
    const steps = ['Productos', 'Confirmar Cotización', 'Cotización Generada'];
    const stepsContent = (step) => {
            switch (step) {
                case 0:
                  return <CartPage cart={cart} total={total}></CartPage>;
                case 1:
                  return <ConfirmPage total={total} count_productos={cart.length} ></ConfirmPage>;
                case 2:
                  return <Box component={Paper}>{cotizacion == null ? 'Cargando Cotizacion' : <PDFViewer hideNavbar hideZoom
                  hideRotation url={cotizacion.pdf} /> } </Box>;
            }
    }

    return (
        <Container maxWidth="md" style={{marginTop: '70px', marginBottom: '70px'}} >
            <HorizontalLinearStepper steps={steps} pdf={cotizacion} disabled={disabled} saveCotizacion={saveCotizacion} stepsContent={stepsContent}></HorizontalLinearStepper>
        </Container>
    );
}

export default StepsPageCotizacion;
