import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductosTable = () => {
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/productos')
      .then((response) => {
        // Verifica la estructura de los datos para asegurarse de que todo esté correcto
        console.log(response.data); // Verifica si los datos contienen 'ubicacion' y 'tipo'
        setProducto(response.data);
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los productos', error);
      });
  }, []);

  return (
    <div className="table-container">
      <table className="productos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {producto.length > 0 ? (
            producto.map((producto) => (
              <tr key={producto.idproducto}>
                <td>{producto.idproducto}</td>
                <td>{producto.nombre}</td>
                <td>{producto.ubicacion || 'N/A'}</td>  {/* Asegúrate de que 'ubicacion' esté en la respuesta */}
                <td>{producto.tipo || 'N/A'}</td>  {/* Asegúrate de que 'tipo' esté en la respuesta */}
                <td>{producto.precio}</td>
                <td>{producto.descripcion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay productos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductosTable;
