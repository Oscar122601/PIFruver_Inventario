import './App.css';
import { useState } from 'react';

function App() {
  const [tipo,setTipo] = useState("")
  const [nombre,setNombre] = useState("")
  const [Descripcion,setDescripcion] = useState("")
  const [Precio,setPrecio] = useState(0)
  const [ubicacion,setUbicacion] = useState("")
  return (
    <div className="App">
      <div className="datos">
      <label>Tipo: <input 
      onChange={(event)=>{
        setTipo(event.target.value);
      }}
      type='text'/></label><br/>
      <label>Nombre: <input 
        onChange={(event)=>{
          setNombre(event.target.value);
        }}
      type='text'/></label><br/>
          <label>Descripcion: <input 
          onChange={(event)=>{
            setDescripcion(event.target.value);
          }}
          type='text'/></label><br/>
          <label>Precio: <input 
          onChange={(event)=>{
            setPrecio(event.target.value);
          }}
          type='text'/></label><br/>
          <label>Ubicacion: <input 
          onChange={(event)=>{
            setUbicacion(event.target.value);
          }}
          type='text'/></label><br/>
          <button onClick={most}>Registrar</button>
      </div>
    </div>
  );
}

export default App;
