import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import { Box, Button, Divider, Grid } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { HANDLE_OPEN_DRAWER } from "../../redux/types";
import { useStylesDrawerLeft } from "../styles/useStylesDrawerLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ListAltIcon from "@material-ui/icons/ListAlt";
import LogoBusiness from '../../login/components/LogoBusiness';
const ColorButton = withStyles(theme => ({
    root: {
        color: "#d60000",
        borderRadius: 20,
        backgroundColor: "white",
        "&:hover": {
            backgroundColor: "white",
            color: "#d60000"
        },
        minWidth: "0"
    }
}))(Button);

export function DrawerLeftClient() {
    const classes = useStylesDrawerLeft();
    let location = useLocation();
    const dispatch = useDispatch();
    const handleDrawerClose = () => {
        dispatch({ type: HANDLE_OPEN_DRAWER, value: false });
    };
    const stateStoreDrawer = useSelector(
        state => state.globalActions.openDrawer
    );

    return (
        <div className={classes.root}>
            <CssBaseline />

            <Drawer
              variant="persistent"
              anchor="left"
              open={stateStoreDrawer}
              onClose={handleDrawerClose}
              
            >
              
           
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List
                        component="nav"
                        aria-label="main mailbox folders"
                        className={classes.drawerPadding}
                    >
                        <ListItem
                            selected={
                                location.pathname === "/" ? true : false
                            }
                            button
                            onClick={handleDrawerClose}
                            component={NavLink}
                            to="/"
                            className={clsx({
                                [classes.listItemDrawerClose]: !stateStoreDrawer,
                                [classes.listItemDrawerOpen]: stateStoreDrawer
                            })}
                        >
                            <ListItemIcon>
                                <LoyaltyIcon
                                    style={
                                        location.pathname === "/"
                                            ? { color: "#2720FF" }
                                            : {}
                                    }
                                />
                            </ListItemIcon>
                            <Box fontSize={14}>Productos</Box>
                        </ListItem>
                        <ListItem
                            selected={
                                location.pathname === "/cart" ? true : false
                            }
                            button
                            onClick={handleDrawerClose}
                            component={NavLink}
                            to="/cart"
                            className={clsx({
                                [classes.listItemDrawerClose]: !stateStoreDrawer,
                                [classes.listItemDrawerOpen]: stateStoreDrawer
                            })}
                        >
                            <ListItemIcon>
                                <LoyaltyIcon
                                    style={
                                        location.pathname === "/cart"
                                            ? { color: "#2720FF" }
                                            : {}
                                    }
                                />
                            </ListItemIcon>
                            <Box fontSize={14}>Carro De Cotización</Box>
                        </ListItem>
                        <Divider></Divider>
                    </List>
                </div>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  alignContent="center"
                  wrap="nowrap"
                  
                >
                  <Grid item lg={5}><LogoBusiness width={90} height={60}></LogoBusiness></Grid>
                </Grid>
            </Drawer>
        </div>
    );
}

export default DrawerLeftClient;
