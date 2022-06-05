import { Component, OnInit } from '@angular/core';
import { Usuario } from "../models/usuario";
import { UsuarioService } from "../services/usuario.service";
import { Global } from '../services/global';
import { UploadService } from '../services/upload.service';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
  providers: [UsuarioService, UploadService]
})
export class RegistrarseComponent implements OnInit {
  public usuario: Usuario;
  public url: string;
  public status: boolean;
  public filesToUpload: Array<File>
  constructor(
    private _usuarioService: UsuarioService,
    private _uploadService: UploadService
  ) {
    this.url = Global.url;
    this.usuario = new Usuario("", "", "", "", "", "", false, "", [], [], "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
  }
  onSubmit(form) {
    console.log(this.usuario);
    if (!this.usuario.Administrador) {
      this._usuarioService.guardarUsuario(this.usuario).subscribe(
        response => {
          if (response.usuario) {
            this.status = true;
            this._uploadService.makeFileRequest(Global.url + "subirImagen/" + response.usuario._id, [], this.filesToUpload, "image").then((result: any) => {
              this.status = true;
              console.log(result);
              form.reset();
            })
          }

        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      let codigo = prompt("Introduce el código para ser administrador");
      if (codigo == "1234") {
        this._usuarioService.guardarUsuario(this.usuario).subscribe(
          response => {
            if (response.usuario) {
              this.status = true;
              if(this.usuario.FotoPerfil != ""){
                //Subir la foto de perfil
                this._uploadService.makeFileRequest(Global.url + "subirImagen/" + response.usuario._id, [], this.filesToUpload, "image").then((result: any) => {
                this.status = true;
                console.log(result);
                form.reset();
              })
              }
              
              
            }

          },
          error => {
            console.log(<any>error);
          }
        )

      } else {
        alert("Código incorrecto.");
      }
    }
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }
}
