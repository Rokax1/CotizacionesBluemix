import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { Typography,CircularProgress,Box } from '@material-ui/core';

export default function LoaderComponent(props){

const {text} = props;

return (
    <div style={{marginTop : '100px'}}>
        
                        <Box display="flex" justifyContent="center" ><CircularProgress size={60}/></Box>
                        <Box display="flex" justifyContent="center" style={{marginTop: '5px'}}> Obteniendo Productos ... </Box>
    </div>
);
}
