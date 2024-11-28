import Swal from 'sweetalert2'
import { totp } from 'otplib';
import { fetchAsync } from "../../../../utils/FetchAsync"
import { setUserActive } from '..';
import { FetchName } from '../../../../utils/FetchName';
import { FetchSesion } from '../../../../utils/FetchSesion';



export const sessionUsers = (values) => async(dispatch)=>{

    
    const url = import.meta.env.VITE_API_PRODUCTOS; 
    
    try {
        // Configuración de la solicitud HTTP POST
        // 1. Petición asincrónica al backend
    const sesion = await fetchAsync('POST',`${url}auth/login`,values)
   
        Swal.fire({
         title: "Inicio Sesion",
         text: `Se ha iniciado sesion correctamente.`,
         icon: "success",
         confirmButtonText: "Aceptar"
          });

        localStorage.sesion=sesion.accessToken
        await FetchSesion('GET',sesion.accessToken,`${url}auth/enable-2fa`)
        const nameUserActive = await FetchName('GET',localStorage.sesion,`${url}profile`)
     
         //console.log('Clave es: ',nameUserActive.userName)
         dispatch(setUserActive(nameUserActive.userName))

    } catch (error) {
        console.log('Error al iniciar sesion',error); // Si hay un error, lo capturas y lo imprimes en la consola
    }

}