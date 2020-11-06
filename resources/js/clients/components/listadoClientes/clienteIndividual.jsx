
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import DialogClient from '../DialogClient';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  ButtonGroup,
  Button,
  IconButton
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DeleteClient } from '../../services/clientService';
import { useDispatch } from 'react-redux';
import { getClientesAction } from '../../../redux/clienteDucks';


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const ClienteIndividual = ({ className, clientes, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [cliente, setCliente] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  }
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleClickEdit = (cliente) => {
    console.log(cliente);
    setCliente(cliente);
    setOpenDialog(true);
  }

  const handleClickDelete = async (id) => {
      if(confirm("Se eliminará el cliente y todas las cotizaciones asociadas, desea continuar ?")){
        const response = await DeleteClient(id);
        alert(response.data.message);
        dispatch(getClientesAction());
      }
  }

  return (
    <div>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Razón Social
                </TableCell>
                <TableCell>
                  Rut
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Teléfono
                </TableCell>
                <TableCell>
                  Ciudad
                </TableCell>
                <TableCell colSpan={2}>
                  Editar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.slice(page * limit,page * limit + limit).map((cliente,index) => (
                
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                      >
                        C
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {cliente.razon_social}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {cliente.rut}
                  </TableCell>
                  <TableCell>
                    {cliente.email}
                  </TableCell>
                  <TableCell>
                    {cliente.telefono}
                  </TableCell>
                  <TableCell>
                    {cliente.ciudad}
                  </TableCell>
                  <TableCell>
                    <ButtonGroup variant="contained" color="primary" aria-label="Acciones">
                      <Button onClick={ () =>  handleClickEdit(cliente) }>
                        <EditIcon/>
                      </Button>
                      <Button>
                        <DeleteIcon onClick={ () => handleClickDelete(cliente.id) } />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
               
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        labelRowsPerPage="Clientes por Página"
        count={clientes.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    <DialogClient cliente={cliente} open={openDialog} handleCloseDialog={handleCloseDialog} isStore={false}/>
    </div>
  );
};

ClienteIndividual.propTypes = {
  className: PropTypes.string,
  clientes: PropTypes.array.isRequired
};

export default ClienteIndividual;