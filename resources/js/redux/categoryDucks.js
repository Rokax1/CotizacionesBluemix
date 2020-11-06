//constantes 
const dataCategories = {
    categorias : [],
    loader : false,
}

const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
const GET_CATEGORIES_ERROR = 'GET_CATEGORIES_ERROR';
const SET_CATEGORY_LOADER = 'SET_CATEGORY_LOADER';

//reducer

export default function categoriesReducer(state = dataCategories,action) {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return { ...state, categorias: action.payload}
        case SET_CATEGORY_LOADER:
            return { ...state, loader: action.payload}
        default:
            return state;
    }
}

export const getCategoriesAction = () => async (dispatch,getState) => {
        dispatch({
            type: SET_CATEGORY_LOADER,
            payload : true
        })
        try {
            let categoriasPrimarias = [];
            const categories = await axios.get("getCategories");
            const grouped = groupBy(categories.data, categoria => categoria.category.parent_id);
            grouped.forEach( (grupo,key) => {
                if(key == null){
                    grupo.map( (categoria) => {
                        categoria.category.sub = [];
                        categoriasPrimarias.push(categoria.category)
                    } )
                }else{
                    var categoriaPrincipal = categoriasPrimarias.find( (element) => element.id  == key);
                    if(categoriaPrincipal){
                        categoriaPrincipal.sub = grupo;
                    }
                }
            });
           
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload : categoriasPrimarias
            })
            return categories.data;
        } catch (e) {
            console.log(e);
            return false;
        } finally{
            dispatch({
                type: SET_CATEGORY_LOADER,
                payload : false
            })
        }
}

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}