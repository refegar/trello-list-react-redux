import { useFormik } from "formik"
import './reguistro.css'
import { fetchAsync } from "../../../../utils/FetchAsync"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const reguistro = () => {

  /* Expresiones regulares -> caracteres que definen un 
  https://regex101.com mejor https://regexr.com/
  patron de busqueda. pueden usar para valoraciones de formatos,validaciones formularios,buscar */

const navigate = useNavigate();
const handleReguistrar = async (values) =>{

  const url = import.meta.env.VITE_API_PRODUCTOS; 
    
    try {
        // Configuración de la solicitud HTTP POST
        // 1. Petición asincrónica al backend
    fetchAsync('POST',`${url}auth/signup`, {
      "firstName": values.firstName,
      "lastName": values.lastName,
      "email": values.email,
      "password": values.password
  })
      
      Swal.fire({
        title: `Se ha registrado correctamente ${values.firstName}`,
        text: `Le enviamos un correo de confirmacion`,
        icon: "success",
        confirmButtonText: "Aceptar"
         });
     
      navigate('/login')
  
      

    } catch (error) {
        console.log('Error al crear el usuario',error); // Si hay un error, lo capturas y lo imprimes en la consola
    }

}
  const valoresIniciales = {
    
    firstName:'',
    lastName:'',
    email:'',
    password:''
    
  }

  const validaciones =(values)=>{
    
      const errores={}
      const expresionesRegularCorreo = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
     // const expresionRegularPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
  
      if(!values.firstName){
  errores.firstName='El campo nombre es obligatorio'
  }
  if(!values.lastName){
    errores.apellido='El campo apellido es obligatorio'
    }
    
  if(!values.email){
    errores.email='El campo correo es obligatorio'
    }
    else if(!expresionesRegularCorreo.test(values.email)){
     errores.email = 'No es valido el correo ingresado'
    }
    if(!values.password){
        errores.password='El campo contraseña es obligatorio'
        }
       /* else if(!expresionRegularPassword.test(values.password)){
        errores.password = 'El campo contraseña no cumple con nuestra politicas'
        }*/
  
      return errores
    
  }

  const enviarInformacion = (values)=>{
    console.log('******************* Iniciando el envio de la data')
    console.log(values)

  }

const {values,handleChange,handleSubmit,handleReset,errors} = useFormik(

  {
  initialValues:valoresIniciales,
  onSubmit:handleReguistrar,
  validate:validaciones
})


  return (
<div className="containerReg mb-5"> 
<form className="p-5 m-2 w-50 -auto rounded-3 m-auto"
  onSubmit={handleSubmit}
  >
  {/** Campo nombre */}
  <div className="mb-3">
  <div className="text-center pb-3">Registrar usuario</div>
  <label htmlFor="lbl-firstName" className="from-label fs-5">Nombre</label>
  <input type="text" name="firstName" value={values.firstName} onChange={handleChange} id="lbl-firstName"  className="form-control" placeholder="Campo nombre" />
  {errors.firstName ? <small className="errorFormulario">{errors.firstName}</small>:''}
 
  </div>

   {/** Campo Apellido */}
   <div className="mb-3">
  <label htmlFor="lbl-apellido" className="from-label fs-5">Apellido</label>
  <input type="text" name="lastName" value={values.lastName} onChange={handleChange}  id="lbl-apellido" className="form-control" placeholder="Apellido" />
  {errors.apellido ? <small className="errorFormulario">{errors.apellido}</small>:''}
  </div>
{/** Campo Correo */}
  <div className="mb-3">
  <label htmlFor="lbl-email" className="from-label fs-5">E-mail</label>
  <input type="text" name="email" value={values.email} onChange={handleChange} id="lbl-email" className="form-control" placeholder="Correo@email.com" />
  {errors.email ? <small className="errorFormulario">{errors.email}</small>:''}

  </div>
 
  {/** Campo Contraseña */}
  <div className="mb-3">
  <label htmlFor="lbl-pass" className="form-label fs-5">Contraseña</label>
  <input type="text" name="password" value={values.password} onChange={handleChange}  id="lbl-pass" className="form-control" placeholder="Password" />
  {errors.password ? <small className="errorFormulario">{errors.password}</small>:''}

  </div>

  <button type="submit" className="buttonEnviar me-2 mt-3 fs-5">Enviar</button>
  <button type="reset" className="buttonReset  fs-5 " onClick={handleReset}>reset</button>
  </form>
</div>
  )
}

export default reguistro