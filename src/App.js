import { useContext, useState } from "react";
import "./App.css";
import { SiJavascript } from "react-icons/si";
import TareaInput from "./componentes/TareaInput";
import miContexto from "./context/TodoContext";

import { motion } from "framer-motion";

import primerLetraMayuscula from "./primerLetraMayuscula";

import { AiOutlineClose } from "react-icons/ai";

function App() {
  const { arrayTareas, toggleTareaCompletada, deleteTarea, clearCompleted } = useContext(miContexto); //Aca tengo las tareas que se van agregando

  const [linkActive, setLinkActive] = useState("all");

  const toggleLinkActive = (e) => {
    //console.log(e.target.id) // -> Hay que manejarse con esto
    const id = e.target.id;
    setLinkActive(id);

    if(id !== linkActive) {
      //Quiere decir que no esta activo
      setLinkActive(id);
    }
    
  };


  const mostrarTareasPorLinkActive = () => {
    //CLAVE ESTO, SOLO RETORNO EL FILTER AL ARRAY Y ME AHORRO MUCHAS COSAS
    /*
    RECORDAR EN EL MAP PONER MOSTRARTAREASPORLINK().MAP
    */
    if(linkActive === 'active') {
      return arrayTareas.filter((tarea) => tarea.completada === false);
    }
    else if(linkActive === 'completed') {
      return arrayTareas.filter((tarea) => tarea.completada === true);
    }
    else {
      return arrayTareas;
    }
  }

  //Necesito el lenght de las tareas no completadas para mostrarlas en pendientes:
  const tareasNoCompletadas = arrayTareas.filter((tarea) => tarea.completada === false);


  //Framer motion
  const variantes = {
    hidden : {
      opacity : 0,

    },
    visible : {
      opacity : 1,
      transition :  {
          duration : 1
      }
    }
  }

  return (
    <div className="app-container">
      <div className="todo-app-container">
        <header>
          <motion.h1
          initial = {{scale:0}}
          animate = {{scale:1}}
          transition={{
            duration : 1,
            ease : 'linear',
            delay:0.2,
          }}
          >
            Todo
            </motion.h1>
          <SiJavascript fontSize={50} color="#EDD61A" />
        </header>
        <div className="todo-input-list">
          <TareaInput />
          
          <div className="todo-list">
           
            {mostrarTareasPorLinkActive().length > 0 && //Como es una funcion le agrego el();
              mostrarTareasPorLinkActive().map((tarea, index) => (
                <motion.div className="tarea-container"
                 key={tarea.id}
                 initial = 'hidden'
                 animate = 'visible' //que se anime a visible
                 exit= 'hidden' //Para cuando se elimine sea hidden
                 variants={variantes} //Le indico cuales son mis variantes 
                 layoutId={tarea.id}
                 >
                  <input
                    type="checkbox"
                    name="checkboxTarea"
                    id="check"
                    onChange={() => toggleTareaCompletada(index)} //Aca tengo que hacer el manejo de mi funcion para cambiarle el valor a tarea.completada, le mando el indexy accedo a la tarea con nuevoArray[index]
                    checked={tarea.completada}
                  />
                  <label
                   htmlFor="checkboxTarea"
                   >
                    {primerLetraMayuscula(tarea.nombre)}
                  </
                  label>
                  <AiOutlineClose
                    className="delete-icon"
                    fontSize={25}
                    onClick={() => deleteTarea(tarea.id)}
                  />
                </motion.div>
                
              ))}
            
          </div>
        </div>
        
          {
            arrayTareas.length > 0 &&    <div className="todo-bottom">
            <div>
              <p>
               {
                 tareasNoCompletadas.length === 0
                  ?
                  tareasNoCompletadas.length + ' tareas pendientes' //0 tareas pendientes
                  :
                  (
                   tareasNoCompletadas.length === 1 ? tareasNoCompletadas.length + ' tarea pendiente' // 1 tarea pendiente
                   :
                   tareasNoCompletadas.length + ' tareas pendientes' // a partir de 2 que diga tareas pendientes
                  )
               }
              </p>
            </div>
            <ul>
              <li id="all" className={linkActive === 'all' ? 'linkActive' : ''} onClick={toggleLinkActive}>
                All
              </li>
              <li id="active" className={linkActive === 'active' ? 'linkActive' : ''} onClick={toggleLinkActive}>
                Active
              </li>
              <li id="completed" className={linkActive === 'completed' ? 'linkActive' : ''} onClick={toggleLinkActive}>
                Completed
              </li>
            </ul>
            <div>
              <p className = 'clear-completed' onClick={clearCompleted}>Borrar completados</p>
            </div>
          </div>
          }
        
        
      </div>
    </div>
  );
}

export default App;
