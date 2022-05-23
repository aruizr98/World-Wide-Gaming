"use strict"

var Respuesta=require("../Models/Respuesta");
var fs=require("fs");
var controller={

    crearRespuesta: function(req, res){
        var respuesta = new Respuesta();
        var params=req.body;
        respuesta.PostId=params.PostId;
        respuesta.UsuarioCreador=params.UsuarioCreador;
        respuesta.Respuesta=params.Respuesta;
        respuesta.FechaHora=params.FechaHora;

        respuesta.save((err, respuestaStored) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al guardar",
                    error:err
                })
            }
            if(!respuestaStored){
                return res.status(404).send({
                    message:"No se  ha podido crear la respuesta"
                })
            }
            return res.status(200).send({
                respuesta:respuestaStored
            });
        });
    },
    mostrarRespuesta:function(req, res){
        var idRespuesta=req.params.id;
        Respuesta.findById(idRespuesta, (err, respuesta) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al mostrar la respuesta"
                })
            }
            if(!respuesta){
                return res.status(404).send({
                    message:"La respuesta no existe"
                })
            }
            return res.status(200).send({
                respuesta
            })
        });
    },
    listarRespuestas: function(req, res){
        Respuesta.find({}).exec((err, respuestas)=>{
            if(err){
                return res.status(500).send({
                    message:"Error al listar las respuestas"
                })
            }
            if(!respuestas){
                return res.status(404).send({
                    message:"No hay respuestas para mostrar"
                })
            }
            return res.status(200).send({respuestas})
        })
    },
    editarRespuesta: function(req, res){
        var idRespuesta=req.params.id;
        var editar=req.body;

        Respuesta.findByIdAndUpdate(idRespuesta, editar, {new:true}, (err, respuestaUpdated) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al editar."
                })
            }
            if(!respuestaUpdated){
                return res.status(404).send({
                    message:"No existe esa respuesta"
                })
            }
            return res.status(200).send({
                respuesta:respuestaUpdated
            })
        })
    },
    eliminarRespuesta: function(req, res){
        var idRespuesta=req.params.id;
        Respuesta.findByIdAndDelete(idRespuesta, (err, respuestaRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"No se ha podido eliminar la respuesta"
                })
            }
            if(!respuestaRemoved){
                return res.status(404).send({
                    message:"No se ha encontrado la respuesta"
                })
            }
            return res.status(200).send({
                respuesta:respuestaRemoved
            })
        })
    },
}

module.exports=controller;