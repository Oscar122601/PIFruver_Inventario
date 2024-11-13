import './App.css';
import { useState } from 'react';
import Axios from 'axios';


function App() {
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      tipo: tipo,
      descripcion: descripcion,
      precio: precio,
      ubicacion: ubicacion
    }).then((response) => {
      console.log("Empleado registrado con éxito", response);
    }).catch((error) => {
      console.error("Error al registrar el empleado", error);
    });
  };

  return (
    <div className="App">
      <div className="datos">
        <label>
          Tipo: 
          <input onChange={(event) => setTipo(event.target.value)} type="text" />
        </label>
        <label>
          Nombre: 
          <input onChange={(event) => setNombre(event.target.value)} type="text" />
        </label>
        <label>
          Descripción: 
          <input onChange={(event) => setDescripcion(event.target.value)} type="text" />
        </label>
        <label>
          Precio: 
          <input onChange={(event) => setPrecio(event.target.value)} type="text" />
        </label>
        <label>
          Ubicación: 
          <input onChange={(event) => setUbicacion(event.target.value)} type="text" />
        </label>
        <button onClick={add}>Registrar</button>
      </div>
    </div>
  );
}

export default App;
