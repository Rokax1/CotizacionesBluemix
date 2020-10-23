import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "../../login/components/PrivateRoute";
import  {getRol, getToken}  from "../../login/services/AuthServices"
import LoginPage from "../../login/pages/LoginPage";
import {HomePage} from "./HomePage";
import {ClientBasePage} from "./ClientHomePage";

function BasePage() {    

    // NO BORRAR 
    window.axios.defaults.headers.common['Authorization'] = getToken();
    const getHomePage = () => {
        var rol = getRol();
        return rol == 'Administrador' ? <HomePage></HomePage> : <ClientBasePage></ClientBasePage>
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <LoginPage></LoginPage>
                    </Route>

                    <PrivateRoute path="/">
                        { getHomePage() }
                    </PrivateRoute>
                    
                </Switch>
            </Router>
        </div>
    );
}
export default BasePage;

