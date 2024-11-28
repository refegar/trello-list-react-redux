import "./NavBar.css/"
import ItemNav from './ItemNav'
import { Link } from "react-router-dom"
import { menuItems } from '../../constants/Menuitems'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserActive } from "../../store/slices/productos/stateGlobal/getUserActive"
import { fetchAsync } from "../../utils/FetchAsync"
import { setUserActive } from "../../store/slices/productos"
import Swal from "sweetalert2"
import { FetchSesion } from "../../utils/FetchSesion"


const NavBar = () => {

    const url = import.meta.env.VITE_API_PRODUCTOS; 
    const { userActive: sesionActiva } = useSelector((store) => store.productos);
    const dispatch = useDispatch();
    
    useEffect(() => {
        
      dispatch(getUserActive())
        
    }, [dispatch]);
   
 
    
  const handleCloseSesion = async() =>{
    console.log('Cerrar sesion...')
     dispatch(setUserActive(null))
    try {
    
    await FetchSesion('GET',localStorage.getItem('sesion'),`${url}auth/disable-2fa`)
    localStorage.removeItem('sesion')

    Swal.fire({
      title: "Cierre de sesion",
      text: `Se ha cerrado sesion correctamente.`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
    
    } catch (error) {
      console.log('Erro al cerrar sesion',error)
    }
    
  }

   // Función para obtener las iniciales
   const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };


  
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand-new roboto-black fs-4 pe-2 ps-4" to="/">Trello-Clone!</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="inicio">
          <ul className="navbar-nav">
            {
              menuItems.map((items) => (
                <ItemNav 
                  key={items.id} // Agrega la prop key aquí con un valor único
                  iditems={items.id} 
                  nombreitem={items.nombre} 
                  rutaitem={items.ruta} 
                />
              ))
            }
          </ul>

           {/* Carrito de compras */}
           
           <div className="ms-auto pe-4 d-flex">
           <input className="form-control-search mr-sm-2 me-2  bsSearch" type="search" placeholder="Search"/>
           
           {
            sesionActiva != null  ? (
              <li className="nav-item dropdown ms-3 color-shabu-suchi fs-4">
          <button className="btn btn-primary rounded-circle "
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.2rem',
          padding: 0,
        }}>
            {getInitials(sesionActiva)}
          </button>
          <ul className="dropdown-menu custom-center" >
            <li><a className="dropdown-item" href="#" onClick={handleCloseSesion}>Cerrar sesion</a></li>
            
          </ul>
        </li>
            ):('')
          }

    <button
    type="button"
    className="buttonNavbar btn position-relative">
        <a href="/login" className="color-negro">
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="nav__profile__button" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path></svg>
    </a>
    </button>
    
 


</div>
        </div>
      </nav>

    </>
  );
}

export default NavBar;
