export const TOKEN_KEY = "TOKEN_KEY";
export const USER = "USER";
export const ROL = "ROL";
export const CLIENTE = "CLIENTE";

export function loginService(credentials) {
    try {
        const login = axios.post("login", credentials);
        return login;
    } catch (e) {
        console.log(e);
        return false;
    }

    return false;
}

export function logout() {
    try {
        return axios.get("logout");
    } catch (e) {
        console.log(e);
    }

    return false;
}

export function setToken(token, user,rol,cliente) {
    localStorage.setItem(TOKEN_KEY, `Bearer ${token}`);
    localStorage.setItem(CLIENTE,cliente)
    localStorage.setItem(USER, user);
    localStorage.setItem(ROL,rol);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRol(){
    return localStorage.getItem(ROL);
}
export function revokeToken() {
    console.log("Token removido");
    localStorage.removeItem(USER);
    localStorage.removeItem(ROL);
    return localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
    if (getToken()) {
        return true;
    }

    return false;
}
