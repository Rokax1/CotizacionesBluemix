import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, IconButton, Avatar,Button } from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import ProfileAppBar from "./appBarTop/ProfileAppbar";
import { useDispatch, useSelector } from "react-redux";
import { getRol } from '../../login/services/AuthServices';
import { HANDLE_OPEN_DRAWER,HANDLE_OPEN_DRAWER_CATEGORIES } from "../../redux/types";
import { useStylesAppBarTop } from "../styles/useStylesAppBarTop";
import { useLocation } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import LogoBussines from '../../login/components/LogoBusiness';
import CartIconComponent from "./appBarTop/cartIcon";

function AppBarTop({ history }) {
    const classes = useStylesAppBarTop();

    const location = useLocation();
    const stateStoreDrawer = useSelector(
        state => state.globalActions.openDrawer
    );
    const stateStoreDrawerCategories = useSelector(
        state => state.globalActions.openDrawerCategories
    );
    const dispatch = useDispatch();
    const handleDrawerOpen = () => {
        dispatch({ type: HANDLE_OPEN_DRAWER, value: !stateStoreDrawer });
    };
    const handleDrawerOpenCategories = () => {
        dispatch({ type: HANDLE_OPEN_DRAWER_CATEGORIES, value: !stateStoreDrawerCategories });
    };

    return (
        <div>
            <AppBar
                position="fixed"
                className={classes.appBar}
                color="primary"
            >
                <Toolbar variant="dense">
                { getRol() == 'Administrador' ? 
                    ''
                 :  <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: stateStoreDrawer
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                 }
                    
                    <Typography
                        variant="h6"
                        style={{ fontSize: 14 }}
                        className={classes.title}
                    >
                        { getRol() == 'Administrador' ? 'Panel Administrativo' : 'Portal Empresas' }
                    </Typography>
                    
                        <CartIconComponent></CartIconComponent>
                        <Button
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpenCategories}
                            className={clsx(classes.menuButton, {
                                [classes.hide]: stateStoreDrawer
                            })}
                        >
                            <SearchIcon style={{marginRight:'5px'}}></SearchIcon>
                            <Typography
                            variant="h6"
                            style={{ fontSize: 14 }}
                            className={classes.title}
                            >
                            Buscar
                        </Typography>
                        </Button>
                        
                    <ProfileAppBar history={history}></ProfileAppBar>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppBarTop;
