//aCTION THUNK (ASINCRONICO) PARA EDICION PRODUCTO

import { editLista } from ".."
import { fetchAsync } from "../../../../utils/FetchAsync"

export const updateLista = (listaEditada) => async (dispatch)=>{
  
    const url = import.meta.env.VITE_API_PRODUCTOS

    try {
   
    // 1. La peticion asincronica que modifica u  producto
    const id = listaEditada.id
    const urlActualizado = `${url}lista/${id}`  // http://Locall.../productos/id

    const data = await fetchAsync('PUT',urlActualizado,listaEditada)
   
   //2. Disparar la accion sincronica
   
   await dispatch(editLista(data))

    } catch (error) {
        console.error(error)
    }

}