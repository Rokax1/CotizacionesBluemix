import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { useConfirm } from 'material-ui-confirm';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';
import PrintIcon from '@material-ui/icons/Print';
import { getRol } from '../../login/services/AuthServices';
import ChipEstado from './chipEstado';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { DeleteCot } from '../services/cotizacionService';
import { Card, TablePagination } from '@material-ui/core';
import DialogShowCotizacion from '../../home/pages/admin/dialogShowCotizacion';


moment.locale('es-us'); 
moment().format('L'); 

const useRowStyles = makeStyles({
  root: {
    '* > &': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { cotizacion } = props;
  const {setOpenDialog} = props;
  const {setCotizacion} = props;
  const confirm = useConfirm();
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const openPDF = () => {
    window.open('/cotizacion/pdf/' + cotizacion.id);
  }

  const handleClickCotizacion = () => {
    setOpenDialog(true);
    setCotizacion(cotizacion);
  }

  const deleteCotizacion = () => {
    confirm({ description: 'Esta acción eliminará todo registro de la cotización, confirmar?' })
      .then(() => { 
        
       })
      .catch(() => {  });
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root} onClick={ handleClickCotizacion }>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {cotizacion.id}
        </TableCell>
        { getRol() == 'Administrador' ? <TableCell component="th" scope="row"> {cotizacion.cliente.razon_social} </TableCell> : ''}
        <TableCell component="th" scope="row">
          {moment(cotizacion.fecha).format('L')}
        </TableCell>
        <TableCell align="center">{cotizacion.tipo}</TableCell>
        <TableCell align="center">${new Number(cotizacion.total).toLocaleString('es-CL')}</TableCell>
        <TableCell align="center"><ChipEstado estado={cotizacion.estado}></ChipEstado></TableCell>
        <TableCell align="center">
            <IconButton aria-label="" onClick={openPDF}>
                <PrintIcon></PrintIcon>
            </IconButton>
        </TableCell>
        {getRol() == 'Administrador' ? 
          <TableCell align="center">
            <IconButton aria-label="" onClick={deleteCotizacion}>
                <DeleteForeverIcon></DeleteForeverIcon>
            </IconButton>
          </TableCell> : ''
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Codigo</TableCell>
                    <TableCell>Detalle</TableCell>
                    <TableCell align="right">Marca</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Precio Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cotizacion.detalles.map((detalle,index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {detalle.producto.codigo}
                      </TableCell>
                      <TableCell>{detalle.producto.descripcion}</TableCell>
                      <TableCell align="right">{detalle.producto.marca}</TableCell>
                      <TableCell align="right">{detalle.cantidad}</TableCell>
                      <TableCell align="right">${new Number(detalle.valor).toLocaleString('es-CL')}</TableCell>
                      <TableCell align="right">${new Number( (detalle.cantidad) * (detalle.valor) ).toLocaleString('es-CL')}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                      <TableCell/>
                      <TableCell/>
                      <TableCell align="right"/>
                      <TableCell align="right"/>
                      <TableCell align="right" component="th">Total</TableCell>
                      <TableCell align="right" component="th">${new Number( cotizacion.total ).toLocaleString('es-CL')}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function TablaCotizaciones({cotizaciones,...rest}) {

  const [openDialog,setOpenDialog] = useState(false);
  const [cotizacion, setCotizacion] = useState([]);
  return (
      <div>
        {
          cotizaciones.length > 0 ? 
          <Card
          {...rest}
        >
          <PerfectScrollbar>
          <Box>
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell/>
                  <TableCell>Nº</TableCell>
                  { getRol() == 'Administrador' ? <TableCell>Cliente</TableCell> : ''}
                  <TableCell>Fecha</TableCell>
                  <TableCell align="center">Tipo</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Imprimir</TableCell>
                  <TableCell align="center">Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cotizaciones.map((cotizacion,index) => (
                  <Row key={index} cotizacion={cotizacion} setOpenDialog={setOpenDialog} setCotizacion={setCotizacion}  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            labelRowsPerPage="Clientes por Página"
            count={cotizaciones.length}
            onChangePage={ () => alert('coso')}
            onChangeRowsPerPage={() => alert('coso')}
            page={0}
            rowsPerPage={5}
            rowsPerPageOptions={[5, 10, 25]}
          />
          <DialogShowCotizacion open={openDialog} cotizacion={cotizacion}></DialogShowCotizacion>
          </Card>
           : <Typography variant="h6" color="initial">No Se Encontraron Resultados</Typography>
        }
      </div> 
  );
}