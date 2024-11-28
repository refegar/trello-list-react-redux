import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, TextField, Button, Typography,Modal } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { updateLista } from '../../../store/slices/productos/fetch/updateLista';
import { getAllProductos } from '../../../store/slices/productos/fetch/getAllProductos';
import { getAllTarjetas } from '../../../store/slices/productos/fetch/getAllTarjetas';
import { createTarjeta } from '../../../store/slices/productos/fetch/createTarjeta';
import { updateStateTarjeta } from '../../../store/slices/productos/fetch/updateStateTarjeta';

const TablaListaFila = ({NombreLista}) => {
  
  const {productoEditar} = useSelector(store=>store.productos)
  const {listadoTarjeta: listaTarjeta}=useSelector((store)=>{
    return store.productos
  })
  const [open, setOpen] = useState(false); // Inicializa el estado correctamente
  const [nombre, setNombre] = useState(NombreLista)
  const [openLista, setOpenLista] = useState(false);
  const dropdownRef = useRef(null);

  const handleOpen = () => {
    setOpen(true)
    };
  
    const handleOpenLista= () => {
    setOpenLista(true)
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
      nombre: ''
    }
    const formTarjeta = {
      id: null,
      nombre: '',
      descripcion: "",
      estado:"",
      userId: null,
      comentarios: []
    }
    
  
    const [form, setForm] = useState(formInicial)
    const [AddTarjeta, setAddTarjeta] = useState(formTarjeta)

  
  useEffect(()=>{
    // productoEditar ? setForm(productoEditar):setForm(formInicial) // o cargar uno nuevo
   dispatch(getAllTarjetas())
    document.addEventListener("mousedown", handleClickOutside);
   return () => {
     document.removeEventListener("mousedown", handleClickOutside);
   };
  },[])
  

const handleChange = e => {
  const obj = {
    ...form,
    [e.target.name]: e.target.value,
    id: NombreLista.id // Añade la propiedad id con su valor
  };
  setNombre(obj);
  setForm(obj)
};
  
const handleChangeTarjeta = e => {
  const obj = {
    ...AddTarjeta,
    [e.target.name]: e.target.value,
    estado:nombre.nombre
  };
  setAddTarjeta(obj)
};
    const handleReset = () => {
      console.log('Resetear...')
      setAddTarjeta(formTarjeta) // Resetea el formulario al valor inicial()
    }

    const handleAddTarjeta = async(e) => {
    
      e.preventDefault()
      console.log('Enviando el formulario....')
      try {
        // Espera a que la tarea sea creada
        await dispatch(createTarjeta(AddTarjeta));
        // Una vez completado, recupera todos los productos
        await dispatch(getAllTarjetas());
        setOpen(false)
      } catch (error) {
        console.error('Error al crear y obtener productos:', error);
      }      
    }
  
    const handleSubmit = async(e) => {
    
      e.preventDefault()
      console.log('Enviando el formulario....')
      try {
        // Espera a que la tarea sea creada
        await dispatch(updateLista(form));
        // Una vez completado, recupera todos los productos
        await dispatch(getAllProductos());
        setOpenLista(false)
      } catch (error) {
        console.error('Error al crear y obtener productos:', error);
      }      
    }
    
  
    // metodo drag y drop

    const handleDragStart = (e, tarjeta) => {
      e.stopPropagation();
      e.dataTransfer.setData("text/plain", JSON.stringify(tarjeta));
      console.log(tarjeta.nombre);
    };
    
    const handleDrop = async (e, tarjetaDestino) => {
      e.preventDefault();
      e.stopPropagation();
    
      const tarjetaOrigen = JSON.parse(e.dataTransfer.getData("text/plain"));
    
      await dispatch(
        updateStateTarjeta({ id: tarjetaOrigen.id, estado: tarjetaDestino })
      );
      await dispatch(getAllTarjetas());
    };
    
    return (
      <>
  
  <Box
  
  sx={{ width: "100%", color: "#000", height:"auto",cursor:"pointer",paddingBottom:"40px"}}>  
  
  <Box
  component="form"
  onSubmit={handleSubmit}
  onDragOver={(e) => e.preventDefault()} // Permite que el área sea un destino válido
  onDrop={(e) => handleDrop(e,NombreLista.nombre)} // Maneja el evento de soltar
  sx={{
    width: "250px",
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
      <Box 
  sx={{ 
    marginBottom: 3, 
    width: "100%", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center" // Alinea verticalmente los elementos
  }}
>
  {/* Título */}
  {openLista === false ? (
    <h5 onClick={() => setOpenLista(true)}>{NombreLista.nombre}</h5>
  ) : (
    <Box  ref={dropdownRef}>
      <TextField
        id="lbnombre"
        onChange={handleChange}
        name="nombre"
        value={nombre.nombre}
        variant="outlined"
        sx={{
          width: "100%",
          marginBottom: "10px",
          backgroundColor: "#fff",
          "&:hover": {
            border: "2px solid #fff",
          },
        }}
      />
      <Button
        variant="contained"
        color="info"
        className="exception" // Añadimos excepción para que no se cierre el método frontal
        onClick={handleSubmit}
        sx={{ marginTop: "10px" }}
      >
        Actualizar
      </Button>
    </Box>
  )}

  {/* Ícono de opciones (tres puntos) */}
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
    <MoreHorizIcon />
  </IconButton>
</Box>

{/**Las tarjetas */}
{
  listaTarjeta?.filter((tarjeta) => tarjeta.estado === `${nombre.nombre}`).map((tarjeta) => (
    <Button
      key={tarjeta.id}
      ref={dropdownRef}
      draggable // Hace que la tarjeta sea arrastrable
      onDragStart={(e) => handleDragStart(e, tarjeta)} // Evento al comenzar el arrastre
      onDragOver={(e) => e.preventDefault()} // Permite el drop
     
      variant="contained"
      sx={{
        width: "100%",
        textTransform: "none",
        backgroundColor: "#fff",
        borderRadius: "10px",
        textAlign: "left",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <Typography variant="h7" component="span" color="#000" sx={{ flexGrow: 4 }}>
        {tarjeta.nombre}
      </Typography>
    </Button>
  ))
}
      {/* Botón Submit */}
      <Box
      
      sx={{ width: "100%" }}>
      {

open===false?( 
<Button
  ref={dropdownRef}
  type="submit"
  variant="contained"
  sx={{
    width: "100%",
    textTransform: "none", // Evita que se traduzca a mayúsculas
    backgroundColor: "#ffffff3d", // Color de fondo personalizado
    borderRadius: "10px",
    textAlign: "left",
    padding: "10px",
  }}
  onClick={handleOpen}
>
  <Typography variant="h7" component="span" color="#000" sx={{ flexGrow: 4 }}>
    + añade una tarjeta
  </Typography>
</Button>):(
<Box
      component="form"
      onSubmit={handleSubmit}
      ref={dropdownRef}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column", // Apila los elementos verticalmente
        border: "none", // Similar a `border-success` en Bootstrap
        borderRadius: 3,
        marginBottom: 2,
        backgroundColor: "#f1f2f4",
      
      }}
    >
    
      {/* Campo Nombre */}
      <Box 
      
      sx={{ marginBottom: 3, width: "100%" }}>
        <TextField
          id="lbnombre"
          onChange={handleChangeTarjeta}
          name="nombre"
      
          placeholder="Introduce un titulo o un enlace..."
          variant="outlined"
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            "&:hover": {
              border: "2px solid #fff",
            },
          }}
        />
      </Box>

      {/* Botón Submit */}
      <Box sx={{ width: "100%" }}>
        <Button type="submit" variant="contained" color="info" onClick={handleAddTarjeta}>
          Añadir tarjeta
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
    </Box>
  
      </Box>
      </>
    )

}

export default TablaListaFila