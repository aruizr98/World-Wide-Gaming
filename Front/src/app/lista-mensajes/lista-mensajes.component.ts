import { Component, OnInit } from '@angular/core';
import { Mensaje } from "../models/Mensaje";
import { MensajeService } from "../services/mensaje.service"
import { UsuarioService } from "../services/usuario.service";
import { AppModule } from "../app.module"


@Component({
  selector: 'app-lista-mensajes',
  templateUrl: './lista-mensajes.component.html',
  styleUrls: ['./lista-mensajes.component.css']
})
export class ListaMensajesComponent implements OnInit {
  public mensajes: boolean;
  constructor(private _usuarioService: UsuarioService, private _mensajeService: MensajeService) { }

  ngOnInit(): void {
    this._usuarioService.listarUsuarios().subscribe(

      response => {
        for (let index = 0; index < response["usuarios"].length; index++) {
          this._mensajeService.listarMensajes().subscribe(
            response2 => {
              let mensajes = false;
              var caja = document.createElement("div");
              let contador=0;
              caja.setAttribute("style", "height:300px;overflow:scroll;")
              caja.setAttribute("class", "border border-black w-25 mx-auto my-3 px-2 ");
              var mensajesCaja = document.getElementById("mensajes");
              for (let j = 0; j < response2["mensajes"].length; j++) {
                if (response["usuarios"][index]._id == response2["mensajes"][j].Emisor && (response2["mensajes"][j].Receptor == sessionStorage.getItem("idUsuario") || response2["mensajes"][j].Receptor == localStorage.getItem("idUsuario"))) {
                  if(contador==0){
                    caja.innerHTML += "<div class='text-center'><span><b>" + response["usuarios"][index].NombreUsuario + "</b></span></div>";
                    contador++;
                  }
                  localStorage.setItem("mensajes", "true");
                  mensajes = true;
                  caja.innerHTML += "<p class='m-0 text-start'>" + response2["mensajes"][j].Mensaje + "</p>";
                }else if((response2["mensajes"][j].Emisor == sessionStorage.getItem("idUsuario") || response2["mensajes"][j].Emisor == localStorage.getItem("idUsuario")) && response["usuarios"][index]._id == response2["mensajes"][j].Receptor  ){
                  localStorage.setItem("mensajes", "true");
                  mensajes=true;
                  if(contador==0){
                    caja.innerHTML += "<div class='text-center'><span><b>" + response["usuarios"][index].NombreUsuario + "</b></span></div>";
                    contador++;
                  }
                  caja.innerHTML += "<p class='m-0 text-end'>" + response2["mensajes"][j].Mensaje + "</p>";
                }

              }
              if (mensajes) {
                let div=document.createElement("div");
                let button=document.createElement("button");
                div.setAttribute("class", "text-center my-2");
                button.setAttribute("class", "btn btn-primary");
                button.setAttribute("onclick", "sessionStorage.setItem('receptorEstablecido', this.parentElement.parentElement.children[0].children[0].innerText); location.href='/EnviarMensaje'");
                button.innerText="Escribir mensaje";
                div.append(button);
                caja.append(div);
                mensajesCaja.append(caja);
              }
             
            },
            error => {
              console.log(<any>error);
            }
          )

        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  comprobarMensajes(): boolean {
    if (localStorage.getItem("mensajes") == "true") {
      return true;
    } else {
      return false;
    }
  }

}
