const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'bd-productos'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Endpoint para obtener los productos
app.get('/productos', (req, res) => {
  const query = `
    SELECT p.idproducto, p.nombre, p.precio, p.descripcion, u.ubicaciones, t.tipos
    FROM producto p
    JOIN ubicaciones u ON p.idubicaciones = u.idubicaciones
    JOIN tipos t ON p.idtipos = t.idtipos;
  `;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los productos');
    } else {
      res.json(result);
    }
  });
});

// Endpoint para agregar un producto
app.post('/productos', (req, res) => {
  
  const { nombre, idubicaciones, idtipos, precio, descripcion } = req.body;
  const query = `
    INSERT INTO producto (nombre, idubicaciones, idtipos, precio, descripcion)
    VALUES (?, ?, ?, ?, ?);
  `;
  db.query(query, [nombre, idubicaciones, idtipos, precio, descripcion], (err, result) => {
    if (err) {
      res.status(500).send('Error al agregar el producto');
    } else {
      res.status(201).send('Producto agregado');
    }
  });
});

// Endpoint para actualizar un producto
app.put('/productos/:id', (req, res) => {
  const { nombre, idubicaciones, idtipos, precio, descripcion } = req.body;
  const id = parseInt(req.params.id, 10);

  if (!nombre || !idubicaciones || !idtipos || !precio || !descripcion) {
    return res.status(400).send('Todos los campos son obligatorios.');
  }

  if (isNaN(id)) {
    return res.status(400).send('El ID proporcionado no es válido.');
  }

  const query = `
    UPDATE producto
    SET nombre = ?, idubicaciones = ?, idtipos = ?, precio = ?, descripcion = ?
    WHERE idproducto = ?;
  `;

  db.query(query, [nombre, idubicaciones, idtipos, precio, descripcion, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al actualizar el producto');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Producto no encontrado');
    } else {
      res.send('Producto actualizado');
    }
  });
});



// Endpoint para eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const query = 'DELETE FROM producto WHERE idproducto = ?;';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el producto');
    } else {
      res.send('Producto eliminado');
    }
  });
});


app.get('/stock', (req, res) => {
  const query = `
    SELECT 
      p.nombre AS producto, 
      SUM(l.cantidad) AS cantidad
    FROM lote l
    JOIN producto p ON l.idproducto = p.idproducto
    GROUP BY l.idproducto;
  `;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener el stock');
    } else {
      res.json(result);
    }
  });
});

// Endpoint para obtener los lotes y calcular los días restantes para caducar
app.get('/lotes', (req, res) => {
  const query = `
    SELECT 
      l.idlote, 
      p.nombre AS producto, 
      l.fechaEnt, 
      l.fechaCad, 
      DATEDIFF(l.fechaCad, CURDATE()) AS diasRestantes
    FROM lote l
    JOIN producto p ON l.idproducto = p.idproducto;
  `;
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los lotes');
    } else {
      res.json(result);
    }
  });
});





// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
