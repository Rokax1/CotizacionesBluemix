
export async function getProductsApi() {
    try {
        const products = await axios.get("product");
        console.log(products);
        return products.data;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function getCategories(){
    try {
        const categories = await axios.get("getCategories");
        console.log(categories);
        return categories.data;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function getPrecio(sku){
    try {
        const precio = await axios.get("product/" + sku + "/obtenerPrecio");
        console.log(precio);
        return precio.data;
    } catch (error) {
        console.log(e);
        return false;
    }
}