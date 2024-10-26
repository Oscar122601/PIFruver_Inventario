const express = require("express")
const app = express();
const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"bd-productos"
})

app.post("/create",(req,res)=>{
    const tipo = req.body.tipo;
    const nombre = req.body.nombre;
    const Descripcion = req.body.Descripcion;
    const Precio = req.body.Precio;
    const ubicacion = req.body.ubicacion;
})

app.listen(3001,()=>{
    console.log("")
})