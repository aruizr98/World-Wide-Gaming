"use strict"

var Usuario=require("../Models/usuario");
var fs=require("fs");
var controller={
    home: function(req, res){
        return res.status(200).send({
            message:"Soy la home"
        });
    },
    test: function(req, res){
        return res.status(200).send({
            message:"Soy el método test del controlador de usuario"
        });
    },
    guardarUsuario: function(req, res){
        var usuario = new Usuario();
        var params=req.body;
        usuario.NombreUsuario=params.NombreUsuario;
        usuario.Nombre=params.Nombre;
        usuario.Apellidos=params.Apellidos;
        usuario.Correo=params.Correo;
        usuario.Contrasenya=params.Contrasenya;
        usuario.Administrador=params.Administrador;
        usuario.FotoPerfil=null;

        usuario.save((err, usuarioStored) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al guardar"
                })
            }
            if(!usuarioStored){
                return res.status(404).send({
                    message:"No se  ha podido guardar el usuario"
                })
            }
            return res.status(200).send({
                usuario:usuarioStored
            });
        });
        // return res.status(200).send({
        //     usuario:usuario,
        //     message:"Método save"
        // })
    },
    // comprobarInicioSesion: function(req, res){
    //     var usuario = new Usuario();
    //     var params=req.body;
    //     usuario.NombreUsuario=params.NombreUsuario;
    //     usuario.Nombre=params.Nombre;
    //     usuario.Apellidos=params.Apellidos;
    //     usuario.Correo=params.Correo;
    //     usuario.Contrasenya=params.Contrasenya;
    //     usuario.Administrador=params.Administrador;
    //     usuario.FotoPerfil=null;

    //     usuario.save((err, usuarioStored) =>{
    //         if(err){
    //             return res.status(500).send({
    //                 message:"Error al guardar"
    //             })
    //         }
    //         if(!usuarioStored){
    //             return res.status(404).send({
    //                 message:"No se  ha podido guardar el usuario"
    //             })
    //         }
    //         return res.status(200).send({
    //             usuario:usuarioStored
    //         });
    //     });
    //     return res.status(200).send({
    //         usuario:usuario,
    //         message:"Método save"
    //     })
    // },
    listarUsuario:function(req, res){
        var idUsuario=req.params.id;
        Usuario.findById(idUsuario, (err, usuario) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al mostrar el usuario"
                })
            }
            if(!usuario){
                return res.status(404).send({
                    message:"El usuario no existe"
                })
            }
            return res.status(200).send({
                usuario
            })
        });
    },
    listarUsuarios: function(req, res){
        Usuario.find({}).exec((err, usuarios)=>{
            if(err){
                return res.status(500).send({
                    message:"Error al listar los usuarios"
                })
            }
            if(!usuarios){
                return res.status(404).send({
                    message:"No hay usuarios para mostrar"
                })
            }
            return res.status(200).send({usuarios})
        })
    },
    editarUsuario: function(req, res){
        var idUsuario=req.params.id;
        var editar=req.body;

        Usuario.findByIdAndUpdate(idUsuario, editar, {new:true}, (err, usuarioUpdated) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al editar."
                })
            }
            if(!usuarioUpdated){
                return res.status(404).send({
                    message:"No existe ese usuario"
                })
            }
            return res.status(200).send({
                usuario:usuarioUpdated
            })
        })
    },
    eliminarUsuario: function(req, res){
        var idUsuario=req.params.id;
        Usuario.findByIdAndDelete(idUsuario, (err, usuarioRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"No se ha podido eliminar el usuario"
                })
            }
            if(!usuarioRemoved){
                return res.status(404).send({
                    message:"No se ha encontrado el usuario"
                })
            }
            return res.status(200).send({
                usuario:usuarioRemoved
            })
        })
    },
    subirImagen: function(req, res){
        var idUsuario=req.params.id;
        var nombreArchivo="Imagen no subida";

        if(req.files){
            var rutaImagen=req.files.image.path;
            var rutaSplit=rutaImagen.split("\\");
            var nombreImagen=rutaSplit[1];
            var extensionSplit=nombreImagen.split(".");
            var extensionImagen=extensionSplit[1];

            if(extensionImagen == "png" || extensionImagen == "jpg" || extensionImagen == "jpeg" || extensionImagen=="gif"){
                 Usuario.findByIdAndUpdate(idUsuario, {FotoPerfil:nombreImagen},{new:true}, (err, usuarioUpdated)=>{
                if(err){
                     return res.status(500).send({
                    message:"La imagen no se ha subido"
                })};
                if(!usuarioUpdated){
                    return res.status(404).send({
                        message:"El usuario no existe"
                    });
                }
                return res.status(200).send({
                    usuario:usuarioUpdated
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