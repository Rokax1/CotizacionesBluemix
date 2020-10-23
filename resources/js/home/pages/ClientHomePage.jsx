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
import { NotFoundPage } from "./NotFoundPage";
import { useStylesHomePage } from "../styles/useStylesHome";
import AppBarTop from "../component/AppBarTop";
import DrawerLeftClient from "../component/DrawerLeftClient";
import FullScreenDialog from '../component/DialogCategories';
import HomeClient from "../../clients/pages/HomeClient";
import {getToken} from "../../login/services/AuthServices";
import DetailsPage from "../../products/pages/detailsPage";
import ShoppingCart from "../../products/pages/cartPage";

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
                    <CssBaseline/>
                  
                    <main className={classes.content}>
                 
                        <Switch>
                            <Route path="/" exact={true} render={()=><HomeClient history={history}/>}/>
                            <Route path="/cart" exact={true} render={()=><ShoppingCart history={history}/>}/>
                            <Route path="/details/:product" exact={true} render={()=><DetailsPage history={history}/>}/>
                            <Route path="/categoria/:category" render={()=><HomeClient history={history}/>}/>
                            <Route path="*" render={()=>   <NotFoundPage/>}/>
                        </Switch>
                    </main>
                </div>
            </Router>
        </div>
    );
}
export default ClientBasePage;
