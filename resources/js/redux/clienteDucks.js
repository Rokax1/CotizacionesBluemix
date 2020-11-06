const dataCliente = {
    cotizaciones: [],
    cliente : [],
    clientes : [],
    loader : true,
    loader_client_cotizaciones: true,
}

const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS';
const GET_COTIZACIONES_SUCCESS = 'GET_COTIZACIONES_SUCCESS';
const GET_CLIENTE_FAIL = 'GET_CLIENT_FAIL';
const UPDATE_CLIENT_SUCCESS = 'UPDATE_CLIENT_SUCCESS';
const SET_LOADER_CLIENT = 'SET_LOADER_CLIENT';
const GET_CLIENTES_SUCCESS = 'GET_CLIENTES_SUCCESS';
const SET_LOADER_CLIENT_COTIZACIONES = 'SET_LOADER_CLIENT_COTIZACIONES';


export default function clienteReducer(state = dataCliente, action) {
    
    switch (action.type) {
        case GET_CLIENT_SUCCESS:
            return { ...state, cliente: action.payload.cliente }; 
        case GET_CLIENTES_SUCCESS:
            return {...state, clientes: action.payload.clientes };
        case UPDATE_CLIENT_SUCCESS:
            return {...state, cliente: action.payload.cliente };
        case GET_COTIZACIONES_SUCCESS:
            return { ...state, cotizaciones: action.payload };
        case SET_LOADER_CLIENT:
            return { ...state, loader: action.payload }; 
        case SET_LOADER_CLIENT_COTIZACIONES:
            return { ...state, loader_client_cotizaciones: action.payload }; 
        default:
            return state;
    }
}

export const getClientDataAction = () => async (dispatch, getState) => {
    const id = localStorage.getItem("CLIENTE");
    try {
        const cliente = await axios.get('cliente/'+id);
        dispatch({
            type: GET_CLIENT_SUCCESS,
            payload : {
                cliente : cliente.data,
            }
        })
        return cliente.data;
    } catch (e) {
        console.log(e);
        return false;
    }finally{
        dispatch({
            type: SET_LOADER_CLIENT,
            payload : false
        })
    }
    
    //iva = iva + (total * 0.19);

}

export const getClientesAction = () => async (dispatch,getState) => {
    try {
        const clientes = await axios.get('cliente');
        dispatch({
            type: GET_CLIENTES_SUCCESS,
            payload : {
                clientes: clientes.data,
            }
        })
        return clientes.data;
    } catch (e) {
        console.log(e);
        return false;
    }finally{
        
    }
}

export const getCotizacionesClienteAction = () => async (dispatch, getState) => {
    try {
        const cotizaciones = await axios.get('mis-cotizaciones');
        dispatch({
            type: GET_COTIZACIONES_SUCCESS,
            payload : cotizaciones.data
        })
        return cotizaciones.data;
    } catch (e) {
        console.log(e);
        return false;
    }finally{
        dispatch({
            type: SET_LOADER_CLIENT_COTIZACIONES,
            payload : false
        })
    }
    
    //iva = iva + (total * 0.19);

}
export const UpdateClientDataAction = (id,formData) => async (dispatch, getState) => {
    try {
        const cliente = await axios.put('cliente/'+id,{formData});
        dispatch({
            type: UPDATE_CLIENT_SUCCESS,
            payload : {
                cliente : cliente.data,
            }
        })
        return cliente.data;
    } catch (e) {
        console.log(e);
        return false;
    }finally{
        dispatch({
            type: SET_LOADER_CLIENT,
            payload : false
        })
    }
    
    //iva = iva + (total * 0.19);

}

