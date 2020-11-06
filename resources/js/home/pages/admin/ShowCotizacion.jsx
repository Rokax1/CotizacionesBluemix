import React,{useState,useEffect} from 'react';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Paper, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { GetDetalles } from '../../../clients/services/cotizacionService';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ShowCotizacion({cotizacion}){

    const [loader,setLoader]  = useState(true);
    const [detalles,setDetalles] =  useState([]);

    const getDetalles = async () => {
        setLoader(true);
        const response =  await GetDetalles(cotizacion.id);
        console.log(response);
        setDetalles(response)
        setLoader(false);
    }

    const handleClick =  ()  => {
        getDetalles();
    }

    return (
        <div>
            <Container maxWidth="lg" style={{marginTop: '48px'}}>
                <Grid container>
                        <Grid item xs={12} component={Paper}>
                            <Typography variant="h6" color="initial" onClick={handleClick}>Cotización Nº {cotizacion.id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Código</StyledTableCell>
                                        <StyledTableCell align="right">Descripción</StyledTableCell>
                                        <StyledTableCell align="right">Marca</StyledTableCell>
                                        <StyledTableCell align="right">Cantidad</StyledTableCell>
                                        <StyledTableCell align="right">Precio Unitario</StyledTableCell>
                                        <StyledTableCell align="right">Stock Actual</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {detalles?.map((detalle,index) => (
                                        <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">
                                            {detalle.codigo}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{detalle.producto.descripcion}</StyledTableCell>
                                        <StyledTableCell align="right">{detalle.producto.marca}</StyledTableCell>
                                        <StyledTableCell align="right">{detalle.cantidad}</StyledTableCell>
                                        <StyledTableCell align="right">{detalle.valor}</StyledTableCell>
                                        <StyledTableCell align="right">{detalle.stock}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                </Grid>
            </Container>
        </div>
    );
}