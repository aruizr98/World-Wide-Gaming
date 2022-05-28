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
  public usuarioConectado:boolean;
  constructor(private _eventoService: EventoService, private _usuarioService: UsuarioService) {
    this.numeroEventos = 0;
  }
  yaExiste(array: Array<string>, elemento: string): boolean {
    let respuesta = false;
    for (let index = 0; index < array.length; index++) {
      if (array[index] == elemento) {
        respuesta = true;
      }
    }
    return respuesta;
  }
  ngOnInit(): void {
    this.usuarioConectado=true;
    document.getElementById("apuntadoIncorrecto").innerText = "";
    document.getElementById("apuntadoIncorrecto").setAttribute("class", "alert alert-danger d-none text-center");
    if (sessionStorage.getItem("agregarUsuario") == "true") {
      this._eventoService.listarEventos().subscribe(
        response => {
          if (sessionStorage.getItem("nombreUsuario")) {
            for (let index = 0; index < response["eventos"].length; index++) {
              if (sessionStorage.getItem("nombreEvento") == response["eventos"][index].Nombre) {
                let usuariosInscritos = response["eventos"][index].UsuariosApuntados;
                if (!this.yaExiste(usuariosInscritos, sessionStorage.getItem("nombreUsuario"))) {
                  usuariosInscritos.push(sessionStorage.getItem("nombreUsuario"));
                  var eventoModificado = new Evento(response["eventos"][index]._id, response["eventos"][index].Nombre, response["eventos"][index].FechaHora, response["eventos"][index].Descripcion, response["eventos"][index].NombreJuego, response["eventos"][index].Creador, usuariosInscritos);
                  console.log(eventoModificado);
                  this._eventoService.agregarUsuario(response["eventos"][sessionStorage.getItem("indice")]._id, usuariosInscritos).subscribe(
                    response2 => {
                      console.log(response2);
                      document.getElementById("apuntadoCorrecto").innerText = "Te has apuntado correctamente al evento " + response2["evento"].Nombre;
                      document.getElementById("apuntadoCorrecto").setAttribute("class", "alert alert-success d-block text-center");
                      this._usuarioService.listarUsuarios().subscribe(
                        response3 => {
                          for (let j = 0; j < response3["usuarios"].length; j++) {
                            if (response3["usuarios"][j]._id == sessionStorage.getItem("idUsuario")) {
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
                  document.getElementById("apuntadoIncorrecto").innerText = "Ya estás apuntad@ a ese evento";
                  document.getElementById("apuntadoIncorrecto").setAttribute("class", "alert alert-primary d-block text-center");
                }


              }

            }
          } else if (localStorage.getItem("nombreUsuario")) {
            for (let index = 0; index < response["eventos"].length; index++) {
              if (sessionStorage.getItem("nombreEvento") == response["eventos"][index].Nombre) {
                let usuariosInscritos = response["eventos"][index].UsuariosApuntados;
                if (!this.yaExiste(usuariosInscritos, localStorage.getItem("nombreUsuario"))) {
                  usuariosInscritos.push(localStorage.getItem("nombreUsuario"));
                  var eventoModificado = new Evento(response["eventos"][index]._id, response["eventos"][index].Nombre, response["eventos"][index].FechaHora, response["eventos"][index].Descripcion, response["eventos"][index].NombreJuego, response["eventos"][index].Creador, usuariosInscritos);
                  console.log(eventoModificado);
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
                  document.getElementById("apuntadoIncorrecto").innerText = "Ya estás apuntad@ a ese evento";
                  document.getElementById("apuntadoIncorrecto").setAttribute("class", "alert alert-primary d-block text-center");
                }


              }

            }
          }else{
            this.usuarioConectado=false;
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
