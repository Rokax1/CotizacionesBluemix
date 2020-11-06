
export async function UpdateUserPassword(formData) {
    const form = {...formData, user: localStorage.getItem('USER')};
    try {
        const user = await axios.put("user/change-password",form);
        console.log(user);
        return user;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function CreateClient(formData) { 
    try {
        const response = await axios.post("cliente",formData);
        if (response.status == 422){
            console.log(response);
            return {
                created:false,
                error:response.data.errors,
            }
        }
        return {created:true, contraseña: response.data.password};
    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function DeleteClient(id){
    try {
        const response = await axios.delete("cliente/" + id);
        return {...response};
    } catch (error) {
        return error;
    }
}