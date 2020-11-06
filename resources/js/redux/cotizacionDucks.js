const dataCotizaciones = {
    cotizaciones: [],
    loader : true,
}

const GET_COTIZACIONES_ADMIN = 'GET_COTIZACIONES_ADMIN';
const SET_LOADER_COTIZACIONES_ADMIN = 'SET_LOADER_COTIZACIONES_ADMIN';


export default function cotizacionReducer(state = dataCotizaciones, action) {
    
    switch (action.type) {
        case GET_COTIZACIONES_ADMIN:
            return { ...state, cotizaciones: action.payload}; 
        case SET_LOADER_COTIZACIONES_ADMIN:
            return {...state, loader : action.payload };
        default:
            return state;
    }
}

export const getCotizacionesAdminAction = () => async (dispatch, getState) => {
    dispatch({
        type: SET_LOADER_COTIZACIONES_ADMIN,
        payload : true
    })
    try {
        const cotizaciones = await axios.get('cotizacion');
        dispatch({
            type: GET_COTIZACIONES_ADMIN,
            payload : cotizaciones.data
        })
        return cotizaciones.data;
    } catch (e) {
        console.log(e);
        return false;
    }finally{
        dispatch({
            type: SET_LOADER_COTIZACIONES_ADMIN,
            payload : false
        })
    }
    
    //iva = iva + (total * 0.19);

}


export const filterCotizacion = (tipo,parametro) => async (dispatch,getState) => {
    dispatch({
        type: SET_LOADER_COTIZACIONES_ADMIN,
        payload : true
    });
    try {
        const cotizaciones = await axios.get('cotizacion?'+ tipo + '=' + parametro); 
        dispatch({
            type: GET_COTIZACIONES_ADMIN,
            payload : cotizaciones.data
        });
    } catch (error) {
        console.log(error);
        
    }finally{
        dispatch({
            type: SET_LOADER_COTIZACIONES_ADMIN,
            payload : false
        })
    }
   

   }




