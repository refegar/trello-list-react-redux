//rafce
//import React from 'react' // esta parte se borra
import Rutas from "./routers/rutas"
import NavBar from "./components/navBar/NavBar.jsx"
import './vendor/js/bootstrap.bundle.min.js'
import './vendor/js/popper.min.js'


const App = () => {

  return (
   <>
   <NavBar/>
 
   <Rutas />
   </>
 
  )

}

export default App