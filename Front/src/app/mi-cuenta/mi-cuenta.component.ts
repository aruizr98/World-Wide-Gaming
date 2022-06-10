import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../services/usuario.service";
import { EventoService } from '../services/evento.service';
import { Global } from '../services/global';
import { ActivatedRoute, Router } from '@angular/router';

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
  public fotoPerfil:string;
  public url:string;
  public visitante:boolean;

  constructor(private _usuarioService: UsuarioService, private _eventoService: EventoService,private route: ActivatedRoute) {this.url=Global.url; }

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
  yaExiste(array: Array<string>, elemento: string): boolean {
    let respuesta = false;
    for (let index = 0; index < array.length; index++) {
      if (array[index] == elemento) {
        respuesta = true;
      }
    }
    return respuesta;
  }
  agregarUsuarioFavoritos(usuario:string) {
    if(localStorage.getItem("idUsuario")==null && sessionStorage.getItem("idUsuario")==null){
      document.getElementById("sesionNoIniciada").setAttribute("class", "alert alert-primary text-center d-block my-3 w-50 mx-auto");
    }
    this._usuarioService.listarUsuarios().subscribe(
      response =>{
        for (let index = 0; index < response["usuarios"].length; index++) {
          if(response["usuarios"][index].NombreUsuario==usuario){
            sessionStorage.setItem("usuarioAgregar", response["usuarios"][index]._id);
          }
          
        }
      },
      error =>{
        console.log(<any>error);
      }
    )
    if (localStorage.getItem("idUsuario")) {
      this._usuarioService.listarUsuarios().subscribe(
        response => {
          for (let index = 0; index < response["usuarios"].length; index++) {
            if (response["usuarios"][index]._id == localStorage.getItem("idUsuario")) {
              var favoritosArray = response["usuarios"][index].Favoritos;
              if(sessionStorage.getItem("usuarioAgregar") == localStorage.getItem("idUsuario")){
                document.getElementById("yaExisteUsuario").innerText = "No puedes agregar tu propio usuario a favoritos.";
                document.getElementById("yaExisteUsuario").setAttribute("class", "alert alert-primary text-center d-block my-3 w-50 mx-auto");
              }else{
                if (!this.yaExiste(favoritosArray, sessionStorage.getItem("usuarioAgregar"))) {
                favoritosArray.push(sessionStorage.getItem("usuarioAgregar"));
                document.getElementById("usuarioAgregado").innerText = "El usuario " + usuario + " ha sido agregado a la lista de favoritos correctamente";
                document.getElementById("usuarioAgregado").setAttribute("class", "alert alert-success text-center d-block my-3 w-50 mx-auto");
                this._usuarioService.actualizarListaFavoritos(localStorage.getItem("idUsuario"), favoritosArray).subscribe(
                  response2 => {
                    console.log(response2);
                  },
                  error => {
                    console.log(<any>error);
                  }
                )
              } else {
                document.getElementById("yaExisteUsuario").innerText = "El usuario " +usuario+ " ya está en tu lista de favoritos";
                document.getElementById("yaExisteUsuario").setAttribute("class", "alert alert-primary text-center d-block my-3 w-50 mx-auto");
              }
              }
            }


          }
        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      this._usuarioService.listarUsuarios().subscribe(
        response => {
          for (let index = 0; index < response["usuarios"].length; index++) {
            if (response["usuarios"][index]._id == sessionStorage.getItem("idUsuario")) {
              var favoritosArray = response["usuarios"][index].Favoritos;
              if(sessionStorage.getItem("usuarioAgregar") == sessionStorage.getItem("idUsuario")){
                document.getElementById("yaExisteUsuario").innerText = "No puedes agregar tu propio usuario a favoritos.";
                document.getElementById("yaExisteUsuario").setAttribute("class", "alert alert-primary text-center d-block my-3 w-50 mx-auto");
              }else{
                if (!this.yaExiste(favoritosArray, sessionStorage.getItem("usuarioAgregar"))) {
                favoritosArray.push(sessionStorage.getItem("usuarioAgregar"));
                document.getElementById("usuarioAgregado").innerText = "El usuario " +usuario+ " ha sido agregado a la lista de favoritos correctamente";
                document.getElementById("usuarioAgregado").setAttribute("class", "alert alert-success text-center d-block my-3 w-50 mx-auto");
                this._usuarioService.actualizarListaFavoritos(sessionStorage.getItem("idUsuario"), favoritosArray).subscribe(
                  response2 => {
                    console.log(response2);
                  },
                  error => {
                    console.log(<any>error);
                  }
                )
              } else {
                document.getElementById("yaExisteUsuario").innerText = "El usuario " +usuario+ " ya está en tu lista de favoritos";
                document.getElementById("yaExisteUsuario").setAttribute("class", "alert alert-primary text-center d-block my-3 w-50 mx-auto");
              }
              }
            }
          }
        },
        error => {
          console.log(<any>error);
        }
      )
    }
    sessionStorage.removeItem("agregarUsuario");
  }
  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get("nombreUsuario")){
      this.nombreUsuario=this.route.snapshot.paramMap.get("nombreUsuario");
      this.visitante=true;
    }else{
      this.visitante=false;
      if(localStorage.getItem("nombreUsuario") != undefined){
        this.nombreUsuario = localStorage.getItem("nombreUsuario");
      }else{
        this.nombreUsuario = sessionStorage.getItem("nombreUsuario");
      }
    }
     
      
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
              }
              //Recoger información del usuario
              this.nombreCompleto=response["usuarios"][index].Nombre+" "+response["usuarios"][index].Apellidos;
              this.correo=response["usuarios"][index].Correo;
              this.facebook=response["usuarios"][index].Facebook;
              this.twitter=response["usuarios"][index].Twitter;
              this.instagram=response["usuarios"][index].Instagram;
              this.discord=response["usuarios"][index].Discord;
              this.twitch=response["usuarios"][index].Tiwtch;
              this.youtube=response["usuarios"][index].Youtube;
              this.fotoPerfil=response["usuarios"][index].FotoPerfil;
            }
          }

        },
        error => {
          console.log(<any>error);
        }
      )
  }

}
