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
  onSubmit(form){
    console.log(this.usuario);
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
