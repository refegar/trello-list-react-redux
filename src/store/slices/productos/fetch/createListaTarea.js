import { addListaTarea } from ".."; // Importas la acción que añade el producto al estado
import { fetchAsync } from "../../../../utils/FetchAsync"; // Importas una función auxiliar para hacer la petición asincrónica

export const createListaTarea = (nuevoLista) => async (dispatch) => {
    const url = import.meta.env.VITE_API_PRODUCTOS; // Obtienes la URL del endpoint desde las variables de entorno
    
    try {
        // Configuración de la solicitud HTTP POST
        
        // 1. Petición asincrónica al backend
        const nuevoListaCreada = await fetchAsync('POST',`${url}lista`, nuevoLista); // Haces la solicitud POST y esperas la respuesta
        
        // 2. Una vez que se resuelve la petición, despachas la acción addProducto
        dispatch(addListaTarea(nuevoListaCreada)); // En este paso, se actualiza el estado en el Store con el nuevo producto
     
    } catch (error) {
        console.log(error); // Si hay un error, lo capturas y lo imprimes en la consola
    }
};
