"use strict"
var express=require("express");
var usuarioController=require("../Controllers/usuario");

var router=express.Router();

router.get("/home", usuarioController.home);
router.post("/test", usuarioController.test);
router.post("/guardarUsuario", usuarioController.guardarUsuario);
router.get("/usuario/:id", usuarioController.listarUsuario);
router.get("/usuarios", usuarioController.listarUsuarios);
router.put("/editarUsuario/:id", usuarioController.editarUsuario);
router.delete("/eliminarUsuario/:id", usuarioController.eliminarUsuario);

module.exports=router;