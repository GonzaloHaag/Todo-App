import React, { useContext, useState } from 'react';
import miContexto from '../context/TodoContext';

const TareaInput = () => {

  const [valorInput,setValorInput] = useState('');
  const { handleAgregarTarea } = useContext(miContexto);

  const capturarInput = (e) => {

    if(valorInput.trim() === '') {
      alert('Por favor coloque algo para realizar')
    }
    else {
      e.preventDefault();
   
      //Cuando se envie el input, capturo la tarea
      handleAgregarTarea(valorInput); //Se la mando a la funcion
      setValorInput('');

    }
  
 } 
  return (
    <form onSubmit={capturarInput}>
      <input 
      type='text'
      placeholder='¿Qué quieres hacer?'
      value={valorInput}
      onChange={(e) => setValorInput(e.target.value)}
      />
    </form>
  )
}

export default TareaInput