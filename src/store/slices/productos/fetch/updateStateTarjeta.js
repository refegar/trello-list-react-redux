//aCTION THUNK (ASINCRONICO) PARA EDICION PRODUCTO

import { editEstadoTarjeta} from ".."
import { fetchAsync } from "../../../../utils/FetchAsync"

export const updateStateTarjeta = (tarjetaEditada) => async (dispatch)=>{
  
    const url = import.meta.env.VITE_API_PRODUCTOS

    try {
   
    // 1. La peticion asincronica que modifica u  producto
    const id = tarjetaEditada.id
    const urlActualizado = `${url}tarjeta/${id}`  // http://Locall.../productos/id

    const data = await fetchAsync('PUT',urlActualizado,tarjetaEditada)
   
   //2. Disparar la accion sincronica
   
   dispatch(editEstadoTarjeta(data))

    } catch (error) {
        console.error(error)
    }

}