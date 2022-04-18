"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var juegoSchema=Schema({
    id:String,
    NombreJuego:String,
    LimiteUsuarios:Number
});
module.exports=mongoose.model("Juego", juegoSchema);