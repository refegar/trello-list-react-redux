import { removeProducto } from ".."
import { fetchAsync } from "../../../../utils/FetchAsync"

// ! Accion thunk (asincronico) para la eliminacion del producto del backend
export const deleteProducto = (id) => async (dispatch) => {
    const url = import.meta.env.VITE_API_PRODUCTOS;
 
    try {
        const urlEliminar = `${url}administrar/delete/${id}`;
       
        const productoEliminado = await fetchAsync('DELETE',urlEliminar);
        const data = {
            productoEliminado,
            id
        }
        dispatch(removeProducto(data));  // Acción para actualizar el estado en Redux
    } catch (error) {
        console.error('Error al eliminar:', error);
    }
};
