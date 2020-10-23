const dataCart = {
    products: [],
    total: 0,
    iva: 0,
}

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_TO_CART = 'REMOVE_TO_CART';
const ADD_QUANTITY = 'ADD_VALUE_CANTIDAD';
const REMOVE_QUANTITY = 'ADD_VALUE_CANTIDAD';
const SEND_CART = 'SEND_CART';


export default function cartReducer(state = dataCart, action) {
    
    switch (action.type) {
        case ADD_TO_CART:
            return { products: action.payload.cartItems }; 
        case REMOVE_TO_CART:
            
            return state;
        default:
            return state;
    }
}

export const addCartProductAction = (product) => async (dispatch, getState) => {
    
    const cartItems = getState().cart.products.slice();
    let total = getState().cart.total;
    let iva = getState().cart.iva;
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
    dispatch({
        type: ADD_TO_CART,
        payload: { cartItems },
    });
    //total = total + (product.price * product.cantidad);
    //iva = iva + (total * 0.19);

}

export const RemoveCartProductAction = (product) => async (dispatch, getState) => {
    console.log('entra aca');
    let total = getState().cart.total;
    let iva = getState().cart.iva;
    total = total - product.price;
    dispatch({
        type: REMOVE_TO_CART,
        payload: {
            product: product,
            total: total,
        }
    })

}
