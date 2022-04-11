"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var usuarioSchema=Schema({
    id:Number,
    NombreUsuario:String,
    Nombre:String,
    Apellidos:String,
    Correo:String,
    Contrasenya:String,
    Administrador:Boolean,
    idEvento:Number,
    FotoPerfil:String
});
module.exports=mongoose.model("Usuario", usuarioSchema);