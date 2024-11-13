const express = require("express")
const app = express();
const mysql = require("mysql")
const cors = require("cors")

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database:"bd-productos"
})

app.post("/create",(req,res)=>{
    const tipo = req.body.tipo;
    const nombre = req.body.nombre;
    const Descripcion = req.body.Descripcion;
    const Precio = req.body.Precio;
    const ubicacion = req.body.ubicacion;

    db.query('INSERT INTO producto(nombre) VALUES(?)', [nombre]),
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Empleado registrado con exito")
        }
    }
})

app.listen(3001,()=>{
    console.log("probando 3001")
})