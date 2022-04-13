"use strict"
var express=require("express");
var usuarioController=require("../Controllers/usuario");
var postController=require("../Controllers/post");
var mensajeController=require("../Controllers/mensaje");
var juegoController=require("../Controllers/Juego");
var eventoController=require("../Controllers/evento");

var router=express.Router();

var multipart=require("connect-multiparty");
var multipartMiddleware=multipart({uploadDir: "./uploads"});

router.get("/home", usuarioController.home);
router.post("/test", usuarioController.test);
router.post("/guardarUsuario", usuarioController.guardarUsuario);
router.get("/usuario/:id", usuarioController.listarUsuario);
router.get("/usuarios", usuarioController.listarUsuarios);
router.put("/editarUsuario/:id", usuarioController.editarUsuario);
router.delete("/eliminarUsuario/:id", usuarioController.eliminarUsuario);
router.post("/subirImagen/:id", multipartMiddleware, usuarioController.subirImagen);

router.post("/crearPost", postController.crearPost);
router.get("/post/:id", postController.mostrarPost);
router.get("/posts", postController.listarPosts);
router.put("/editarPost/:id", postController.editarPost);
router.delete("/eliminarPost/:id", postController.eliminarPost);

router.post("/crearMensaje", mensajeController.crearMensaje);
router.get("/mensaje/:id", mensajeController.mostrarMensaje);
router.get("/mensajes", mensajeController.listarMensajes);

router.post("/crearJuego", juegoController.crearJuego);
router.get("/juego/:id", juegoController.mostrarJuego);
router.get("/juegos", juegoController.listarJuegos);
router.put("/editarJuego/:id", juegoController.editarJuego);
router.delete("/eliminarJuego/:id", juegoController.eliminarJuego);

router.post("/crearEvento", eventoController.crearEvento);
router.get("/evento/:id", eventoController.mostrarEvento);
router.get("/eventos", eventoController.listarEventos);
router.put("/editarEvento/:id", eventoController.editarEvento);
router.delete("/eliminarEvento/:id", eventoController.eliminarEvento);

module.exports=router;