import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import BasePage from "./home/pages/BasePage";
import generateStore from "./store";
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';
require('./bootstrap');


const store = generateStore();
if (document.getElementById("root")) {
    ReactDOM.render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ConfirmProvider defaultOptions={{
                    title: 'Porfavor Confirma Esta Acción',
                    confirmationText : 'Confirmar',
                    cancellationText : 'Cancelar'
                }}>
                    <SnackbarProvider maxSnack={5} anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }} autoHideDuration={2000}> 
                        <BasePage></BasePage>
                    </SnackbarProvider>
                </ConfirmProvider>
            </ThemeProvider>
        </Provider>,
        document.getElementById("root")
    );
}