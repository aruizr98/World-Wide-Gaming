import { Component, OnInit } from '@angular/core';
import { Usuario } from "../models/usuario";
import { UsuarioService } from "../services/usuario.service";

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  public nombreUsuario:string;
  public administrador:boolean;
  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    if(localStorage.getItem("nombreUsuario") !=undefined){
      this.nombreUsuario = localStorage.getItem("nombreUsuario");
      this._usuarioService.listarUsuarios().subscribe(
        response => {
          for (let index = 0; index < response["usuarios"].length; index++) {
           if(response["usuarios"][index].NombreUsuario == this.nombreUsuario){//Obtener el usuario completo a partir del nombre de usuario para saber si es admin o no
            this.administrador=response["usuarios"][index].Administrador;
           }
          }
  
        },
        error => {
          console.log(<any>error);
        }
      )
      
    }else{
      this.nombreUsuario=sessionStorage.getItem("nombreUsuario");
      this._usuarioService.listarUsuarios().subscribe(
        response => {
          for (let index = 0; index < response["usuarios"].length; index++) {
           if(response["usuarios"][index].NombreUsuario == this.nombreUsuario){//Obtener el usuario completo a partir del nombre de usuario para saber si es admin o no
            this.administrador=response["usuarios"][index].Administrador;
           }
          }
  
        },
        error => {
          console.log(<any>error);
        }
      )
    }
  }

}
