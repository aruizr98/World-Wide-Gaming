"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var juegoSchema=Schema({
    id:Number,
    NombreJuego:String,
    LimiteUsuarios:Number
});
module.exports=mongoose.model("Juego", juegoSchema);