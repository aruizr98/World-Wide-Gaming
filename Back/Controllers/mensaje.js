"use strict"

var Mensaje=require("../Models/mensaje");
var fs=require("fs");
var controller={
    home: function(req, res){
        return res.status(200).send({
            message:"Soy la home"
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message:"Soy el método test del controlador de mensaje"
        });
    },
    crearMensaje: function(req, res){
        var mensaje = new Mensaje();
        var params=req.body;
        mensaje.Receptor=params.Receptor;
        mensaje.Mensaje=params.Mensaje;
        mensaje.Emisor=params.Emisor;

        mensaje.save((err, mensajeStored) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al guardar"
                })
            }
            if(!mensajeStored){
                return res.status(404).send({
                    message:"No se  ha podido guardar el mensaje"
                })
            }
            return res.status(200).send({
                mensaje:mensajeStored
            });
        });
        // return res.status(200).send({
        //     mensaje:mensaje,
        //     message:"Método save"
        // })
    },
    mostrarMensaje:function(req, res){
        var idMensaje=req.params.id;
        Mensaje.findById(idMensaje, (err, mensaje) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al mostrar el mensaje"
                })
            }
            if(!mensaje){
                return res.status(404).send({
                    message:"El mensaje no existe"
                })
            }
            return res.status(200).send({
                mensaje
            })
        });
    },
    listarMensajes: function(req, res){
        Mensaje.find({}).exec((err, mensajes)=>{
            if(err){
                return res.status(500).send({
                    message:"Error al listar los mensajes"
                })
            }
            if(!mensajes){
                return res.status(404).send({
                    message:"No hay mensajes para mostrar"
                })
            }
            return res.status(200).send({mensajes})
        })
    },
    // editarMensaje: function(req, res){
    //     var idMensaje=req.params.id;
    //     var editar=req.body;

    //     Mensaje.findByIdAndUpdate(idMensaje, editar, {new:true}, (err, mensajeUpdated) =>{
    //         if(err){
    //             return res.status(500).send({
    //                 message:"Error al editar."
    //             })
    //         }
    //         if(!mensajeUpdated){
    //             return res.status(404).send({
    //                 message:"No existe ese mensaje"
    //             })
    //         }
    //         return res.status(200).send({
    //             mensaje:mensajeUpdated
    //         })
    //     })
    // },
    // eliminarMensaje: function(req, res){
    //     var idMensaje=req.params.id;
    //     Mensaje.findByIdAndDelete(idMensaje, (err, mensajeRemoved)=>{
    //         if(err){
    //             return res.status(500).send({
    //                 message:"No se ha podido eliminar el mensaje"
    //             })
    //         }
    //         if(!mensajeRemoved){
    //             return res.status(404).send({
    //                 message:"No se ha encontrado el mensaje"
    //             })
    //         }
    //         return res.status(200).send({
    //             mensaje:mensajeRemoved
    //         })
    //     })
    // },
    // subirImagen: function(req, res){
    //     var idMensaje=req.params.id;
    //     var nombreArchivo="Imagen no subida";

    //     if(req.files){
    //         var rutaImagen=req.files.image.path;
    //         var rutaSplit=rutaImagen.split("\\");
    //         var nombreImagen=rutaSplit[1];
    //         var extensionSplit=nombreImagen.split(".");
    //         var extensionImagen=extensionSplit[1];

    //         if(extensionImagen == "png" || extensionImagen == "jpg" || extensionImagen == "jpeg" || extensionImagen=="gif"){
    //              Mensaje.findByIdAndUpdate(idMensaje, {FotoPerfil:nombreImagen},{new:true}, (err, mensajeUpdated)=>{
    //             if(err){
    //                  return res.status(500).send({
    //                 message:"La imagen no se ha subido"
    //             })};
    //             if(!mensajeUpdated){
    //                 return res.status(404).send({
    //                     message:"El mensaje no existe"
    //                 });
    //             }
    //             return res.status(200).send({
    //                 mensaje:mensajeUpdated
    //             })
    //         })
    //         }else{
    //             fs.unlink(rutaImagen, (err)=>{
    //                 return res.status(200).send({
    //                     message:"La extensión no es válida."
    //                 })
    //             })
    //         }


           
            
    //     }
    // }
}

module.exports=controller;