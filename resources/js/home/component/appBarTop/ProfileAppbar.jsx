import React, { useState } from "react";
import {
    Avatar,
    Menu,
    MenuItem,
    Divider,
    Box
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { revokeToken } from "../../../login/services/AuthServices";
import { USER } from "../../../login/services/AuthServices";
import { useStylesProfileAppBar } from "../../styles/useStylesProfileAppBar";

export default function ProfileAppBar({ history }) {
    const [dropMenu, setdropMenu] = useState(false);
    const user = localStorage.getItem(USER);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStylesProfileAppBar();
    const dispatch = useDispatch();
    const state = useSelector(state => state.appMueblesSuecia);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    async function closeSesion() {
        revokeToken();
        history.push("/login");
    }
    return (
        <div>
            <Avatar
                className={classes.avatar}
                className={classes.small}
                style={{backgroundColor: 'white', color: 'blue'}}
                onClick={handleClick}
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                
            >
                {user.toUpperCase().charAt(0)}
            </Avatar>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} className={classes.menuHeader}>
                    <Avatar
                        className={classes.profileShow}
                        onClick={handleClick}
                        aria-owns={anchorEl ? "simple-menu" : undefined}
                        aria-haspopup="true"
                    >
                        {user.toUpperCase().charAt(0)}
                    </Avatar>
                    <Box className={classes.menuHeaderTitle}>
                        {user.toUpperCase()}
                    </Box>
                </MenuItem>
                <Divider></Divider>
                <MenuItem onClick={closeSesion}>
                    <ExitToAppIcon
                        fontSize="small"
                        className={classes.colorIcon}
                    ></ExitToAppIcon>{" "}
                    <Box className={classes.menuHeaderTitle}>Salir</Box>
                </MenuItem>
            </Menu>
        </div>
    );
}
