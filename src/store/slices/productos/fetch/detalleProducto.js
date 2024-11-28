// ! middleware (Redux thunk) -> es el resposable de gestionar la asincronica
// creamos la asccion asincronica que va a obtenr todos los productos


import { setListaProducto } from ".."
import { fetchAsync } from "../../../../utils/FetchAsync"

export const detalleProducto = (nombreProducto) => async(dispatch)=>{
    const url = import.meta.env.VITE_API_PRODUCTOS

try{

    const data = await fetchAsync('GET',`${url}detalleProducto/${nombreProducto}`)
    // 
   // 2. Ya es sincronico (Hago el dispatch de la accion sincronica)
   dispatch(setListaProducto(data))
}
catch(error){
console.error(error)
}

}
