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
import { Box, Button, Divider } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useSelector } from "react-redux";
import { useStylesDrawerLeft } from "../styles/useStylesDrawerLeft";
import SettingsIcon from "@material-ui/icons/Settings";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ListAltIcon from "@material-ui/icons/ListAlt";
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

export function DrawerLeft() {
    const classes = useStylesDrawerLeft();
    let location = useLocation();
    const stateStoreDrawer = useSelector(
        state => state.globalActions.openDrawer
    );

    return (
        <div className={classes.root}>
            <CssBaseline />

            <Drawer
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: stateStoreDrawer,
                    [classes.drawerClose]: !stateStoreDrawer,

                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: stateStoreDrawer,
                        [classes.drawerClose]: !stateStoreDrawer
                    })
                }}
                variant={ location.pathname === "/setting/product" ? "temporary" : "permanent"}
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
                                location.pathname === "/sale" ? true : false
                            }
                            button
                            component={NavLink}
                            to="/sale"
                            className={clsx({
                                [classes.listItemDrawerClose]: !stateStoreDrawer,
                                [classes.listItemDrawerOpen]: stateStoreDrawer
                            })}
                        >
                            <ListItemIcon>
                                <LoyaltyIcon
                                    style={
                                        location.pathname === "/sale"
                                            ? { color: "f4511e" }
                                            : {}
                                    }
                                />
                            </ListItemIcon>
                            <Box fontSize={14}>Venta</Box>
                        </ListItem>

                        <ListItem
                            selected={
                                location.pathname === "/setting" ? true : false
                            }
                            button
                            component={NavLink}
                            to="/setting/product"
                            className={clsx({
                                [classes.listItemDrawerClose]: !stateStoreDrawer,
                                [classes.listItemDrawerOpen]: stateStoreDrawer
                            })}
                        >
                            <ListItemIcon>
                                <ListAltIcon
                                    style={
                                        location.pathname === "/setting"
                                            ? { color: "f4511e" }
                                            : {}
                                    }
                                />
                            </ListItemIcon>
                            <Box fontSize={14}>Inventario</Box>
                        </ListItem>
                        <ListItem
                            selected={
                                location.pathname === "/setting" ? true : false
                            }
                            button
                            component={NavLink}
                            to="/setting/product"
                            className={clsx({
                                [classes.listItemDrawerClose]: !stateStoreDrawer,
                                [classes.listItemDrawerOpen]: stateStoreDrawer
                            })}
                        >
                            <ListItemIcon>
                                <AssessmentIcon
                                    style={
                                        location.pathname === "/setting"
                                            ? { color: "f4511e" }
                                            : {}
                                    }
                                />
                            </ListItemIcon>
                            <Box fontSize={14}>Reportes</Box>
                        </ListItem>
                        <Divider></Divider>
                        <ListItem
                            selected={
                                location.pathname === "/setting" ? true : false
                            }
                            button
                            component={NavLink}
                            to="/setting/product"
                            className={clsx({
                                [classes.listItemDrawerClose]: !stateStoreDrawer,
                                [classes.listItemDrawerOpen]: stateStoreDrawer
                            })}
                        >
                            <ListItemIcon>
                                <SettingsIcon
                                    style={
                                        location.pathname === "/setting"
                                            ? { color: "f4511e" }
                                            : {}
                                    }
                                />
                            </ListItemIcon>
                            <Box fontSize={14}>Configuraciones</Box>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default DrawerLeft;
