import { Component, OnInit } from '@angular/core';
import { Evento } from "../models/Evento";
import { EventoService } from "../services/evento.service";
import { UsuarioService } from "../services/usuario.service";
import { JuegoService } from "../services/juego.service";
import { Juego } from "../models/Juego";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  providers: [UsuarioService, EventoService]
})
export class EventosComponent implements OnInit {
  public numeroEventos: Number;
  public usuarioCreador: string;
  public usuarioConectado: boolean;
  public limite: string;
  constructor(private _eventoService: EventoService, private _usuarioService: UsuarioService, private _juegoService: JuegoService) { }
  yaExiste(array: Array<string>, elemento: string): boolean {
    let respuesta = false;
    for (let index = 0; index < array.length; index++) {
      if (array[index] == elemento) {
        respuesta = true;
      }
    }
    return respuesta;
  }
  getLimiteUsuarios(titulo: string, indice, usuariosApuntados) {
    this._juegoService.listarJuegos().subscribe(
      response => {
        for (let index = 0; index < response["juegos"].length; index++) {
          if (response["juegos"][index].NombreJuego == titulo) {
            this.limite = response["juegos"][index].LimiteUsuarios;
            if(this.limite == usuariosApuntados){
              document.getElementsByClassName("botonApuntarse")[indice].setAttribute("disabled", "true");
              document.getElementsByClassName("botonApuntarse")[indice].innerHTML="Límite de usuarios completo";
            }
            document.getElementsByClassName("apuntados")[indice].innerHTML+="("+usuariosApuntados+"/"+this.limite+")"
          }
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  ngOnInit(): void {
    this.usuarioConectado = true;
    document.getElementById("apuntadoIncorrecto").innerText = "";
    document.getElementById("apuntadoIncorrecto").setAttribute("class", "alert alert-danger d-none text-center");
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
              var numeroApuntados = new Array();
              numeroApuntados = response["eventos"][index].UsuariosApuntados;
              this.getLimiteUsuarios(response["eventos"][index].NombreJuego, index, numeroApuntados.length);
              caja.setAttribute("class", "border text-center w-25 container cajaEvento m-3");
              caja.innerHTML = `
              <div class=''>
                <h2>`+ response["eventos"][index].Nombre + `</h2>
                <h4>`+ response["eventos"][index].FechaHora + `</h4>
                <div><p>`+ response["eventos"][index].Descripcion + `</p></div>
                <h4>Juego: `+ response["eventos"][index].NombreJuego + `</h4>
                <h4>Usuario creador: `+ this.usuarioCreador + `</h4>
                <h4 class='apuntados'>Usuarios apuntados:<br/></h4>
                <ul>`;
                for (let i = 0; i < response["eventos"][index].UsuariosApuntados.length; i++) {
                  caja.innerHTML+="<li class='list-unstyled'>"+response["eventos"][index].UsuariosApuntados[i]+"</li>";
                  
                }
                caja.innerHTML+=`
                </ul>
                <button class="btn btn-primary m-3 botonApuntarse" onclick="sessionStorage.setItem('agregarUsuario', 'true'); sessionStorage.setItem('indice', `+ index + `); sessionStorage.setItem('nombreEvento', '` + response['eventos'][index].Nombre + `');location.reload();">¡Me apunto!</button>
                </div>`;
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
    if (sessionStorage.getItem("agregarUsuario") == "true") {
      this._eventoService.listarEventos().subscribe(
        response => {
          if (sessionStorage.getItem("nombreUsuario") || localStorage.getItem("nombreUsuario")) {
            for (let index = 0; index < response["eventos"].length; index++) {
              if (sessionStorage.getItem("nombreEvento") == response["eventos"][index].Nombre) {
                let usuariosInscritos = response["eventos"][index].UsuariosApuntados;
                if (!this.yaExiste(usuariosInscritos, sessionStorage.getItem("nombreUsuario")) && !this.yaExiste(usuariosInscritos, localStorage.getItem("nombreUsuario"))) {
                    if (sessionStorage.getItem("nombreUsuario")) {
                      usuariosInscritos.push(sessionStorage.getItem("nombreUsuario"));
                    } else {
                      usuariosInscritos.push(localStorage.getItem("nombreUsuario"));
                    }
                    this._eventoService.agregarUsuario(response["eventos"][sessionStorage.getItem("indice")]._id, usuariosInscritos).subscribe(
                      response2 => {
                        console.log(response2);
                        document.getElementById("apuntadoCorrecto").innerText = "Te has apuntado correctamente al evento " + response2["evento"].Nombre;
                        document.getElementById("apuntadoCorrecto").setAttribute("class", "alert alert-success d-block text-center");
                        this._usuarioService.listarUsuarios().subscribe(
                          response3 => {
                            for (let j = 0; j < response3["usuarios"].length; j++) {
                              if (response3["usuarios"][j]._id == sessionStorage.getItem("idUsuario")) {
                                let listaEventos = response3["usuarios"][j].idEvento;
                                listaEventos.push(response2["evento"]._id);
                                this._usuarioService.actualizarListaEventos(response3["usuarios"][j]._id, listaEventos).subscribe(
                                  response4 => {
                                    console.log(response4);
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
                      },
                      error2 => {
                        console.log(<any>error2);
                      }
                    )
                  
                } else {
                  document.getElementById("apuntadoIncorrecto").innerText = "Ya estás apuntad@ a ese evento";
                  document.getElementById("apuntadoIncorrecto").setAttribute("class", "alert alert-primary d-block text-center");
                }
              }
            }
          } else {
            this.usuarioConectado = false;
          }

        },
        error => {
          console.log(<any>error);
        }
      )
      sessionStorage.removeItem("agregarUsuario");
    }
  }
}
