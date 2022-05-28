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
  getLimiteUsuarios(titulo: string) {
    this._juegoService.listarJuegos().subscribe(
      response => {
        for (let index = 0; index < response["juegos"].length; index++) {
          if (response["juegos"][index].NombreJuego == titulo) {
            sessionStorage.setItem("limiteUsuarios", response["juegos"][index].LimiteUsuarios);
            this.limite = response["juegos"][index].LimiteUsuarios;
          }
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  ngOnInit(): void {
    sessionStorage.removeItem("limiteUsuarios");
    this.usuarioConectado = true;
    document.getElementById("apuntadoIncorrecto").innerText = "";
    document.getElementById("apuntadoIncorrecto").setAttribute("class", "alert alert-danger d-none text-center");
    if (sessionStorage.getItem("agregarUsuario") == "true") {
      this._eventoService.listarEventos().subscribe(
        response => {
          if (sessionStorage.getItem("nombreUsuario")) {
            for (let index = 0; index < response["eventos"].length; index++) {
              if (sessionStorage.getItem("nombreEvento") == response["eventos"][index].Nombre) {
                let usuariosInscritos = response["eventos"][index].UsuariosApuntados;
                this.getLimiteUsuarios(response["eventos"][index].NombreJuego);
                if (!this.yaExiste(usuariosInscritos, sessionStorage.getItem("nombreUsuario"))) {
                  if (Number(sessionStorage.getItem("limiteUsuarios")) > usuariosInscritos.length) {
                    usuariosInscritos.push(sessionStorage.getItem("nombreUsuario"));
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
                  }else{
                    document.getElementById("apuntadoIncorrecto").innerText = "Se ha superado el límite de usuarios permitidos para ese juego";
                    document.getElementById("apuntadoIncorrecto").setAttribute("class", "alert alert-danger d-block text-center");
                  }
                } else {
                  document.getElementById("apuntadoIncorrecto").innerText = "Ya estás apuntad@ a ese evento";
                  document.getElementById("apuntadoIncorrecto").setAttribute("class", "alert alert-primary d-block text-center");
                }
              }
            }
          } else if (localStorage.getItem("nombreUsuario")) {
            for (let index = 0; index < response["eventos"].length; index++) {
              if (sessionStorage.getItem("nombreEvento") == response["eventos"][index].Nombre) {
                let usuariosInscritos = response["eventos"][index].UsuariosApuntados;
                this.getLimiteUsuarios(response["eventos"][index].NombreJuego);
                if (!this.yaExiste(usuariosInscritos, localStorage.getItem("nombreUsuario"))) {
                  console.log(Number(sessionStorage.getItem("limiteUsuarios")))
                  console.log(usuariosInscritos.length)
                  if (Number(sessionStorage.getItem("limiteUsuarios")) > usuariosInscritos.length) {
                    usuariosInscritos.push(localStorage.getItem("nombreUsuario"));
                    this._eventoService.agregarUsuario(response["eventos"][sessionStorage.getItem("indice")]._id, usuariosInscritos).subscribe(
                      response2 => {
                        console.log(response2);
                        document.getElementById("apuntadoCorrecto").innerText = "Te has apuntado correctamente al evento " + response2["evento"].Nombre;
                        document.getElementById("apuntadoCorrecto").setAttribute("class", "alert alert-success d-block text-center");
                        this._usuarioService.listarUsuarios().subscribe(
                          response3 => {
                            for (let j = 0; j < response3["usuarios"].length; j++) {
                              if (response3["usuarios"][j]._id == localStorage.getItem("idUsuario")) {
                                console.log("El usuario ha coincidido")
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
                    document.getElementById("apuntadoIncorrecto").innerText = "Se ha superado el límite de usuarios permitidos para ese juego";
                    document.getElementById("apuntadoIncorrecto").setAttribute("class", "alert alert-danger d-block text-center");
                  }

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
}
