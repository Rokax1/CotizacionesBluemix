import { Alert } from '@material-ui/lab';
import React from 'react';

export default function AlertaCliente({message}){
    return (
       <Alert variant="outlined" severity="success">
            {message}
        </Alert>
    );
}