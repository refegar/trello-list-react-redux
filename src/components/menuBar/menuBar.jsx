import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Typography } from "@mui/material";
import FormLista from "../admin/lista/formLista";
import TablaLista from "../admin/lista/tablaLista";
import './menuBar.css'

const MenuBar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
<>


    <div style={{ display: "flex",position: "fixed",width:'100%' }}>
      {/* Menú lateral como segundo nav */}
      <nav
        style={{
          width: open ? "20%" : "1%",
          backgroundColor: "hsla(31.4, 16.8%, 24.5%, 0.9)",
          height: "100%",
          overflowX: "hidden",
          transition: "width 0.5s ease-in-out",
          position: "fixed",
          top: open? "10%": "0"
          
        }}
      >
        <Box role="presentation" sx={{ padding: open ? "1rem" : "0" }}>
          {open && (
            <ul style={{ listStyle: "none", padding: "1rem", margin: 0 }}>
              <li style={{ margin: "1rem 0", color: "white" }}>

              <> 
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,width:"200px"}}>
              Cerrar espacio

              <IconButton edge="start" color="inherit" 
            sx={{
            backgroundColor:"#0000003d",
             width:"30px",
             height:"30px",
             padding:"0",
             border:"2px solid #d2d1d1",
             marginLeft:"10px",
             
             }}  onClick={toggleDrawer}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg" >
                <path fillRule="evenodd" clipRule="evenodd" 
                  d="M15.1573 16.6865C15.2661 16.7938 15.3524 16.9215 15.4113 17.0624C15.4703 17.2033 15.5006 17.3545 15.5006 17.5073C15.5006 17.66 15.4703 17.8112 15.4113 17.9521C15.3524 18.093 15.2661 18.2208 15.1573 18.328C14.9368 18.5457 14.6394 18.6677 14.3296 18.6677C14.0197 18.6677 13.7223 18.5457 13.5018 18.328L10.0426 14.898C9.92341 14.7798 9.82877 14.6391 9.76419 14.4842C9.69961 14.3292 9.66636 14.1629 9.66636 13.995C9.66636 13.8271 9.69961 13.6609 9.76419 13.5059C9.82877 13.3509 9.92341 13.2102 10.0426 13.092L13.4901 9.67369C13.7107 9.45568 14.0083 9.33341 14.3185 9.33341C14.6286 9.33341 14.9262 9.45568 15.1468 9.67369C15.2556 9.78093 15.3419 9.90871 15.4008 10.0496C15.4598 10.1905 15.4901 10.3417 15.4901 10.4944C15.4901 10.6472 15.4598 10.7984 15.4008 10.9393C15.3419 11.0802 15.2556 11.208 15.1468 11.3152L12.4425 13.995L15.1573 16.6865V16.6865Z"
                 fill="#fff"/>
              </svg>
              
             </IconButton>
            </Typography>
           
            </>
          <hr />
              </li>
              <li style={{ margin: "1rem 0", color: "white" }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Tareas
            </Typography>
              </li>
 
            </ul>
          )}
        </Box>
      </nav>
  
    
      {/* Contenedor principal */}


      <Box
        component="main"
        sx={{
          marginLeft: open ? "20%" : "0",
          width: "100%",
          transition: "margin-left 0.5s ease-in-out"

        }}
      >
        {/* Barra de navegación principal */}
        <AppBar position="relative"  
        sx={{ 
        zIndex: 1201, 
        backgroundColor: "#0000003d", // Puedes usar un color hexadecimal
        color: "#fff",           // Cambia el color del texto si es necesario
        boxShadow: '1px 2px 1px -1px rgba(0,0,0,0.25), 0px 2px 0px 0px rgba(0,0,0,0.22)',


        }}>
          <Toolbar>
            {/* Botón para abrir/cerrar el menú */}

            { open? "":
            
            <>
            <IconButton edge="start" color="inherit" 
            sx={{backgroundColor:"#0000003d",
             width:"30px",
             height:"30px",
             padding:"0",
             border:"2px solid #d2d1d1",
             marginRight:"10px"
             
             }}  onClick={toggleDrawer}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.294 9.69805C10.2008 9.60614 10.1268 9.49661 10.0763 9.37584C10.0258 9.25507 9.99976 9.12546 9.99976 8.99455C9.99976 8.86364 10.0258 8.73403 10.0763 8.61327C10.1268 8.4925 10.2008 8.38297 10.294 8.29105C10.4831 8.10449 10.738 7.99988 11.0035 7.99988C11.2691 7.99988 11.524 8.10449 11.713 8.29105L14.678 11.2311C14.7802 11.3324 14.8614 11.453 14.9167 11.5858C14.9721 11.7186 15.0006 11.8611 15.0006 12.0051C15.0006 12.149 14.9721 12.2915 14.9167 12.4243C14.8614 12.5572 14.7802 12.6777 14.678 12.7791L11.723 15.7091C11.534 15.8959 11.2789 16.0007 11.013 16.0007C10.7472 16.0007 10.4921 15.8959 10.303 15.7091C10.2098 15.6171 10.1358 15.5076 10.0853 15.3868C10.0348 15.2661 10.0088 15.1365 10.0088 15.0056C10.0088 14.8746 10.0348 14.745 10.0853 14.6243C10.1358 14.5035 10.2098 14.394 10.303 14.3021L12.621 12.0051L10.294 9.69805V9.69805Z"
                  className="ghly4t0Xcm0PLQ"
                  fill="currentColor"
                ></path>
              </svg>

            </IconButton>
           
             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mi Aplicación
            </Typography>
            </>
}
           
          </Toolbar>
        </AppBar>

       
         {/* Contenedor de las tareas */}

      

    <Box
    sx={{
      
    marginLeft: open ? "5%" : "2%",
    width: "100%",
    transition: "margin-left 0.5s ease-in-out",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap", // Evita el salto de línea
    gap: "1rem", // Espaciado entre las tarjetas
    overflowX: "auto", // Activa el scroll horizontal
    padding: "1rem",
    boxSizing: "border-box", // Asegura que padding no desborde el contenedor
  
    }}
  >
    
    <FormLista />
    <TablaLista/> 
  </Box>
    
      </Box>
      </div>
</>
   

  );
};

export default MenuBar;
