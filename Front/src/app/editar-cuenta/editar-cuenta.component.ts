import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../services/usuario.service";
import { Global } from '../services/global';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {
  public nombreUsuario: string;
  public url: string;
  public usuario: Usuario;
  public filesToUpload: Array<File>

  constructor(private _usuarioService: UsuarioService, private router: Router,  private _uploadService: UploadService) { this.url = Global.url;this.usuario = new Usuario("", "", "", "", "", "", false, "", [], [], "", "", "", "", "", "", "", ""); }

  ngOnInit(): void {
    if (localStorage.getItem("nombreUsuario") != undefined) {
      this.nombreUsuario = localStorage.getItem("nombreUsuario");
    } else {
      this.nombreUsuario = sessionStorage.getItem("nombreUsuario");
    }
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        for (let index = 0; index < response["usuarios"].length; index++) {
          if (response["usuarios"][index].NombreUsuario == this.nombreUsuario) {
            this.usuario = response["usuarios"][index];
          }
        }

      },
      error => {
        console.log(<any>error);
      }
    )
  }

  guardar(): void {
    if(sessionStorage.getItem("nombreUsuario")){
      sessionStorage.setItem("nombreUsuario", this.usuario.NombreUsuario);
    }else{
      localStorage.setItem("nombreUsuario", this.usuario.NombreUsuario);
    }
    
    this._usuarioService.editarUsuario(this.usuario._id, this.usuario).subscribe(
      response => {
        console.log(response);
        document.getElementById("correcto").setAttribute("class", "alert alert-success d-block text-center");
        document.getElementById("correcto").innerText="Se ha modificado el usuario correctamente";
        console.log(this.usuario.FotoPerfil)
        if (this.usuario.FotoPerfil != "") {
          this._uploadService.makeFileRequest(Global.url + "subirImagen/" + response["usuario"]._id, [], this.filesToUpload, "image").then((result: any) => {
          })
        }
      })
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  elminarFotoPerfil(){
    let respuesta = confirm("Seguro que quieres eliminar la foto de perfil actual?");
    if(respuesta){
      this.usuario.FotoPerfil="";
      alert("Foto de perfil eliminada correctamente");
    }else{
      alert("No se ha eliminado la foto de perfil");
    }
  }
}
