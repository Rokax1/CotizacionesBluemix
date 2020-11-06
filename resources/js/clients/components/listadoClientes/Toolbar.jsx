import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import DialogClient from '../DialogClient';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles, Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className,handleBusqueda,buttonEnabled,setContraseña,buttonLabel,placeholder,...rest}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleInputSearch = (e) => {
    
    if(e.key === 'Enter'){
      const param = e.target.value;
      const tipo = e.target.name;
      handleBusqueda(tipo,param);
    }
      
  }

  const handleCreateCLient = () => {
    setOpenDialog(true);
  }
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container alignItems="flex-end" alignContent="flex-end" justify="flex-end">
                <Grid item lg={8}>
                <Box >
                    <TextField
                      
                      fullWidth
                      name="razon_social"
                      onKeyPress={handleInputSearch}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon
                              fontSize="small"
                              color="action"
                            >
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      placeholder={placeholder}
                      variant="outlined"
                    />
                  </Box>
                </Grid>
                <Grid item lg={4} >
                    <Box alignItems="flex-end" display="flex" justifyContent="flex-end">
                     {buttonEnabled ? <Button variant="outlined" color="primary" onClick={handleCreateCLient}>
                                        {buttonLabel}
                                      </Button> 
                                    : '' 
                      }
                    </Box>
                </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <DialogClient open={openDialog} setContraseña={setContraseña} handleCloseDialog={handleCloseDialog} isStore={true}/>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;