import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavegacionService } from '../services/navegacion.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  public sessionStorage: boolean;
  public localStorage: boolean;
  public juegos: Array<String>;
  public amigos: Array<String>;

  constructor(private _usuarioService: UsuarioService, private _navService: NavegacionService, private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("nombreUsuario") != undefined) {
      this.localStorage = true;
    } else {
      this.localStorage = false;
      console.log(this.localStorage);
      if (sessionStorage.getItem("nombreUsuario") != undefined) {
        this.sessionStorage = true;
      }
    }
    this.juegos = [];
    this._navService.listarJuegos().subscribe(
      response => {
        for (let index = 0; index < response["juegos"].length; index++) {
          this.juegos.push(response["juegos"][index].NombreJuego);
        }
      })
    var idsAmigos = [];
    this.amigos = [];
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        for (let index = 0; index < response["usuarios"].length; index++) {
          if (sessionStorage.getItem("idUsuario") == response["usuarios"][index]._id) {
            idsAmigos = response["usuarios"][index].Favoritos;
          }
        }
        for (let index = 0; index < response["usuarios"].length; index++) {
          for (let index2 = 0; index2 < idsAmigos.length; index2++) {
            if (idsAmigos[index2] == response["usuarios"][index]._id) {
              this.amigos.push(response["usuarios"][index].NombreUsuario);
            }
          }
        }
      })
  }

  recargar(juego) {
    localStorage.setItem("juego", juego);
    let currentUrl = "/MenuForo/" + juego;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  setAmigo(amigo):void {
    sessionStorage.setItem("amigo", amigo);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/MensajeAmigo"]);
  }
}
