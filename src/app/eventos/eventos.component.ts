import { Component, OnInit } from '@angular/core';
import { Evento } from "../models/Evento";
import { EventoService } from "../services/evento.service";
import { UsuarioService } from "../services/usuario.service";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  public numeroEventos: Number;
  public usuarioCreador:string;
  constructor(private _eventoService: EventoService, private _usuarioService : UsuarioService) {
    this.numeroEventos = 0;
  }

  ngOnInit(): void {
    this._eventoService.listarEventos().subscribe(
      response => {
        this.numeroEventos = response["eventos"].length;
        console.log(this.numeroEventos);
        console.log(response["eventos"]);
        let eventos=document.getElementById("eventos");
        for (let index = 0; index < response["eventos"].length; index++) {
          let caja = document.createElement("div");
          var creador=response["eventos"][index].Creador;
          this._usuarioService.listarUsuarios().subscribe(
            response2 => {
              for (let j = 0; j < response2["usuarios"].length; j++) {//Se obtiene el nombre del usuario creador a partir del id
               if(response2["usuarios"][j]._id == creador){
                this.usuarioCreador=response2["usuarios"][j].NombreUsuario;
               }
                
              }
              caja.setAttribute("class", "border my-3 text-center w-25 container");
              caja.innerHTML=`
                <h2>`+response["eventos"][index].Nombre+`</h2>
                <h4>`+response["eventos"][index].FechaHora+`</h4>
                <div><p>`+response["eventos"][index].Descripcion+`</p></div>
                <h4>Juego: `+response["eventos"][index].NombreJuego+`</h4>
                <h4>Usuario creador: `+this.usuarioCreador+`</h4>
              `;
              eventos.appendChild(caja);
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

}
