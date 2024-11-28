import { configureStore } from "@reduxjs/toolkit";
import productosReducer from './slices/productos'

// Confifuracion de store
export default configureStore(
    {
        reducer:{ // <----- Todo los slices
            productos: productosReducer
            
        }
    }
)