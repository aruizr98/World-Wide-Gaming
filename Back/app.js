"use strict"

var express=require("express");
var bodyParser=require("body-parser");

var app=express();

// cargar archivos de rutas
var rutas=require("./Routes/rutas");
// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS

// rutas
// app.get("/test", (req, res) =>{
//     res.status(200).send({
//         mensaje:"Hola mundo desde mi API de NodeJS"
//     }) 
// })
// app.get("/", (req, res) =>{
//     res.status(200).send(
//         "<h1>Página de inicio</h1>"
//     ) 
// })
app.use("/api", rutas);
// Exportar 
module.exports = app;