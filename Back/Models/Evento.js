"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var eventoSchema=Schema({
    id:String,
    Nombre:String,
    FechaHora:String,
    Descripcion:String,
    NombreJuego:String,
    Creador:String,
    UsuariosApuntados:Array
});
module.exports=mongoose.model("Evento", eventoSchema);