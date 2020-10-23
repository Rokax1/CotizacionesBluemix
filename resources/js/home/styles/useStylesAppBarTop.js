import { makeStyles } from "@material-ui/styles";

export const useStylesAppBarTop = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        flexGrow: 1
    },
    root: {
        flexGrow: 1,
        display: "flex"
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    title: {
        flexGrow: 1
    }
}));