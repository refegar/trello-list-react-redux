import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductos } from '../../../store/slices/productos/fetch/getAllProductos';
import { createListaTarea } from '../../../store/slices/productos/fetch/createListaTarea';
import { Box, TextField, Button, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const formLista = () => {

  // ! useSelector

  const {productoEditar} = useSelector(store=>store.productos)
 
const [open, setOpen] = useState(false); // Inicializa el estado correctamente
const dropdownRef = useRef(null);

const handleOpen = () => {
  setOpen(true)
  };

  const handleClickOutside = (event) => {
    // Verifica si el clic fue fuera del dropdown pero no en el button/input
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.closest('.exception')
    ) {
      setOpen(false);
      setOpenLista(false)
    }
  };

  const handleClose = () => setOpen(false);
  // !useDispatch
  const dispatch = useDispatch()


  const formInicial = {
    id: null,
    nombre: '',
    categoria: '',
    precio: ''
  }

  const [form, setForm] = useState(formInicial)

useEffect(()=>{

   //productoEditar ? setForm(productoEditar):setForm(formInicial) // o cargar uno nuevo
   document.addEventListener("mousedown", handleClickOutside);
   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
   };

},[])


  const handleChange = e => {
    const obj = {
      ...form,
      [e.target.name]: e.target.value
    }
    setForm(obj)
  }

  const handleReset = () => {
    console.log('Resetear...')
    setForm(formInicial) // Resetea el formulario al valor inicial()
  }

  const handleSubmit = async(e) => {
    
    e.preventDefault()
    console.log('Enviando el formulario....')
    if(form.id===null){
      try {
        // Espera a que la tarea sea creada
        await dispatch(createListaTarea(form));
        
        // Una vez completado, recupera todos los productos
        await dispatch(getAllProductos());
      } catch (error) {
        console.error('Error al crear y obtener productos:', error);
      }
    }
    handleReset() // Resetea el formulario después de enviar los datos
    
  }

  const cambiarTexto = (datoA,datoB)=>{
    return productoEditar ? 'Edicion':'Añadir lista'
  }

  
  return (
    <>

<Box sx={{ width: "100%", color: "#fff",marginLeft:"5px",marginTop:"10%",marginBottom:"100px" }}>
      {/* Botón para abrir el modal */}
     
     {

      open===false?( <Button
        type="submit"
        variant="contained"
        sx={{
          width: "300px",
          textTransform: "none", // Evita que se traduzca a mayúsculas
          backgroundColor: "#ffffff7a", // Color de fondo personalizado
          borderRadius: "10px",
          textAlign: "left",
          padding: "10px",
        }}
        onClick={handleOpen}
      >
        <Typography variant="h6" component="span" color="#000" sx={{ flexGrow: 4 }}>
          + añade otra lista
        </Typography>
      </Button>):(
      <Box
            component="form"
            onSubmit={handleSubmit}
            ref={dropdownRef}
            sx={{
              width: "300px",
              display: "flex",
              flexDirection: "column", // Apila los elementos verticalmente
              border: "1px solid #e1e1e1", // Similar a `border-success` en Bootstrap
              borderRadius: 3,
              paddingX: 2,
              paddingY: 2,
              marginBottom: 2,
              backgroundColor: "#f1f2f4",
              boxShadow: 3,
            }}
          >
            {/* Campo Nombre */}
            <Box sx={{ marginBottom: 3, width: "100%" }}>
              <TextField
                id="lbnombre"
                onChange={handleChange}
                name="nombre"
                value={form.nombre}
                placeholder="Ingrese el nombre de la lista..."
                variant="outlined"
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  "&:hover": {
                    border: "2px solid #fff"
                  },
                }}
              />
            </Box>
  
            {/* Botón Submit */}
            <Box sx={{ width: "100%" }}>
              <Button type="submit" variant="contained" color="info">
                {cambiarTexto("Edicion", "Actualizar")}
              </Button>
  
              <IconButton
                ref={dropdownRef}
                aria-label="quitar"
                onClick={handleClose}
                sx={{
                  marginLeft: "10px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#091e424f",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>)

     }

     
    </Box>
    </>
  )
}

export default formLista
