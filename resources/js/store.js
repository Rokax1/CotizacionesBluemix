import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import tunks from 'redux-thunk';

import productsReducer from './redux/productDucks';
import categoriesReducer from './redux/categoryDucks';
import globalActionsReducer from './redux/reducer';
import cartReducer from './redux/cartDucks';
import clienteReducer from './redux/clienteDucks';
import cotizacionReducer from './redux/cotizacionDucks';

// EXTENCIÓN GOOGLE CHROME
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const rootReducer = combineReducers({
    productos : productsReducer,
    globalActions : globalActionsReducer,
    categories: categoriesReducer,
    cart:  cartReducer,
    cliente: clienteReducer,
    cotizaciones: cotizacionReducer,
});

export default function generateStore(){
    const store = createStore(rootReducer,composeEnhancer( applyMiddleware(tunks) ));
    return store;
}
