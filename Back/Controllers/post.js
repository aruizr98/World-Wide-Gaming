"use strict"

var Post=require("../Models/post");
var fs=require("fs");
var controller={

    crearPost: function(req, res){
        var post = new Post();
        var params=req.body;
        post.UsuarioCreador=params.UsuarioCreador;
        post.Titulo=params.Titulo;
        post.TextoPost=params.TextoPost;
        post.FechaHora=params.FechaHora;
        post.NombreJuego=params.NombreJuego;
        post.NombreForo=params.NombreForo;

        post.save((err, postStored) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al guardar",
                    error:err
                })
            }
            if(!postStored){
                return res.status(404).send({
                    message:"No se  ha podido crear el post"
                })
            }
            return res.status(200).send({
                post:postStored
            });
        });
        // return res.status(200).send({
        //     post:post
        // })
    },
    mostrarPost:function(req, res){
        var idPost=req.params.id;
        Post.findById(idPost, (err, post) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al mostrar el post"
                })
            }
            if(!post){
                return res.status(404).send({
                    message:"El post no existe"
                })
            }
            return res.status(200).send({
                post
            })
        });
    },
    listarPosts: function(req, res){
        Post.find({}).exec((err, posts)=>{
            if(err){
                return res.status(500).send({
                    message:"Error al listar los posts"
                })
            }
            if(!posts){
                return res.status(404).send({
                    message:"No hay posts para mostrar"
                })
            }
            return res.status(200).send({posts})
        })
    },
    editarPost: function(req, res){
        var idPost=req.params.id;
        var editar=req.body;

        Post.findByIdAndUpdate(idPost, editar, {new:true}, (err, postUpdated) =>{
            if(err){
                return res.status(500).send({
                    message:"Error al editar."
                })
            }
            if(!postUpdated){
                return res.status(404).send({
                    message:"No existe ese post"
                })
            }
            return res.status(200).send({
                post:postUpdated
            })
        })
    },
    eliminarPost: function(req, res){
        var idPost=req.params.id;
        Post.findByIdAndDelete(idPost, (err, postRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"No se ha podido eliminar el post"
                })
            }
            if(!postRemoved){
                return res.status(404).send({
                    message:"No se ha encontrado el post"
                })
            }
            return res.status(200).send({
                post:postRemoved
            })
        })
    },
    // subirImagen: function(req, res){
    //     var idUsuario=req.params.id;
    //     var nombreArchivo="Imagen no subida";

    //     if(req.files){
    //         var rutaImagen=req.files.image.path;
    //         var rutaSplit=rutaImagen.split("\\");
    //         var nombreImagen=rutaSplit[1];
    //         var extensionSplit=nombreImagen.split(".");
    //         var extensionImagen=extensionSplit[1];

    //         if(extensionImagen == "png" || extensionImagen == "jpg" || extensionImagen == "jpeg" || extensionImagen=="gif"){
    //              Usuario.findByIdAndUpdate(idUsuario, {FotoPerfil:nombreImagen},{new:true}, (err, usuarioUpdated)=>{
    //             if(err){
    //                  return res.status(500).send({
    //                 message:"La imagen no se ha subido"
    //             })};
    //             if(!usuarioUpdated){
    //                 return res.status(404).send({
    //                     message:"El usuario no existe"
    //                 });
    //             }
    //             return res.status(200).send({
    //                 usuario:usuarioUpdated
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