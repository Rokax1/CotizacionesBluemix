import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Box, Button, CircularProgress } from "@material-ui/core";
import { loginService } from "../../login/services/AuthServices";
import { setToken } from "../../login/services/AuthServices";
import { validate, clean, format } from "rut.js";

function FormLogin({ classes, history }) {
    const [dataForm, setdataForm] = useState({ rut: "", password: "" });
    const [rutFormated, setRutFormated] = useState('');
    const [validated, setValidated] = useState(false);
    const [loader, setLoader] = useState(false);

    function handleInputChange(e) {
        setValidated(false);
        if(e.target.name == 'rut'){
            var rut_formateado = format(e.target.value); //formateamos lo que escribe el usuario
            
            setRutFormated(rut_formateado);
        }
        setdataForm({ ...dataForm, [e.target.name]: e.target.value });
    }

    function validate(dataForm) {
        let formIsValid = true;

        if (!dataForm.rut) {
            formIsValid = false;
        }
        if (!dataForm.password) {
            formIsValid = false;
        }

        return formIsValid;
    }

    async function handleLogin(e) {
        e.preventDefault();

        setLoader(true);
        
        setdataForm({ ...dataForm, "rut" : rutFormated });
        console.log(dataForm);
        if (!validate(dataForm)) {
            setValidated(true);
            return;
        }

        const login = await loginService(dataForm);
        
        if(login.data.auth){
            setToken(login.data.access_token, login.data.user.name, login.data.user.rol);
            setLoader(false);
            history.push("/");
        }else{
            setLoader(false);
            alert(login.data.message);
        }
            
        

        
    }

    

    return (
        <form className={classes.form} noValidate onSubmit={handleLogin}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="rut"
                label="Rut"
                value={rutFormated}
                name="rut"
                autoFocus
                onKeyUp={handleInputChange}
                onChange={handleInputChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
            />
            {validated ? (
                <Box textAlign="left" color={"red"}>
                    Los campos son obligatorios
                </Box>
            ) : (
                ""
            )}

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loader}
            >
                {loader ? (
                    <CircularProgress color="inherit" size={25} />
                ) : (
                    "Ingresar"
                )}
            </Button>
        </form>
    );
}

export default FormLogin;
