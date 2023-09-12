import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const miContexto = createContext();


const arrayTareasLocalStorage = JSON.parse(localStorage.getItem('arrayTareas')) || [];

export const TodoContextProvider = ({ children }) => {
  const [arrayTareas, setArrayTareas] = useState(arrayTareasLocalStorage);
  


  const handleAgregarTarea = (tarea) => {
    //Me van a mandar solo el nombre de la tarea, yo le agrego un id y  un completada para ver si esta completada o no 
    const nuevaTarea = {
        id : uuidv4(), //Genera un id random para la tarea
        nombre : tarea, //El nombre es tarea, porque alli llega el valor del input
        completada : false, //Este valor lo cambio desde app
      }
    setArrayTareas([...arrayTareas,nuevaTarea]); //Lo que ya habia + la tarea
  }
  const toggleTareaCompletada = (indexTarea) => {
   const nuevoArray = [...arrayTareas]; //Recordar siempre hacer esta copia -> Sino no funciona
   // console.log(nuevoArray[indexTarea]) aca me llega la tarea que se clickea con sus propiedades (nombre,completed)
   nuevoArray[indexTarea].completada = !nuevoArray[indexTarea].completada; //Lo cambio al valor contrario
   setArrayTareas(nuevoArray);

}

const deleteTarea = (idTarea) => {
    const nuevoArray = [...arrayTareas]; //Copia del ARRAY, SIEMPRE
    const filterArray = nuevoArray.filter((tarea) => tarea.id !== idTarea); //Me quedo con los que NO coinciden 
    setArrayTareas(filterArray);

}

const clearCompleted = () => {
    const nuevoArray = [...arrayTareas];
    const filterArray = nuevoArray.filter((tarea) => tarea.completada === false); //Me quedo con las que estan sin completar
    setArrayTareas(filterArray); 
}

useEffect(() => {
  localStorage.setItem('arrayTareas',JSON.stringify(arrayTareas))
},[arrayTareas])

  return (
    <miContexto.Provider
      value={{
        //Funciones y estados que usaran mis componentes
        arrayTareas,
        setArrayTareas,
        handleAgregarTarea,
        toggleTareaCompletada,
        deleteTarea,
        clearCompleted
      }}
    >
      {children}
    </miContexto.Provider>
  );
};

export default miContexto;
