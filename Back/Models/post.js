"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var postSchema=Schema({
    id:Number,
    UsuarioCreador:Number,
    Titulo:String,
    TextoPost:String,
    FechaHora:String,
    NombreJuego:String
});
module.exports=mongoose.model("Post", postSchema);