import { Component, OnInit } from '@angular/core';
import { Mensaje } from "../models/Mensaje";
import { MensajeService } from "../services/mensaje.service"
import { UsuarioService } from "../services/usuario.service";


@Component({
  selector: 'app-lista-mensajes',
  templateUrl: './lista-mensajes.component.html',
  styleUrls: ['./lista-mensajes.component.css']
})
export class ListaMensajesComponent implements OnInit {
  public mensajes:boolean;
  constructor(private _usuarioService: UsuarioService, private _mensajeService: MensajeService) { }

  ngOnInit(): void {
   

    this._usuarioService.listarUsuarios().subscribe(
      response => {
        console.log(response["usuarios"])
        for (let index = 0; index < response["usuarios"].length; index++) {
          if (response["usuarios"][index].NombreUsuario == sessionStorage.getItem("nombreUsuario") ||response["usuarios"][index].NombreUsuario == localStorage.getItem("nombreUsuario") ) {
            sessionStorage.setItem("idUsuario", response["usuarios"][index]._id);
          }
        }

      },
      error => {
        console.log(<any>error);
      }
    )
    this._mensajeService.listarMensajes().subscribe(
      response => {
        console.log(response["mensajes"])
        for (let index = 0; index < response["mensajes"].length; index++) {
          if(response["mensajes"][index].Receptor == sessionStorage.getItem("idUsuario") ||response["mensajes"][index].Receptor == localStorage.getItem("idUsuario") ){
            this._usuarioService.listarUsuarios().subscribe(
              response2 => {
                for (let j = 0; j < response2["usuarios"].length; j++) {
                  if(response2["usuarios"][j]._id == response["mensajes"][index].Emisor){
                    let nombreEmisor=response2["usuarios"][j].NombreUsuario;
                    localStorage.setItem("mensajes", "true");
                    let mensajes=document.getElementById("mensajes");
                    let div=document.createElement("div");
                    div.setAttribute("class", "border border-black w-25 mx-auto")
                    div.innerHTML=`
                      <span>De `+nombreEmisor+`</span>
                      <p>`+response["mensajes"][j].Mensaje+`</p>
                    `
                    mensajes.append(div);
                  }
                  
                }
              },
              error => {
                console.log(<any>error);
              }
            )
          }
        }

      },
      error => {
        console.log(<any>error);
      }
    )
  }
  comprobarMensajes():boolean{
    if(localStorage.getItem("mensajes") == "true"){
      return true;
    }else{
      return false;
    }
  }

}
