import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
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
  public nombreUsuario:String;
  constructor(private _usuarioService: UsuarioService, private _navService: NavegacionService, public router: Router) {
  }
  cambiarColor(elemento){
    elemento.setAttribute('style', 'background-color:green;color:white;');
  }
  quitarColor(elemento){
    elemento.setAttribute('style', '');
  }
  abrirIconoMensaje(){
    document.getElementById("listaMensajes").innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-open-fill" viewBox="0 0 16 16">
    <path d="M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.314l6.709 3.932L8 8.928l1.291.718L16 5.714V5.4a2 2 0 0 0-1.059-1.765l-6-3.2ZM16 6.873l-5.693 3.337L16 13.372v-6.5Zm-.059 7.611L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516ZM0 13.373l5.693-3.163L0 6.873v6.5Z"/>
  </svg>
    `
  }
  cerrarIconoMensaje(){
    if(document.getElementById("listaMensajes") != null){
    document.getElementById("listaMensajes").innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
        </svg>
    `
    }
  }
  limpiarColoresMiCuenta(){
    var enlaces=document.getElementsByClassName("btn m-1 botonNavegacion");
    for (let index = 0; index < enlaces.length; index++) {
      console.log("a");
      enlaces[index].setAttribute("class", "btn m-1 botonNavegacion");
    }
    console.log(document.getElementById("miCuenta"))
    document.getElementById("miCuenta").setAttribute("style", "");
  }
  limpiarColoresListaMensajes(){
    var enlaces=document.getElementsByClassName("btn m-1 botonNavegacion");
    for (let index = 0; index < enlaces.length; index++) {
      enlaces[index].setAttribute("class", "btn m-1 botonNavegacion");
    }
    document.getElementById("listaMensajes").setAttribute("style", "");
  }
  limpiarColores(){
    if(document.getElementById("miCuenta") != null && document.getElementById("listaMensajes") != null){
    document.getElementById("miCuenta").setAttribute("style", "");
    document.getElementById("listaMensajes").setAttribute("style", "");
    }
  }
  ngOnInit(): void {
    if (localStorage.getItem("nombreUsuario") != undefined) {
      this.localStorage = true;
      this.nombreUsuario=localStorage.getItem("nombreUsuario");
    } else {
      this.localStorage = false;
      this.nombreUsuario=sessionStorage.getItem("nombreUsuario");
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
          if (sessionStorage.getItem("idUsuario") == response["usuarios"][index]._id ||localStorage.getItem("idUsuario") == response["usuarios"][index]._id ) {
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
