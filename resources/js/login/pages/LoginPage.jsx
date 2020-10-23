import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { useStylesLogin } from "../styles/useStylesLogin";
import Copyright from "../components/Copyright";
import FormLogin from "../components/FormLogin";
import { CssBaseline } from "@material-ui/core";
import LogoBusiness from "../components/LogoBusiness";
import { useHistory } from "react-router-dom";

function LoginPage() {
    const history = useHistory();
    const classes = useStylesLogin();
    
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            
            <div className={classes.paper}>
                <LogoBusiness width={200} height={100}></LogoBusiness>
                <FormLogin classes={classes} history={history}></FormLogin>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default LoginPage;
