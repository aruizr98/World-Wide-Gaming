"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var usuarioSchema=Schema({
    id:String,
    NombreUsuario:String,
    Nombre:String,
    Apellidos:String,
    Correo:String,
    Contrasenya:String,
    Administrador:Boolean,
    idEvento:Array,
    FotoPerfil:String,
    Favoritos:Array
});
module.exports=mongoose.model("Usuario", usuarioSchema);