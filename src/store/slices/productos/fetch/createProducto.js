import { addProductos } from ".."; // Importas la acción que añade el producto al estado
import { fetchAsync } from "../../../../utils/FetchAsync"; // Importas una función auxiliar para hacer la petición asincrónica

export const createProducto = (nuevoProducto) => async (dispatch) => {
    const url = import.meta.env.VITE_API_PRODUCTOS; // Obtienes la URL del endpoint desde las variables de entorno
    
    try {
        // Configuración de la solicitud HTTP POST
        
        // 1. Petición asincrónica al backend
        const nuevoProductoCreado = await fetchAsync('POST',`${url}administrar/create`, nuevoProducto); // Haces la solicitud POST y esperas la respuesta
        
        // 2. Una vez que se resuelve la petición, despachas la acción addProducto
        dispatch(addProductos(nuevoProductoCreado)); // En este paso, se actualiza el estado en el Store con el nuevo producto
    } catch (error) {
        console.log(error); // Si hay un error, lo capturas y lo imprimes en la consola
    }
};
