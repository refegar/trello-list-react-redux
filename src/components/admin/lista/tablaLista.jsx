import React, { useEffect, useState } from "react";
import TablaListaFila from "./TablaListaFila";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductos } from "../../../store/slices/productos/fetch/getAllProductos";

const TablaLista = () => {
  const { listadoTarea: listaTarea } = useSelector((store) => store.productos);
  const [draggedItem, setDraggedItem] = useState(null);
  const [currentList, setCurrentList] = useState([]);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductos()); // Acción asíncrona
  }, [dispatch]);

  useEffect(() => {
    if (listaTarea) {
      setCurrentList([...listaTarea]); // Copia el listado inicial
    }
  }, [listaTarea]);

  const handleDragStart = (e, itemIndex) => {
    setDraggedItem(itemIndex); // Registra el índice del elemento arrastrado
    e.dataTransfer.effectAllowed = "move";
    console.log(`[Drag Start] Elemento índice: ${itemIndex}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Permite el soltar
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    // Reordena la lista
    const updatedList = [...currentList];
    const [movedItem] = updatedList.splice(draggedItem, 1); // Remueve el ítem arrastrado
    updatedList.splice(targetIndex, 0, movedItem); // Inserta el ítem en la posición objetivo

    setCurrentList(updatedList); // Actualiza el estado
    console.log(`[Drop] Elemento movido a la posición ${targetIndex}`);
  };

  return (
    <>
      {currentList && currentList.length > 0 ? (
        currentList.map((lista, idx) => (
          <div
            key={idx}
            draggable
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, idx)}
          >
            <TablaListaFila NombreLista={lista} />
          </div>
        ))
      ) : (
       ''
      )}
    </>
  );
};

export default TablaLista;
