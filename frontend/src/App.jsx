import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoFruver from './assets/logo.png'; // Importa el logo
import Swal from 'sweetalert2';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  const [productos, setProductos] = useState([]);
  const [stock, setStock] = useState([]);
  const [lotes, setLotes] = useState([]); // Estado para los lotes
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
    fetchLotes(); // Obtener los lotes
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

  // Fetch para lotes
  const fetchLotes = async () => {
    const result = await axios.get('http://localhost:5000/lotes');
    setLotes(result.data);
  };

  // Función para agregar o editar productos
  const agregarProducto = async () => {
    try {
      if (modoEdicion) {
        // Actualizar producto existente
        await axios.put(`http://localhost:5000/productos/${productoEditando.idproducto}`, {
          nombre,
          idubicaciones,
          idtipos,
          precio,
          descripcion,
        });
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'El producto ha sido actualizado con éxito.',
        });
        setModoEdicion(false);
        setProductoEditando(null);
      } else {
        // Crear un nuevo producto
        await axios.post('http://localhost:5000/productos', {
          nombre,
          idubicaciones,
          idtipos,
          precio,
          descripcion,
        });
        Swal.fire({
          icon: 'success',
          title: '¡Agregado!',
          text: 'El producto ha sido agregado con éxito.',
        });
      }
  
      // Reinicia el formulario y actualiza la lista de productos
      resetForm();
      fetchProductos();
    } catch (error) {
      console.error('Error:', error);
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Ocurrió un problema al procesar la solicitud.',
      });
    }
  };
  

  const eliminarProducto = async (id) => {
    try {
      // Realiza la eliminación del producto
      await axios.delete(`http://localhost:5000/productos/${id}`);
      
      // Muestra una alerta de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'El producto ha sido eliminado con éxito.',
      });
  
      // Actualiza la lista de productos
      fetchProductos();
    } catch (error) {
      console.error('Error:', error);
  
      // Muestra una alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Ocurrió un problema al intentar eliminar el producto.',
      });
    }
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
            <a className="nav-link" href="http://localhost:5175">PRODUCTOS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:5176">PEDIDO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:5173">VENTA</a>

               </li>
          </ul>
        </div>
        {/* Botón de salir alineado a la derecha */}
        <button
          className="btn btn-danger"
          style={{ position: 'absolute', right: '10px' }}
          onClick={() => {
            window.location.href = 'http://localhost:5174/';
          }}
        >
          Salir
        </button>

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

        {/* Tabla de Lotes */}
        <h2>Caducidad de Productos</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID Lote</th>
              <th>Nombre del Producto</th>
              <th>Fecha de Entrada</th>
              <th>Fecha de Vencimiento</th>
              <th>Días Restantes</th>
            </tr>
          </thead>
          <tbody>
            {lotes.map((lote, index) => (
              <tr key={index} style={{ backgroundColor: '#f9f9f9' }}>
                <td>{lote.idlote}</td>
                <td>{lote.producto}</td>
                <td>{new Date(lote.fechaEnt).toLocaleDateString()}</td>
                <td>{new Date(lote.fechaCad).toLocaleDateString()}</td>
                <td>{lote.diasRestantes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>Acerca de Fruver</h3>
            <p>
              Fruver es una empresa dedicada a la distribución de productos frescos de alta calidad.
              Nuestro compromiso es ofrecer lo mejor para nuestros clientes, garantizando siempre productos
              frescos y a precios competitivos.
            </p>
          </div>

          <div className="footer-section links">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><a href="/productos">Productos</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/politica-privacidad">Política de Privacidad</a></li>
              <li><a href="/terminos">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3>Contacto</h3>
            <p>Dirección: Cr 33 # 110 24, floridablanca, santander</p>
            <p>Email: <a href="mailto:contacto@fruver.com">Elmana@fruver.com</a></p>
            <p>Tel: +57 301 698 1025</p>
            <div className="social-links">
              <a href="https://www.facebook.com/portaldefrutas/?locale=es_LA" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook"></i>
              </a>
            </div>
          </div>

          
        </div>

        <div className="footer-bottom">
          <p>© 2024 Elmana Fruver. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
