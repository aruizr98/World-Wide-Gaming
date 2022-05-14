import { Component, OnInit } from '@angular/core';
import {Mensaje} from '../models/Mensaje';
import { MensajeService } from '../services/mensaje.service';
import{UsuarioService} from '../services/usuario.service';
import { Global } from '../services/global';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.css'],
  providers:[MensajeService]
})
export class EnviarMensajeComponent implements OnInit {
  public mensaje:Mensaje;
  public url:string;
  public status:boolean;
  constructor(private _usuarioService:UsuarioService, private _mensajeService:MensajeService) {
    this.url=Global.url; 
    if(sessionStorage.getItem("idUsuario")){
    this.mensaje=new Mensaje("", "", "", sessionStorage.getItem("idUsuario"));
    }else{
      this.mensaje=new Mensaje("", "", "", localStorage.getItem("idUsuario")); 
    }
   }

  ngOnInit(): void {
    this._usuarioService.listarUsuarios().subscribe(
      response =>{
        console.log(response["usuarios"]);
        for (let index = 0; index < response["usuarios"].length; index++) {
          if(index==0){
            document.getElementById("receptores").innerHTML+=`
            <option value='`+response["usuarios"][index]._id+`' checked>`+response["usuarios"][index].NombreUsuario+`</option>
          `;
          }else{
            document.getElementById("receptores").innerHTML+=`
            <option value='`+response["usuarios"][index]._id+`'>`+response["usuarios"][index].NombreUsuario+`</option>
          `;
          }
          
        };
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  onSubmit(){
   this._mensajeService.crearMensjae(this.mensaje).subscribe(
     response=>{
      console.log(response);
      this.status=true;
     },
     error=>{
       console.log(<any>error);
     }
   )
  }
}
