import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
    palette: {
        background: {
            default: "#ffffff"
        },
        primary: {
            main: "#1B16BE"
        },
        secondary: {
            main: "#EEC04A"
        },
        info: {
            main: "#7e7e7e"
        }
    },
    overrides: {
        MuiAppBar: {
            root: {
                "box-shadow": [
                    "0px -1px 0px -1px rgb(0 0 0 / 8%), 0px 1px 6px 0px rgb(0 0 0 / 8%), 0px 1px 0px 0px rgb(0 0 0 / 0%)"
                ]
            }
        }
    }
});
