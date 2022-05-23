"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var respuestaSchema=Schema({
    id:String,
    PostId:String,
    UsuarioCreador:String,
    Respuesta:String,
    FechaHora:String
});
module.exports=mongoose.model("Respuesta", respuestaSchema);