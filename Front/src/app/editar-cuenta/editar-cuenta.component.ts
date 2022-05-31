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

  constructor(private _usuarioService: UsuarioService, private router: Router) { this.url = Global.url;this.usuario = new Usuario("", "", "", "", "", "", false, "", [], [], "", "", "", "", "", "", "", ""); }

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
      })
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/EditarCuenta"]);
  }
}
