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
              let contador = 0;
              caja.setAttribute("style", "height:450px;overflow:scroll;")
              caja.setAttribute("class", "border text-center w-25 container cajaEvento m-3 mensaje");
              var mensajesCaja = document.getElementById("mensajes");
              for (let j = 0; j < response2["mensajes"].length; j++) {
                if (response["usuarios"][index]._id == response2["mensajes"][j].Emisor && (response2["mensajes"][j].Receptor == sessionStorage.getItem("idUsuario") || response2["mensajes"][j].Receptor == localStorage.getItem("idUsuario"))) {
                  if (contador == 0) {
                    caja.innerHTML += "<div class='text-center'><span><b>" + response["usuarios"][index].NombreUsuario + "</b></span></div>";
                    contador++;
                  }
                  localStorage.setItem("mensajes", "true");
                  mensajes = true;
                  caja.innerHTML += "<br/><p class='d-block m-0 text-start text-white w-auto my-2 p-1' style='background-color:#03BB85;float:left;border-radius:0px 10px 10px 10px'>" + response2["mensajes"][j].Mensaje + "</p><br/>";
                } else if ((response2["mensajes"][j].Emisor == sessionStorage.getItem("idUsuario") || response2["mensajes"][j].Emisor == localStorage.getItem("idUsuario")) && response["usuarios"][index]._id == response2["mensajes"][j].Receptor) {
                  localStorage.setItem("mensajes", "true");
                  mensajes = true;
                  if (contador == 0) {
                    caja.innerHTML += "<div class='text-center'><span><b>" + response["usuarios"][index].NombreUsuario + "</b></span></div>";
                    contador++;
                  }
                  caja.innerHTML += "<br/><p class='d-block h-auto m-0 text-end w-auto text-white my-2 p-1' style='background-color:#143D59;float:right;border-radius:10px 0px 10px 10px'>" + response2["mensajes"][j].Mensaje + "</p><br/>";
                }

              }
              if (mensajes) {
                let br = document.createElement("br");
                let div = document.createElement("div");
                let button = document.createElement("button");
                div.setAttribute("class", "text-center my-2");
                button.setAttribute("class", " btn btn-primary");
                button.setAttribute("onclick", "sessionStorage.setItem('amigo', this.parentElement.parentElement.children[0].children[0].innerText); location.href='/MensajeAmigo'");
                button.innerHTML += `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-fill" viewBox="0 0 16 16">
                  <path d="M14 0a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                </svg>
                `
                div.append(br);
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
