import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useLocation
} from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import { AppBar, CssBaseline, LinearProgress, Typography } from "@material-ui/core";
import { getCategoriesAction } from "../../redux/categoryDucks";
import { useDispatch, useSelector } from "react-redux";
import  NotFoundPage from "./NotFoundPage";
import { useStylesHomePage } from "../styles/useStylesHome";
import AppBarTop from "../component/AppBarTop";
import DrawerLeftClient from "../component/DrawerLeftClient";
import FullScreenDialog from '../component/DialogCategories';
import HomeClient from "../../clients/pages/HomeClient";
import {getToken} from "../../login/services/AuthServices";
import DetailsPage from "../../products/pages/detailsPage";
import ShoppingCart, { StepsPageCotizacion } from "../../products/pages/stepsPageCotizacion";
import DialogEditClient from "../../clients/components/DialogEditClient";
import PasswordChangePage from "../../clients/pages/PasswordChangePage";
import CotizacionesPage from "../../clients/pages/CotizacionesPage";
import HomePrincipalCliente from "../../clients/pages/HomePrincipalClientes";

export function ClientBasePage() {
    const history = useHistory();
    const classes = useStylesHomePage();
    const state = useSelector(state => state.globalActions);
    let location = useLocation();
    const dispatch = useDispatch();
    window.axios.defaults.headers.common['Authorization'] = getToken();
    useEffect( () => {
        dispatch(getCategoriesAction());
    },[])
    return (
        <div>
            <Router>
                <div className={classes.root}>
                    
                    <AppBarTop history={history}></AppBarTop>
                    <DrawerLeftClient></DrawerLeftClient>
                    <FullScreenDialog></FullScreenDialog>
                    <DialogEditClient></DialogEditClient>
                    <CssBaseline/>
                  
                    <main className={classes.content}>
                 
                        <Switch>
                            <Route path="/" exact={true} render={()=><HomePrincipalCliente history={history}/>}/>
                            <Route path="/productos" exact={true} render={()=><HomeClient history={history}/>}/>
                            <Route path="/cart" exact={true} render={()=><StepsPageCotizacion history={history}/>}/>
                            <Route path="/details/:id" exact={true} render={()=><DetailsPage history={history}/>}/>
                            <Route path="/password-change" exact={true} render={ () => <PasswordChangePage history={history}></PasswordChangePage>} />
                            <Route path="/mis-cotizaciones" exact={true} render={ () => <CotizacionesPage history={history}></CotizacionesPage>} />
                            <Route path="*" render={()=>   <NotFoundPage/>}/>
                        </Switch>
                    </main>
                </div>
            </Router>
        </div>
    );
}
export default ClientBasePage;
