const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Obtener todos los productos
app.get('/productos', (req, res) => {
    const query = `
      SELECT p.idproducto, p.nombre, p.precio, p.descripcion, u.ubicaciones AS ubicacion, t.tipos AS tipo
      FROM producto p
      JOIN ubicaciones u ON p.idubicaciones = u.idubicaciones
      JOIN tipos t ON p.idtipos = t.idtipos
    `;
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);  // Devuelve los productos con los campos adecuados
    });
  });
  

// Crear un nuevo producto
app.post('/productos', (req, res) => {
  const { nombre, idubicaciones, idtipos, precio, descripcion } = req.body;
  const query = `
    INSERT INTO producto (nombre, idubicaciones, idtipos, precio, descripcion)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [nombre, idubicaciones, idtipos, precio, descripcion], (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json({ message: 'Producto creado', idproducto: results.insertId });
  });
});

// Actualizar un producto
app.put('/productos/:id', (req, res) => {
  const { nombre, idubicaciones, idtipos, precio, descripcion } = req.body;
  const query = `
    UPDATE producto
    SET nombre = ?, idubicaciones = ?, idtipos = ?, precio = ?, descripcion = ?
    WHERE idproducto = ?
  `;
  db.query(query, [nombre, idubicaciones, idtipos, precio, descripcion, req.params.id], (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json({ message: 'Producto actualizado' });
  });
});

// Eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const query = `DELETE FROM producto WHERE idproducto = ?`;
  db.query(query, [req.params.id], (error, results) => {
    if (error) return res.status(500).json({ error });
    res.json({ message: 'Producto eliminado' });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
