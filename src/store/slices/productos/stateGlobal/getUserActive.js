import { fetchAsync } from "../../../../utils/FetchAsync";
import { setUserActive } from "..";
import { setUserActiveCorreo } from "..";
import { FetchName } from "../../../../utils/FetchName";
import { FetchSesion } from "../../../../utils/FetchSesion";

export const getUserActive = () => async(dispatch)=>{

    const url = import.meta.env.VITE_API_PRODUCTOS; 
    
    try {
        // Configuración de la solicitud HTTP POST
        // 1. Petición asincrónica al backend
      const userActive = await FetchName('GET',localStorage.getItem('sesion'),`${url}Profile`)
            //console.log('Nombre de usuario: ',userActive.userName)
            dispatch(setUserActive(userActive.userName))
            //setUserActiveCorreo
           // dispatch(setUserActiveCorreo(localStorage.getItem('correo')))
         




    } catch (error) {
        console.log('Usuario No logueado'); // Si hay un error, lo capturas y lo imprimes en la consola
    }

}