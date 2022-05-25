import { Component, OnInit } from '@angular/core';
import { Usuario } from "../models/usuario";
import { UsuarioService } from "../services/usuario.service";
import { Global } from '../services/global';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  public usuario: Usuario;
  public email: string;
  public contrasenya: string;
  public recuerdame: boolean;
  constructor(private _usuarioService: UsuarioService) {
    this.usuario = new Usuario("", "", "", "", "", "", false, "", [], [], "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    console.log("asdasd");
    sessionStorage.setItem("loginCorrecto", "true");

  }
  onSubmit(form) {
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        sessionStorage.setItem("loginCorrecto", "false");
        var correoCorrecto = false;
        var contrasenyaCorrecta = false;
        for (let index = 0; index < response["usuarios"].length; index++) {
          if (response["usuarios"][index].Correo == this.usuario.Correo) {
            correoCorrecto = true;
            document.getElementById("correoIncorrecto").setAttribute("class", "alert alert-danger d-none");
            if (response["usuarios"][index].Contrasenya == this.usuario.Contrasenya) {
              contrasenyaCorrecta = true;
              document.getElementById("contrasenyaIncorrecta").setAttribute("class", "alert alert-danger d-none");
              sessionStorage.setItem("loginCorrecto", "true");
              console.log(this.recuerdame);
              if (this.recuerdame == undefined || !this.recuerdame) {
                sessionStorage.setItem("nombreUsuario", response["usuarios"][index].NombreUsuario);
                sessionStorage.setItem("idUsuario", response["usuarios"][index]._id);
              } else {
                localStorage.setItem("nombreUsuario", response["usuarios"][index].NombreUsuario);
                localStorage.setItem("idUsuario", response["usuarios"][index]._id);
              }
              location.href = "/inicio";

            }
          }


        }
        if (!correoCorrecto) {
          document.getElementById("correoIncorrecto").setAttribute("class", "alert alert-danger d-block");
        } else if (!contrasenyaCorrecta) {
          document.getElementById("contrasenyaIncorrecta").setAttribute("class", "alert alert-danger d-block");
        }


      },
      error => {
        console.log(<any>error);
      }
    )
  }
}
