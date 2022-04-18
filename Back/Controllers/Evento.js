"use strict"

var Evento=require("../Models/evento");
var fs=require("fs");
var controller={
    home: function(req, res){
        return res.status(200).send({
            message:"Soy la home"
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message:"Soy el método test del controlador de evento"
        });
    },
    crearEvento: function(req, res){
        var evento = new Evento();
        var params=req.body;
        evento.Nombre=params.Nombre;
        evento.FechaHora=params.FechaHora;
        evento.Descripcion=params.Descripcion;
        evento.NombreJuego=params.NombreJuego;
        evento.Creador=params.Creador;

        evento.save((err, eventoStored) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al guardar"
                })
            }
            if(!eventoStored){
                return res.status(404).send({
                    message:"No se  ha podido guardar el evento"
                })
            }
            return res.status(200).send({
                evento:eventoStored
            });
        });
        // return res.status(200).send({
        //     evento:evento,
        //     message:"Método save"
        // })
    },
    mostrarEvento:function(req, res){
        var idEvento=req.params.id;
        Evento.findById(idEvento, (err, evento) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al mostrar el evento"
                })
            }
            if(!evento){
                return res.status(404).send({
                    message:"El evento no existe"
                })
            }
            return res.status(200).send({
                evento
            })
        });
    },
    listarEventos: function(req, res){
        Evento.find({}).exec((err, eventos)=>{
            if(err){
                return res.status(500).send({
                    message:"Error al listar los eventos"
                })
            }
            if(!eventos){
                return res.status(404).send({
                    message:"No hay eventos para mostrar"
                })
            }
            return res.status(200).send({eventos})
        })
    },
    editarEvento: function(req, res){
        var idEvento=req.params.id;
        var editar=req.body;

        Evento.findByIdAndUpdate(idEvento, editar, {new:true}, (err, eventoUpdated) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al editar."
                })
            }
            if(!eventoUpdated){
                return res.status(404).send({
                    message:"No existe ese evento"
                })
            }
            return res.status(200).send({
                evento:eventoUpdated
            })
        })
    },
    eliminarEvento: function(req, res){
        var idEvento=req.params.id;
        Evento.findByIdAndDelete(idEvento, (err, eventoRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"No se ha podido eliminar el evento"
                })
            }
            if(!eventoRemoved){
                return res.status(404).send({
                    message:"No se ha encontrado el evento"
                })
            }
            return res.status(200).send({
                evento:eventoRemoved
            })
        })
    },
    subirImagen: function(req, res){
        var idEvento=req.params.id;
        var nombreArchivo="Imagen no subida";

        if(req.files){
            var rutaImagen=req.files.image.path;
            var rutaSplit=rutaImagen.split("\\");
            var nombreImagen=rutaSplit[1];
            var extensionSplit=nombreImagen.split(".");
            var extensionImagen=extensionSplit[1];

            if(extensionImagen == "png" || extensionImagen == "jpg" || extensionImagen == "jpeg" || extensionImagen=="gif"){
                 Evento.findByIdAndUpdate(idEvento, {FotoPerfil:nombreImagen},{new:true}, (err, eventoUpdated)=>{
                if(err){
                     return res.status(500).send({
                    message:"La imagen no se ha subido"
                })};
                if(!eventoUpdated){
                    return res.status(404).send({
                        message:"El evento no existe"
                    });
                }
                return res.status(200).send({
                    evento:eventoUpdated
                })
            })
            }else{
                fs.unlink(rutaImagen, (err)=>{
                    return res.status(200).send({
                        message:"La extensión no es válida."
                    })
                })
            }


           
            
        }
    }
}

module.exports=controller;