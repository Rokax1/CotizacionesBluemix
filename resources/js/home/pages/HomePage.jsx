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
import { NotFoundPage } from "./NotFoundPage";
import { useStylesHomePage } from "../styles/useStylesHome";
import AppBarTop from "../component/AppBarTop";
import DrawerLeft from "../component/DrawerLeft";

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
                            <Route path="/sale" exact={true} render={()=><PageBasePointSale history={history}/>}/>
                            <Route path="/dashboard">fds</Route>
                            <Route path="/setting/product" render={()=><BasePageConf history={history}/>}/>
                            <Route path="*" render={()=>   <NotFoundPage/>}/>
                        </Switch>
                    </main>
                    
                </div>
            </Router>
        </div>
    );
}
export default HomePage;
