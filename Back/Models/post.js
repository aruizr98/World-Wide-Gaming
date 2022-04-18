"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var postSchema=Schema({
    id:String,
    UsuarioCreador:String,
    Titulo:String,
    TextoPost:String,
    FechaHora:String,
    NombreJuego:String
});
module.exports=mongoose.model("Post", postSchema);