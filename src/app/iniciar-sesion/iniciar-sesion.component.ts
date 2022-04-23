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
  public recuerdame:boolean;
  constructor(private _usuarioService: UsuarioService) {
    this.usuario = new Usuario("", "", "", "", "", "", false, "");
  }

  ngOnInit(): void { }
  onSubmit(form) {
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        for (let index = 0; index < response["usuarios"].length; index++) {
          if(response["usuarios"][index].Correo == this.usuario.Correo && response["usuarios"][index].Contrasenya == this.usuario.Contrasenya){
            
            console.log(this.recuerdame);
            if(this.recuerdame == undefined || !this.recuerdame){
              sessionStorage.setItem("nombreUsuario", response["usuarios"][index].NombreUsuario);
            }else{
              localStorage.setItem("nombreUsuario", response["usuarios"][index].NombreUsuario);
            }
             location.href="/inicio";
          }
        }

      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
