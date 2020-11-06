import { makeStyles } from "@material-ui/core";
const drawerWidth = 200;
export const useStylesDrawerLeft = makeStyles(theme => ({
    drawerOpen: {
        width: drawerWidth
    },

    drawerClose: {
        overflowX: "hidden",
        width: 65,
        [theme.breakpoints.up("sm")]: {
            width: 60
        }
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: "auto",
        fontSize: 50
    },
    drawerPadding: {
        marginLeft: 10,
        marginRight: 10
    },
    listItemDrawerClose: {
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 8,
        borderRadius: 50,
    },
    listItemDrawerOpen: {
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 8,
        borderRadius: 5,
        "&.Mui-selected": {
            borderRadius: 4,
            color: "#2720FF",
            backgroundColor: "white"
        },
        "&.MuiListItem-button": {
            transition: "none"
        }
    },
    active: {
        backgroundColor: "red"
    },
    buttonDrawerClose: {
        width: 38
    },
    buttonDrawerOpen: {
        width: 160
    },
    iconListItemDrawerClose: {
        paddingLeft: 8
    }
}));