import { Component, OnInit } from '@angular/core';
import { Evento } from "../models/Evento";
import { EventoService } from "../services/evento.service";
import { UsuarioService } from "../services/usuario.service";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  providers: [UsuarioService, EventoService]
})
export class EventosComponent implements OnInit {
  public numeroEventos: Number;
  public usuarioCreador: string;
  constructor(private _eventoService: EventoService, private _usuarioService: UsuarioService) {
    this.numeroEventos = 0;
  }
  agregarUsuario() {

  }
  ngOnInit(): void {
    if(sessionStorage.getItem("apuntadoCorrecto") == "true"){
      
    }
    if (sessionStorage.getItem("agregarUsuario") == "true") {
      this._eventoService.listarEventos().subscribe(
        response => {
          if (sessionStorage.getItem("nombreUsuario")) {
            // response["eventos"][sessionStorage.getItem("indice")].UsuariosApuntados.push(sessionStorage.getItem("nombreUsuario"));

            // this._eventoService.agregarUsuario(response["eventos"][sessionStorage.getItem("indice")])).subscribe(
            //   response2 =>{
            //     console.log(response2);
            //   },
            //   error2=>{
            //     console.log(<any>error2);
            //   }
            // )
            for (let index = 0; index < response["eventos"].length; index++) {
              if (sessionStorage.getItem("nombreEvento") == response["eventos"][index].Nombre) {
                let usuariosInscritos=response["eventos"][index].UsuariosApuntados;
                usuariosInscritos.push(sessionStorage.getItem("nombreUsuario"));
                var eventoModificado=new Evento(response["eventos"][index]._id, response["eventos"][index].Nombre, response["eventos"][index].FechaHora, response["eventos"][index].Descripcion, response["eventos"][index].NombreJuego, response["eventos"][index].Creador, usuariosInscritos);
                console.log(eventoModificado);
                this._eventoService.agregarUsuario(response["eventos"][sessionStorage.getItem("indice")]._id, usuariosInscritos ).subscribe(
                  response2 => {
                    console.log(response2);
                    document.getElementById("apuntadoCorrecto").innerText ="Te has apuntado correctamente al evento "+response2["evento"].Nombre;
                    document.getElementById("apuntadoCorrecto").setAttribute("class", "alert alert-success d-block text-center");
                  },
                  error2 => {
                    console.log(<any>error2);
                  }
                )
              }

            }
          } else if (localStorage.getItem("nombreUsuario")) {

          }

        },
        error => {
          console.log(<any>error);
        }
      )
       sessionStorage.removeItem("agregarUsuario");
      // sessionStorage.removeItem("indice");
    }
    this._eventoService.listarEventos().subscribe(
      response => {
        this.numeroEventos = response["eventos"].length;
        let eventos = document.getElementById("eventos");
        for (let index = 0; index < response["eventos"].length; index++) {
          let caja = document.createElement("div");
          var creador = response["eventos"][index].Creador;
          this._usuarioService.listarUsuarios().subscribe(
            response2 => {
              for (let j = 0; j < response2["usuarios"].length; j++) {//Se obtiene el nombre del usuario creador a partir del id
                if (response2["usuarios"][j]._id == creador) {
                  this.usuarioCreador = response2["usuarios"][j].NombreUsuario;
                }

              }
              caja.setAttribute("class", "border my-3 text-center w-25 container cajaEvento");
              caja.innerHTML = `
                <h2>`+ response["eventos"][index].Nombre + `</h2>
                <h4>`+ response["eventos"][index].FechaHora + `</h4>
                <div><p>`+ response["eventos"][index].Descripcion + `</p></div>
                <h4>Juego: `+ response["eventos"][index].NombreJuego + `</h4>
                <h4>Usuario creador: `+ this.usuarioCreador + `</h4>
                <h4>Usuarios apuntados: `+ response["eventos"][index].UsuariosApuntados + `</h4>
                <button class="btn btn-primary m-3" onclick="sessionStorage.setItem('agregarUsuario', 'true'); sessionStorage.setItem('indice', `+ index + `); sessionStorage.setItem('nombreEvento', '` + response['eventos'][index].Nombre + `'); location.reload();">¡Me apunto!</button>
                
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
  ngOnLoad() {
    this.agregarBoton();

  }
  agregarBoton() {
    // let cajas=document.getElementsByClassName("cajaEvento");
    // let cajasArray=new Array();
    // console.log(cajas);
    // for (let index = 0; index < cajas.length; index++) {
    //  cajasArray[index]=cajas[index];
    //   console.log("a")
    // }
    // console.log(cajasArray);
    // for (let index = 0; index < cajasArray.length; index++) {
    //   console.log("a")
    //   let boton=document.createElement("button");
    //   boton.setAttribute("class", "btn btn-primary m-3");
    //   boton.setAttribute("ng-click", "agregarUsuario()");
    //   cajasArray[index].append(boton);
    // }
  }
}
