"use strict"

var Juego=require("../Models/juego");
var fs=require("fs");
var controller={
    home: function(req, res){
        return res.status(200).send({
            message:"Soy la home"
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message:"Soy el método test del controlador de juego"
        });
    },
    crearJuego: function(req, res){
        var juego = new Juego();
        var params=req.body;
        juego.NombreJuego=params.NombreJuego;
        juego.LimiteUsuarios=params.LimiteUsuarios;

        juego.save((err, juegoStored) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al guardar"
                })
            }
            if(!juegoStored){
                return res.status(404).send({
                    message:"No se  ha podido guardar el juego"
                })
            }
            return res.status(200).send({
                juego:juegoStored
            });
        });
        // return res.status(200).send({
        //     juego:juego,
        //     message:"Método save"
        // })
    },
    mostrarJuego:function(req, res){
        var idJuego=req.params.id;
        Juego.findById(idJuego, (err, juego) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al mostrar el juego"
                })
            }
            if(!juego){
                return res.status(404).send({
                    message:"El juego no existe"
                })
            }
            return res.status(200).send({
                juego
            })
        });
    },
    listarJuegos: function(req, res){
        Juego.find({}).exec((err, juegos)=>{
            if(err){
                return res.status(500).send({
                    message:"Error al listar los juegos"
                })
            }
            if(!juegos){
                return res.status(404).send({
                    message:"No hay juegos para mostrar"
                })
            }
            return res.status(200).send({juegos})
        })
    },
    editarJuego: function(req, res){
        var idJuego=req.params.id;
        var editar=req.body;

        Juego.findByIdAndUpdate(idJuego, editar, {new:true}, (err, juegoUpdated) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al editar."
                })
            }
            if(!juegoUpdated){
                return res.status(404).send({
                    message:"No existe ese juego"
                })
            }
            return res.status(200).send({
                juego:juegoUpdated
            })
        })
    },
    eliminarJuego: function(req, res){
        var idJuego=req.params.id;
        Juego.findByIdAndDelete(idJuego, (err, juegoRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"No se ha podido eliminar el juego"
                })
            }
            if(!juegoRemoved){
                return res.status(404).send({
                    message:"No se ha encontrado el juego"
                })
            }
            return res.status(200).send({
                juego:juegoRemoved
            })
        })
    },
    // subirImagen: function(req, res){
    //     var idJuego=req.params.id;
    //     var nombreArchivo="Imagen no subida";

    //     if(req.files){
    //         var rutaImagen=req.files.image.path;
    //         var rutaSplit=rutaImagen.split("\\");
    //         var nombreImagen=rutaSplit[1];
    //         var extensionSplit=nombreImagen.split(".");
    //         var extensionImagen=extensionSplit[1];

    //         if(extensionImagen == "png" || extensionImagen == "jpg" || extensionImagen == "jpeg" || extensionImagen=="gif"){
    //              Juego.findByIdAndUpdate(idJuego, {FotoPerfil:nombreImagen},{new:true}, (err, juegoUpdated)=>{
    //             if(err){
    //                  return res.status(500).send({
    //                 message:"La imagen no se ha subido"
    //             })};
    //             if(!juegoUpdated){
    //                 return res.status(404).send({
    //                     message:"El juego no existe"
    //                 });
    //             }
    //             return res.status(200).send({
    //                 juego:juegoUpdated
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