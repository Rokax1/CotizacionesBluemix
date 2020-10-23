import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";

export function AlertErrors({ visible, errors = [] }) {


    console.log(errors);
    return (
        <div>
            {visible  && (
                <Alert severity="error">
                    <AlertTitle>Datos inválidos</AlertTitle>
                    <ul>
                        {errors.barcode && errors.barcode.map((error, index) => {
                           return  <li key={index}>{error}</li>;
                        })}
                        {errors.sku && errors.barcode.map((error, index) => {
                           return  <li key={index}>{error}</li>;
                        })}

                       
                        {/** TODO : Es necesario ver de que forma se pueden mejorar los mensajes  */}

                    
                        
                    </ul>
                </Alert>
            ) }
        </div>
    );
}

export default AlertErrors;
