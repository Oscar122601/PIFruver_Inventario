import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoFruver from './assets/logo.png'; // Importa el logo

const App = () => {
  const [productos, setProductos] = useState([]);
  const [stock, setStock] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idubicaciones, setIdUbicaciones] = useState('');
  const [idtipos, setIdTipos] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    fetchProductos();
    fetchStock();
  }, []);

  // Fetch para productos
  const fetchProductos = async () => {
    const result = await axios.get('http://localhost:5000/productos');
    setProductos(result.data);
  };

  // Fetch para stock
  const fetchStock = async () => {
    const result = await axios.get('http://localhost:5000/stock');
    setStock(result.data);
  };

  // Función para agregar o editar productos
  const agregarProducto = async () => {
    if (modoEdicion) {
      await axios.put(`http://localhost:5000/productos/${productoEditando.idproducto}`, {
        nombre,
        idubicaciones,
        idtipos,
        precio,
        descripcion,
      });
      setModoEdicion(false);
      setProductoEditando(null);
    } else {
      await axios.post('http://localhost:5000/productos', {
        nombre,
        idubicaciones,
        idtipos,
        precio,
        descripcion,
      });
    }
    resetForm();
    fetchProductos();
  };

  const eliminarProducto = async (id) => {
    await axios.delete(`http://localhost:5000/productos/${id}`);
    fetchProductos();
  };

  const iniciarEdicion = (producto) => {
    setProductoEditando(producto);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setDescripcion(producto.descripcion);
    setIdUbicaciones(producto.idubicaciones);
    setIdTipos(producto.idtipos);
    setModoEdicion(true);
  };

  const resetForm = () => {
    setNombre('');
    setPrecio('');
    setDescripcion('');
    setIdUbicaciones('');
    setIdTipos('');
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <a className="navbar-brand" href="/">
          <img src={LogoFruver} alt="Logo" style={{ width: '80px', marginRight: '10px' }} />
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">PRODUCTOS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/productos">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contacto">Contacto</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Tabla de Productos */}
      <div className="container mt-4">
        <h1>{modoEdicion ? 'Editar Producto' : 'Agregar Producto'}</h1>
        {/* Formulario de Producto */}
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Precio" />
        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción" />
        <input type="number" value={idubicaciones} onChange={(e) => setIdUbicaciones(e.target.value)} placeholder="ID Ubicación" />
        <input type="number" value={idtipos} onChange={(e) => setIdTipos(e.target.value)} placeholder="ID Tipo" />
        <button onClick={agregarProducto}>{modoEdicion ? 'Guardar Cambios' : 'Agregar Producto'}</button>

        {/* Tabla de Productos */}
        <h2>Lista de Productos</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Ubicación</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.idproducto} style={{ backgroundColor: '#f2f2f2' }}>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.ubicaciones}</td>
                <td>{producto.tipos}</td>
                <td>
                  <button onClick={() => iniciarEdicion(producto)}>Editar</button>
                  <button onClick={() => eliminarProducto(producto.idproducto)} style={{ marginLeft: '10px' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tabla de Stock */}
        <h2>Stock de Productos</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Nombre del Producto</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item, index) => (
              <tr key={index} style={{ backgroundColor: '#e8f5e9' }}>
                <td>{item.producto}</td>
                <td>{item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
