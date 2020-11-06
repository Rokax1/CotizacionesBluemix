const {
    OPEN_SNACKBAR,
    HANDLE_SHOW_ERRORS_FORMS,
    HANDLE_SHOW_LINEAR_PROGESS
} = require("./types");

function handleOpenSnackbar(value) {
    return {
        type: OPEN_SNACKBAR,
        value: { show: value.show, message: value.message }
    };
}

function handleOpenDrawer(openDrawer) {
    return { type: HANDLE_OPEN_DRAWER, value: openDrawer };
}
function handleOpenDrawerCategories(openDrawer) {
    return { type: HANDLE_OPEN_DRAWER_CATEGORIES, value: openDrawer };
}
function openDialogEditClient(openDrawer) {
    return { type: HANDLE_OPEN_DIALOG_CLIENT_EDIT, value: openDrawer };
}
function handleShowErrorsForm(payload) {
    return { type: HANDLE_SHOW_ERRORS_FORMS, value: payload };
}

function handleShowLinearProgress(value) {
    return {
        type: HANDLE_SHOW_LINEAR_PROGESS,
        value: value
    };
}
