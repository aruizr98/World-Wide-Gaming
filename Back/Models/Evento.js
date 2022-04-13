"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var eventoSchema=Schema({
    id:Number,
    Nombre:String,
    FechaHora:String,
    Descripcion:String,
    NombreJuego:String,
    Creador:Number
});
module.exports=mongoose.model("Evento", eventoSchema);