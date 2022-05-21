import { Component, OnInit } from '@angular/core';
import { Usuario } from "../models/usuario";
import { UsuarioService } from "../services/usuario.service";
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  public nombreUsuario: string;
  public administrador: boolean;
  public nombreCompleto:string;
  public correo:string;
  public facebook:string;
  public twitter:string;
  public instagram:string;
  public discord:string;
  public twitch:string;
  public youtube:string;

  constructor(private _usuarioService: UsuarioService, private _eventoService: EventoService) { }

  obtenerInfoEvento(id: string): Array<string> {
    let arrayInfo = new Array<string>();
    this._eventoService.listarEventos().subscribe(
      response => {
        for (let index = 0; index < response["eventos"].length; index++) {
          if (response["eventos"][index]._id == id) {
            arrayInfo.push(response["eventos"][index].Nombre);
            arrayInfo.push(response["eventos"][index].FechaHora);
          }

        }
        return arrayInfo;
      },
      error => {
        console.log(<any>error);
      }
    )
    return arrayInfo;
  }
  ngOnInit(): void {
      //Mostrar nombre de usuario
      if(localStorage.getItem("nombreUsuario") != undefined){
        this.nombreUsuario = localStorage.getItem("nombreUsuario");
      }else{
        this.nombreUsuario = sessionStorage.getItem("nombreUsuario");
      }
      //Mostrar eventos
      this._usuarioService.listarUsuarios().subscribe(
        response => {
          for (let index = 0; index < response["usuarios"].length; index++) {
            if (response["usuarios"][index].NombreUsuario == this.nombreUsuario) {//Obtener el usuario completo a partir del nombre de usuario para saber si es admin o no
              this.administrador = response["usuarios"][index].Administrador;
              for (let j = 0; j < response["usuarios"][index].idEvento.length; j++) {
                //Mostrar eventos
                this._eventoService.listarEventos().subscribe(
                  response2 => {
                    for (let l = 0; l < response2["eventos"].length; l++) {
                      if (response2["eventos"][l]._id == response["usuarios"][index].idEvento[j]) {
                        document.getElementById("proximosEventos").innerHTML += `
                          <p>`+response2["eventos"][l].Nombre+ `<span> =>`+response2["eventos"][l].FechaHora + `</span></p>`
                      }
                    }
                  },
                  error => {
                    console.log(<any>error);
                  }
                )
                this.nombreCompleto=response["usuarios"][index].Nombre+" "+response["usuarios"][index].Apellidos;
                this.correo=response["usuarios"][index].Correo;
                this.facebook=response["usuarios"][index].Facebook;
                this.twitter=response["usuarios"][index].Twitter;
                this.instagram=response["usuarios"][index].Instagram;
                this.discord=response["usuarios"][index].Discord;
                this.twitch=response["usuarios"][index].Tiwtch;
                this.youtube=response["usuarios"][index].Youtube;
                //Mostrar información del usuario
                // document.getElementById("infoUsuario").innerHTML=`
                //   <ul style='list-style:none;'>
                //   <li>Nombre completo: `+response["usuarios"][index].Nombre+" "+response["usuarios"][index].Apellidos+`</li>
                //   <li>Email: `+response["usuarios"][index].Correo+`</li>
                //   <li *ngIf='this.Facebook != '>Facebook: `+response["usuarios"][index].Facebook+`</li>
                //   <ul>
                // `
              }
            }
          }

        },
        error => {
          console.log(<any>error);
        }
      )
    //Mostrar información del usuario
  }

}
