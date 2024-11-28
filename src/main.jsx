import React from 'react'  // el core de react
import ReactDOM from 'react-dom/client' // un adaptador/conector (interfaz) interatuar con el dom
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store/index.js'
// El punto mas bajo de la aplicacion reactimport { BrowserRouter, Routes,Route } from "react-router-dom
ReactDOM.createRoot(document.getElementById('root')).render( //decide donde se va montar la aplicacion
<Provider store={store}>
    <BrowserRouter> 
    <App />
    </BrowserRouter> 
    </Provider>
)
