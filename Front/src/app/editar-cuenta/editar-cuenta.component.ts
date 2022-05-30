import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../services/usuario.service";
import { Global } from '../services/global';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {
  public nombreUsuario: string;
  public url: string;
  public usuario: Usuario;

  constructor(private _usuarioService: UsuarioService, private router: Router) { this.url = Global.url; }

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
            this.usuario.Contrasenya = (response["usuarios"][index].Contrasenya).split("");
            let aux = [];
            for (let index2 = 0; index2 < this.usuario.Contrasenya.length; index2++) {
              aux.push("•");
            }
            this.usuario.Contrasenya = aux.join("");
          }
        }

      },
      error => {
        console.log(<any>error);
      }
    )
  }

  guardar(): void {
    if(document.forms["form"]["nombre"].value != "") {
      this.usuario.Nombre = document.forms["form"]["nombre"].value;
    }
    if(document.forms["form"]["apellidos"].value != "") {
      this.usuario.Apellidos = document.forms["form"]["apellidos"].value;
    }
    if(document.forms["form"]["nombreUsuario"].value != "") {
      this.usuario.NombreUsuario = document.forms["form"]["nombreUsuario"].value;
    }
    if(document.forms["form"]["correo"].value != "") {
      this.usuario.Correo = document.forms["form"]["correo"].value;
    }
    if(document.forms["form"]["contrasenya"].value != "") {
      this.usuario.Contrasenya = document.forms["form"]["contrasenya"].value;
    }
    if(document.forms["form"]["facebook"].value != "") {
      this.usuario.Facebook = document.forms["form"]["facebook"].value;
    }
    if(document.forms["form"]["twitter"].value != "") {
      this.usuario.Twitter = document.forms["form"]["twitter"].value;
    }
    if(document.forms["form"]["discord"].value != "") {
      this.usuario.Discord = document.forms["form"]["discord"].value;
    }
    if(document.forms["form"]["steam"].value != "") {
      this.usuario.Steam = document.forms["form"]["steam"].value;
    }
    if(document.forms["form"]["epic"].value != "") {
      this.usuario.Epic = document.forms["form"]["epic"].value;
    }
    if(document.forms["form"]["twitch"].value != "") {
      this.usuario.Twitch = document.forms["form"]["twitch"].value;
    }
    if(document.forms["form"]["youtube"].value != "") {
      this.usuario.Youtube = document.forms["form"]["youtube"].value;
    }
    this._usuarioService.editarUsuario(this.usuario._id, this.usuario).subscribe(
      response => {
        console.log(response);
      })
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/EditarCuenta"]);
  }
}
