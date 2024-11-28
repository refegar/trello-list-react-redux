import { useRoutes } from "react-router";
import Inicio from "../pages/Inicio";
import Productos from "../pages/Recent";
import Nosotros from "../pages/Workspace";
import NoEncontrado from "../pages/NoEncontrado";
import Reguistro from "../components/admin/logueo/reguistro/reguistro";
import Login from "../components/admin/logueo/login/login";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductos } from "../store/slices/productos/fetch/getAllProductos";
import { useEffect } from "react";

const Rutas = () => {
    const dispatch = useDispatch();
    const { listadoProductos: productos } = useSelector((store) => store.productos);

    useEffect(() => {
        dispatch(getAllProductos()); // Acción asincrónica para obtener productos
    }, [dispatch]);

    // Definir rutas estáticas primero
    const rutasEstaticas = [
        {
            path: '/',
            element: <Inicio />,
        },
        {
            path: '/workspaces',
            element: <Nosotros />,
        },
        {
            path: '/recent',
            element: <Productos />,
        },
       
        {
            path: '/registro',
            element: <Reguistro/>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
        {
            path: '*',
            element: <NoEncontrado />,
        },
    ];

  
    const rutas = useRoutes([...rutasEstaticas]);

    return rutas;
};

export default Rutas;
