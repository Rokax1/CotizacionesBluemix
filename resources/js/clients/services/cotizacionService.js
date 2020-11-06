
export async function DeleteCot(id) {
    try {
        const response = await axios.delete("cotizacion/" + id);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function GetDetalles(cotizacion){
    try {
        const response = await axios.get("detalles/cotizacion/" + cotizacion);
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e);
        return false;
    }
}