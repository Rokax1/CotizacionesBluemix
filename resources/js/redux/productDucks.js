//constantes 
const dataProducts = {
    productos : [],
    loaderProductos : true,
    paginas : 10,
    page : 1,
    category : 'todas',
    query : false,
    producto: [],
}

const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
const SET_LOADER = 'SET_LOADER';
const SET_LOADER_PRICE = 'SET_LOADER_PRICE';
const SET_CATEGORY = 'SET_CATEGORY';
const SET_PAGE = 'SET_PAGE';
const SET_QUERY = 'SET_QUERY';
//reducer

export default function productsReducer(state = dataProducts,action) {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return { ...state, productos: action.payload.productos, paginas: action.payload.paginas}
        case GET_PRODUCT_SUCCESS:
            return { ...state, producto: action.payload.producto}
        case SET_LOADER:
            return { ...state, loaderProductos: action.payload}
        case SET_CATEGORY:
            return {...state, category: action.payload}
        case SET_PAGE:
            return {...state, page: action.payload}
        case SET_QUERY:
            return {...state, query: action.payload}
        default:
            return state;
    }
}

//acciones

export const getProductsAction = (category, pagina = 1,querySearch = false) => async (dispatch,getState) => {   
        setCategory(dispatch,category);
        setPage(dispatch,pagina);
        setQuery(dispatch,querySearch);
        const categoria = getState().productos.category;
        const page = getState().productos.page;
        const query = getState().productos.query;
        dispatch({
            type: SET_LOADER,
            payload : true
        })
        try {
            const products = await axios.get("product?page="+page+"&category="+ categoria + "&querySearch=" + query);
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload : {
                    productos : products.data.productos,
                    paginas : products.data.paginas
                }
            })
            return products.data;
        } catch (e) {
            console.log(e);
            return false;
        }finally{
            dispatch({
                type: SET_LOADER,
                payload : false
            })
        }
}

export const getProductAction = (id) => async (dispatch,getState) => {   
    
    try {
        const product = await axios.get('getProduct/' + id);
        console.log(product.data.product);
        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload : {
                producto : product.data.product,
            }
        })
        return products.data;
    } catch (e) {
        console.log(e);
        return false;
    }
}


function setCategory(dispatch,category){
    
    if(category != null){
        dispatch({
            type: SET_CATEGORY,
            payload : category
        })   
    }
}

function setPage(dispatch,page){
        dispatch({
            type: SET_PAGE,
            payload : page
        })   
}

function setQuery(dispatch,query){
    dispatch({
        type: SET_QUERY,
        payload : query
    })   
}

