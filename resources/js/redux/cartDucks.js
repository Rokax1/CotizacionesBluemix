
import { useSnackbar } from 'notistack';

const dataCart = {
    products: [],
    total: 0,
    cotizacion: null,
    saveCotizacionError: false,
    tipo_cotizacion: 'IVA',
    iva: 0,
}

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_TO_CART = 'REMOVE_TO_CART';
const ADD_QUANTITY = 'ADD_VALUE_CANTIDAD';
const REMOVE_QUANTITY = 'ADD_VALUE_CANTIDAD';
const SAVE_COTIZACION_SUCCESS = 'SAVE_COTIZACION_SUCCESS';
const UPDATE_QUANTITY_CART = 'UPDATE_QUANTITY_CART';
const SET_TIPO_COTIZACION = 'SET_TIPO_COTIZACION';


export default function cartReducer(state = dataCart, action) {
    
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, products: action.payload.cartItems, total: action.payload.total }; 
        case REMOVE_TO_CART:
            
            return {...state, products:action.payload.products, total: action.payload.total };
        case UPDATE_QUANTITY_CART:

            return {...state, products:action.payload.products, total: action.payload.total };
        case SAVE_COTIZACION_SUCCESS:

            return { ...state, cotizacion: action.payload.cotizacion, products: [], total: 0};
        case SET_TIPO_COTIZACION:
            return {...state, tipo_cotizacion: action.payload.tipo};
        default:
            return state;
    }
}

export const addCartProductAction = (product) => async (dispatch, getState) => {
    
    const cartItems = getState().cart.products.slice();
    let total = getState().cart.total;
    //let iva = getState().cart.iva;
    let alreadyExists = false;
    cartItems.forEach((x) => {
        if (x.id === product.id) {
            alreadyExists = true;
            x.quantity++;
        }
    });
    if (!alreadyExists) {
        cartItems.push({ ...product, quantity: 1 });
    }
    total = total + product.price;
    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems, total },
    });
    
    //iva = iva + (total * 0.19);

}

export const RemoveCartProductAction = (product) => async (dispatch, getState) => {
    
    const cart = getState().cart.products;
    let newCart = cart.filter( item => item.id != product.id );
    console.log(cart)
    console.log(newCart)
    const cantidad_producto = cart.find(item => item.id === product.id).quantity;
    let total = getState().cart.total;
    //let iva = getState().cart.iva;
    total = total - (product.price * cantidad_producto);

    dispatch({
        type: REMOVE_TO_CART,
        payload: {
            products: newCart,
            total: total,
        }
    })

}

export const UpdateQuantityCartAction = (product) => async (dispatch, getState) => {
    const cart = getState().cart.products;
    let total = 0;
    let item = cart.find(item => item.id == product.id);
    const totalUpdate = item.price * item.quantity;
    
    cart.forEach((x) => {
        if (x.id === product.id) {
            x.quantity = product.quantity;
            
        }
        
        total = total + (x.price * x.quantity);
        console.log(total)
    });

    dispatch({
        type: UPDATE_QUANTITY_CART,
        payload: {
            products: cart,
            total: total,
        }
    })
}

export const SaveCartToCotizacionAction = (cliente) => async (dispatch, getState) => {
    try {
        const cotizacion = await axios.post('cotizacion',{
            
                total : getState().cart.total,
                tipo : getState().cart.tipo_cotizacion,
                cliente : getState().cliente.cliente.id,
                detalle : {
                    detalles : getState().cart.products
                }
        });
        console.log(cotizacion.data)
        dispatch({
            type: SAVE_COTIZACION_SUCCESS,
            payload: {
                cotizacion : cotizacion.data
            }
        });
        sendMail(cotizacion.data.cliente,cotizacion.data.cotizacion);
        return true;
    }catch (error) {
        console.log(error)
        return false;
    }
}

export const ChangeTipoCotizacion = (tipo) => async (dispatch,getState) => {
    dispatch({
        type: SET_TIPO_COTIZACION,
        payload : {
            tipo : tipo,
        }
    })
}

function sendMail(cliente,cotizacion){
    const response = axios.post('sendMail', {
        mail : cliente.email,
        cotizacion : cotizacion
    });

    console.log(response.data)
}


