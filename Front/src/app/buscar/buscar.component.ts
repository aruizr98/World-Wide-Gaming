import { Component, OnInit } from '@angular/core';
import { Busqueda } from '../models/Busqueda';
import { UsuarioService } from "../services/usuario.service";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  public busqueda: Busqueda;
  public noEncontrado: boolean;
  constructor(private _usuarioService: UsuarioService) { this.busqueda = new Busqueda(""); }
  yaExiste(array: Array<string>, elemento: string): boolean {
    let respuesta = false;
    for (let index = 0; index < array.length; index++) {
      if (array[index] == elemento) {
        respuesta = true;
      }
    }
    return respuesta;
  }
  agregarUsuarioFavoritos() {
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
                document.getElementById("usuarioAgregado").innerText = "El usuario " + sessionStorage.getItem("NombreUsuarioAgregar") + " ha sido agregado a la lista de favoritos correctamente";
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
                document.getElementById("yaExisteUsuario").innerText = "El usuario " + sessionStorage.getItem("NombreUsuarioAgregar") + " ya está en tu lista de favoritos";
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
                document.getElementById("usuarioAgregado").innerText = "El usuario " + sessionStorage.getItem("NombreUsuarioAgregar") + " ha sido agregado a la lista de favoritos correctamente";
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
                document.getElementById("yaExisteUsuario").innerText = "El usuario " + sessionStorage.getItem("NombreUsuarioAgregar") + " ya está en tu lista de favoritos";
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
    if (sessionStorage.getItem("agregarUsuario") == "true") {
      this.agregarUsuarioFavoritos();
    }

  }
  ngOnInput() {
    if (this.busqueda.nombreUsuario == '') {
      document.getElementById("resultado").setAttribute("class", "text-center d-none")
    } else {
      document.getElementById("resultado").setAttribute("class", "text-center");
    }
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        document.getElementById("resultado").innerHTML = "";
        let contador = 0;
        for (let index = 0; index < response["usuarios"].length; index++) {
          if (response["usuarios"][index].NombreUsuario.indexOf(this.busqueda.nombreUsuario) != -1) {
            document.getElementById("resultado").innerHTML += `
              <div><h5><a class='text-decoration-none text-black ' ng-reflect-router-link="/MiCuenta,`+response["usuarios"][index].NombreUsuario+`" href="/MiCuenta/`+response["usuarios"][index].NombreUsuario+`">`+ response["usuarios"][index].NombreUsuario + `</a></h5></div>
            `
          } else {
            contador++;
          }
        }
        if (contador == response["usuarios"].length) {
          this.noEncontrado = true;
        } else {
          this.noEncontrado = false;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}
