import { makeStyles } from "@material-ui/core";

export const useStylesProfileAppBar = makeStyles(theme => ({
    small: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),

    },
    profileShow: {
        backgroundColor:"#2720FF",
        marginRight:4
    },
    menuHeader: {
        display: "flex",
        paddingLeft: 10,
        paddingRight: 10,
        minWidth: 180
    },
    menuHeaderTitle: {
        marginLeft: 5
    },
    colorIcon: {
        color: "#2720FF"
    }
}));