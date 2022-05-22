"use strict"

var Usuario = require("../Models/usuario");
var fs = require("fs");
var path=require("path");
var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: "Soy la home"
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: "Soy el método test del controlador de usuario"
        });
    },
    guardarUsuario: function (req, res) {
        var usuario = new Usuario();
        var params = req.body;
        usuario.NombreUsuario = params.NombreUsuario;
        usuario.Nombre = params.Nombre;
        usuario.Apellidos = params.Apellidos;
        usuario.Correo = params.Correo;
        usuario.Contrasenya = params.Contrasenya;
        usuario.Administrador = params.Administrador;
        usuario.Facebook=params.Facebook;
        usuario.Twitter=params.Twitter;
        usuario.Instagram=params.Instagram;
        usuario.Discord=params.Discord;
        usuario.Steam=params.Steam;
        usuario.Epic=params.Epic;
        usuario.Twitch=params.Twitch;
        usuario.Youtube=params.Youtube;
        usuario.FotoPerfil = null;

        usuario.save((err, usuarioStored) => {
            if (err) {
                return res.status(500).send({
                    message: "Error al guardar"
                })
            }
            if (!usuarioStored) {
                return res.status(404).send({
                    message: "No se  ha podido guardar el usuario"
                })
            }
            return res.status(200).send({
                usuario: usuarioStored
            });
        });
    },
    listarUsuario: function (req, res) {
        var idUsuario = req.params.id;
        Usuario.findById(idUsuario, (err, usuario) => {
            if (err) {
                return res.status(500).send({
                    message: "Error al mostrar el usuario"
                })
            }
            if (!usuario) {
                return res.status(404).send({
                    message: "El usuario no existe"
                })
            }
            return res.status(200).send({
                usuario
            })
        });
    },
    listarUsuarios: function (req, res) {
        Usuario.find({}).exec((err, usuarios) => {
            if (err) {
                return res.status(500).send({
                    message: "Error al listar los usuarios"
                })
            }
            if (!usuarios) {
                return res.status(404).send({
                    message: "No hay usuarios para mostrar"
                })
            }
            return res.status(200).send({ usuarios })
        })
    },
    editarUsuario: function (req, res) {
        var idUsuario = req.params.id;
        var editar = req.body;

        Usuario.findByIdAndUpdate(idUsuario, editar, { new: true }, (err, usuarioUpdated) => {
            if (err) {
                return res.status(500).send({
                    message: "Error al editar."
                })
            }
            if (!usuarioUpdated) {
                return res.status(404).send({
                    message: "No existe ese usuario"
                })
            }
            return res.status(200).send({
                usuario: usuarioUpdated
            })
        })
    },
    actualizarListaEventos: function (req, res) {
        var idUsuario = req.params.id;
        var editar = req.params.listaEventos;
        var eventosArray = new Array();
        var editarArray = editar.split(","); //Divido cada id de evento por separado
        for (let index = 0; index < editarArray.length; index++) {//Y los añado al array
            eventosArray.push(editarArray[index]);
        }
        console.log(idUsuario);
        console.log(eventosArray);
        Usuario.findByIdAndUpdate(idUsuario, { idEvento: eventosArray }, { new: true }, (err, eventoUpdated) => {
            if (err) {
                return res.status(500).send({
                    message: "Error al editar."
                })
            }
            if (!eventoUpdated) {
                return res.status(404).send({
                    message: "No existe ese evento"
                })
            }
            return res.status(200).send({
                evento: eventoUpdated
            })
        })
    },
    actualizarListaFavoritos: function (req, res) {
        var idUsuario = req.params.id;
        var editar = req.params.listaFavoritos;
        var favoritosArray = new Array();
        var editarArray = editar.split(","); //Divido cada id de evento por separado
        for (let index = 0; index < editarArray.length; index++) {//Y los añado al array
            favoritosArray.push(editarArray[index]);
        }
        console.log(idUsuario);
        console.log(favoritosArray);
        Usuario.findByIdAndUpdate(idUsuario, { Favoritos: favoritosArray }, { new: true }, (err, eventoUpdated) => {
            if (err) {
                return res.status(500).send({
                    message: "Error al editar."
                })
            }
            if (!eventoUpdated) {
                return res.status(404).send({
                    message: "No existe ese evento"
                })
            }
            return res.status(200).send({
                usuario: eventoUpdated
            })
        })
    },
    eliminarUsuario: function (req, res) {
        var idUsuario = req.params.id;
        Usuario.findByIdAndDelete(idUsuario, (err, usuarioRemoved) => {
            if (err) {
                return res.status(500).send({
                    message: "No se ha podido eliminar el usuario"
                })
            }
            if (!usuarioRemoved) {
                return res.status(404).send({
                    message: "No se ha encontrado el usuario"
                })
            }
            return res.status(200).send({
                usuario: usuarioRemoved
            })
        })
    },
    subirImagen: function (req, res) {
        var idUsuario = req.params.id;
        var nombreArchivo = "Imagen no subida";

        if (req.files) {
            var rutaImagen = req.files.image.path;
            var rutaSplit = rutaImagen.split("\\");
            var nombreImagen = rutaSplit[1];
            var extensionSplit = nombreImagen.split(".");
            var extensionImagen = extensionSplit[1];

            if (extensionImagen == "png" || extensionImagen == "jpg" || extensionImagen == "jpeg" || extensionImagen == "gif") {
                Usuario.findByIdAndUpdate(idUsuario, { FotoPerfil: nombreImagen }, { new: true }, (err, usuarioUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            message: "La imagen no se ha subido"
                        })
                    };
                    if (!usuarioUpdated) {
                        return res.status(404).send({
                            message: "El usuario no existe"
                        });
                    }
                    return res.status(200).send({
                        usuario: usuarioUpdated
                    })
                })
            } else {
                fs.unlink(rutaImagen, (err) => {
                    return res.status(200).send({
                        message: "La extensión no es válida."
                    })
                })
            }




        }
    },
    getImagen:function(req, res){
        var file=req.params.file;
        var pathFile="./uploads/"+file;

        fs.exists(pathFile, (exists) =>{
            if(exists){
                return res.sendFile(path.resolve(pathFile))
            }else{
                return res.status(200).send({
                    message:"No existe la imagen..."
                })
            }
        })
    }
}

module.exports = controller;