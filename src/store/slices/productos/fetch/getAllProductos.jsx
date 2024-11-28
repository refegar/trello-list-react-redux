// ! middleware (Redux thunk) -> es el resposable de gestionar la asincronica
// creamos la asccion asincronica que va a obtenr todos los productos


import { setListaTarea } from ".."
import { fetchAsync } from "../../../../utils/FetchAsync"

export const getAllProductos = () => async(dispatch)=>{
    const url = import.meta.env.VITE_API_PRODUCTOS

try{

    const data = await fetchAsync('GET',`${url}lista`)
    // 
   // 2. Ya es sincronico (Hago el dispatch de la accion sincronica)
   dispatch(setListaTarea(data))
}
catch(error){
console.error(error)
}

}
