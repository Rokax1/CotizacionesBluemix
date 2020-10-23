import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import tunks from 'redux-thunk';

import productsReducer from './redux/productDucks';
import categoriesReducer from './redux/categoryDucks';
import globalActionsReducer from './redux/reducer';
import cartReducer from './redux/cartDucks';

// EXTENCIÓN GOOGLE CHROME
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const rootReducer = combineReducers({
    productos : productsReducer,
    globalActions : globalActionsReducer,
    categories: categoriesReducer,
    cart:  cartReducer
});

export default function generateStore(){
    const store = createStore(rootReducer,composeEnhancer( applyMiddleware(tunks) ));
    return store;
}
