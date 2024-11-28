//aCTION THUNK (ASINCRONICO) PARA EDICION PRODUCTO

import { editProducto } from ".."
import { fetchAsync } from "../../../../utils/FetchAsync"

export const updateProducto = (productoEditado) => async (dispatch)=>{
  
    const url = import.meta.env.VITE_API_PRODUCTOS

    try {
   
    // 1. La peticion asincronica que modifica u  producto
    const id = productoEditado.id
    const urlActualizado = `${url}administrar/edit/${id}`  // http://Locall.../productos/id

    const data = await fetchAsync('PUT',urlActualizado,productoEditado)
   
   //2. Disparar la accion sincronica
   
   dispatch(editProducto(data))

    } catch (error) {
        console.error(error)
    }

}