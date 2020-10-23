import { fade, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {getProductsAction} from '../../redux/productDucks';
const useStyles = makeStyles( (theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
}))

export default function BuscadorComponent(props){
    const {handleClose} = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const [formData, setdataForm] = useState({search : ""});
    
    function handleInputChange(e) {
        setdataForm({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    }
    const searchHook = (event) => {
      if(event.key == 'Enter'){
        dispatch(getProductsAction(null,null,formData.search));
        handleClose();
      }
      
    }

    return (
        <Paper>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onKeyPress={ searchHook }
              onKeyUp={handleInputChange}
              onChange={handleInputChange}
              name="search"
              placeholder="Buscar Productos..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
        </div>
        </Paper>
    );
}