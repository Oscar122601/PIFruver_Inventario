const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', // o la IP de tu servidor MySQL
  user: 'root',
  password: 'admin',
  database: 'bd-productos'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida.');
});

module.exports = db;
