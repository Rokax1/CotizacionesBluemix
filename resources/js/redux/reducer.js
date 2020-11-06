import {
    OPEN_SNACKBAR,
    HANDLE_OPEN_DRAWER,
    HANDLE_OPEN_DRAWER_CATEGORIES,
    HANDLE_SHOW_ERRORS_FORMS,
    HANDLE_SHOW_LINEAR_PROGESS,
    HANDLE_DETAILS_SELECTED,
    HANDLE_OPEN_DIALOG_CLIENT_EDIT
} from "./types";

const statePointOfSales = {
    user: {},
    showLinearProgress: true,
    isAuthenticated: false,
    loadingAutenticated: false,
    openDrawer: false,
    openDrawerCategories:false,
    openDialogEditClient:false,
    openSnackbar: {
        show: false,
        message: ""
    },
    productSelectedDetails :{},
    errors: {
        show: false,
        messages: []
    },
    pointOfSale: {}
};

const globalActionsReducer = (state = statePointOfSales, action) => {
    switch (action.type) {
        
        case HANDLE_OPEN_DRAWER:
            return {
                ...state,
                openDrawer: action.value
            };
        case HANDLE_OPEN_DRAWER_CATEGORIES:
            return {
                ...state,
                openDrawerCategories: action.value
            };
        case HANDLE_OPEN_DIALOG_CLIENT_EDIT:
            return {
                ...state,
                openDialogEditClient: action.value
            };     
        case OPEN_SNACKBAR:
            return {
                ...state,
                openSnackbar: {
                    show: action.value.show,
                    message: action.value.message
                }
            };
        case HANDLE_SHOW_ERRORS_FORMS: {
            return {
                ...state,
                errors: {
                    show: action.value.show,
                    messages: action.value.message
                }
            };
        }
        case HANDLE_DETAILS_SELECTED: {
            return {
                ...state,
                productSelectedDetails: action.value
            };
        }
        default:
            return state;
    }
};

export default globalActionsReducer;
