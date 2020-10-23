import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import BasePage from "./home/pages/BasePage";
import generateStore from "./store";
import { SnackbarProvider } from 'notistack';
require('./bootstrap');


const store = generateStore();
if (document.getElementById("root")) {
    ReactDOM.render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={5} anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }} autoHideDuration={2000}> 
                    <BasePage></BasePage>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>,
        document.getElementById("root")
    );
}