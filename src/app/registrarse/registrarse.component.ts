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
  constructor(
    private _usuarioService:UsuarioService
  ) {
    this.url=Global.url; 
    this.usuario=new Usuario("", "", "", "", "", "", false, "");
  }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.usuario);
    if(!this.usuario.Administrador){
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
    }else{
      let codigo=prompt("Introduce el código para ser administrador");
      if(codigo == "1234"){
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
      }else{
        alert("Código incorrecto.");
      }
    }
  }
}
