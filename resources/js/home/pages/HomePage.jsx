import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useLocation
} from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import { CssBaseline, LinearProgress } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import NotFoundPage from "./NotFoundPage";
import { useStylesHomePage } from "../styles/useStylesHome";
import AppBarTop from "../component/AppBarTop";
import DrawerLeft from "../component/DrawerLeft";
import CotizacionesPageAdmin from "./admin/CotizacionesPageAdmin";
import ClientsPage from '../../clients/pages/ClientsPage';

export function HomePage() {
    const history = useHistory();
    const classes = useStylesHomePage();
    const state = useSelector(state => state.appPointOfSales);
    let location = useLocation();
    const dispatch = useDispatch();

    return (
        <div>
            <Router>
                <div className={classes.root}>
                    
                    <AppBarTop history={history}></AppBarTop>

                    <DrawerLeft></DrawerLeft>
                    <CssBaseline/>
                  
                    <main className={classes.content}>
                 
                        <Switch>
                            <Route path="/cotizaciones" exact={true} render={()=><CotizacionesPageAdmin history={history}/>}/>
                            <Route path="/" exact={true} render={()=><CotizacionesPageAdmin history={history}/>}/>
                            <Route path="/clientes" exact={true} render={()=><ClientsPage history={history}/>}/>
                            <Route path="*" render={()=>   <NotFoundPage/>}/>
                        </Switch>
                    </main>
                    
                </div>
            </Router>
        </div>
    );
}
export default HomePage;
