"use strict"

var mongoose=require("mongoose");
var Schema= mongoose.Schema;

var mensajeSchema=Schema({
    id:Number,
    Receptor:Number,
    Mensaje:String,
    Emisor:Number
});
module.exports=mongoose.model("Mensaje", mensajeSchema);