import { Component, OnInit } from '@angular/core';
import {Usuario} from "../models/usuario";
import {UsuarioService} from "../services/usuario.service";
import { Global } from '../services/global';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
  providers:[UsuarioService]
})
export class RegistrarseComponent implements OnInit {
  public usuario:Usuario;
  public url:string;
  public status:boolean;
  public NombreUsuarioRepetido:boolean;
  public CorreoRepetido:boolean;
  constructor(
    private _usuarioService:UsuarioService
  ) {
    this.url=Global.url; 
    this.usuario=new Usuario("", "", "", "", "", "", false, "");
  }

  ngOnInit(): void {
  }
  comprobarNombreUsuario():boolean{
    var repetido=false;
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        for (let index = 0; index < response["usuarios"].length; index++) {
          if(response["usuarios"][index].NombreUsuario == this.usuario.NombreUsuario){
            this.NombreUsuarioRepetido=true;
          }
        }
      },
      error => {
        console.log(<any>error);
      }
    )
    if(repetido){
      return true;
    }else{
      return false;
    }
  }
  comprobarCorreo(){
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        for (let index = 0; index < response["usuarios"].length; index++) {
          if(response["usuarios"][index].Correo == this.usuario.Correo){
            this.CorreoRepetido=true;
          }
        }
       

      },
      error => {
        console.log(<any>error);
      }
    )
  }
  onSubmit(form){
    this.comprobarNombreUsuario();
    console.log(this.NombreUsuarioRepetido);
    if(!this.NombreUsuarioRepetido && !this.CorreoRepetido){
       this._usuarioService.guardarUsuario(this.usuario).subscribe(
      response => {
        console.log(response);
        if(response.usuario){
          this.status=true;
        }
        
      },
      error =>{
        console.log(<any>error);
      }
    )
    }
   
  }
}
