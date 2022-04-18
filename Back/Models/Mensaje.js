"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var mensajeSchema=Schema({
    id:String,
    Receptor:String,
    Mensaje:String,
    Emisor:String
});
module.exports=mongoose.model("Mensaje", mensajeSchema);