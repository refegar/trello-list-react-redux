import { createSlice } from "@reduxjs/toolkit";

export const productosSlice = createSlice({
    name: 'productos', // Nombre del slice
    initialState: {
        listadoTarjeta: null, // Lista de una sola tarjeta
        listadoTarea: null, // Lista de una sola tarea
        listadoTareas: [], // Lista completa de tareas
        listadoTarjetas: [], // Lista completa de tareas
        listaProducto: null, // Productos específicos
        listaEditar: null, // Lista en edición
        productoEditar: null, // Producto en edición
        userActive: null, // Usuario activo
        userActiveCorreo: null // Correo del usuario activo
    },
    reducers: {
        setUserActive: (state, action) => {
            state.userActive = action.payload;
        },
        setUserActiveCorreo: (state, action) => {
            state.userActiveCorreo = action.payload;
        },
        setListaTarea: (state, action) => {
            state.listadoTarea = action.payload;
        },
        setListaTarjeta: (state, action) => {
            state.listadoTarjeta = action.payload;
        },
        addListaTarea: (state, action) => {
            // Asegúrate de que listadoTareas sea un array antes de agregar
            state.listadoTareas = [...(state.listadoTareas || []), action.payload];
        },
        addTarjeta: (state, action) => {
            // Asegúrate de que listadoTareas sea un array antes de agregar
            state.listadoTarjetas = [...(state.listadoTarjetas || []), action.payload];
        },
        setListas: (state, action) => {
            state.listadoTareas = action.payload || [];
        },
        setListaProducto: (state, action) => {
            state.listaProducto = action.payload;
        },
        addProductos: (state, action) => {
            // Asegúrate de que listadoProductos sea un array antes de agregar
            state.listaProducto = [...(state.listaProducto || []), action.payload];
        },
        removeProducto: (state, action) => {
            const id = action.payload.id;
            const nuevoListado = state.listaProducto.filter(producto => producto.id !== id);
            state.listaProducto = nuevoListado;
        },
        editProducto: (state, action) => {
            const productoEditado = action.payload;
            const nuevoListado = state.listaProducto.map(producto =>
                producto.id === productoEditado.id ? productoEditado : producto
            );
            state.listaProducto = nuevoListado;
        },
        editLista: (state, action) => {
            const listaEditada = action.payload;
            const nuevoListado = state.listadoTareas.map(tarea =>
                tarea.id === listaEditada.id ? listaEditada : tarea
            );
            state.listadoTareas = nuevoListado;
        },
        editEstadoTarjeta: (state, action) => {
            const listaEditada = action.payload;
            const nuevoListado = state.listadoTarjetas.map(tarjeta =>
                tarjeta.id === listaEditada.id ? listaEditada : tarjeta
            );
            state.listadoTarjetas = nuevoListado;
        },
        setListaEditar: (state, action) => {
            state.listaEditar = action.payload;
        }
    }
});

// Exportamos las acciones sincronizadas
export const {
    editEstadoTarjeta,
    addTarjeta,
    setListaTarjeta,
    setListaTarea,
    addListaTarea,
    setListaProducto,
    editLista,
    setListas,
    addProductos,
    removeProducto,
    editProducto,
    setUserActive,
    setUserActiveCorreo
} = productosSlice.actions;

// Exportamos el reducer
export default productosSlice.reducer;
