import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Juego } from 'src/app/models/Juego';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-modificar-juego',
  templateUrl: './modificar-juego.component.html',
  styleUrls: ['./modificar-juego.component.css']
})
export class ModificarJuegoComponent implements OnInit {
  public busqueda: string = "";
  public noEncontrado: boolean;
  public status: boolean = false;
  public juego: string = "";
  public juegoObjeto:Juego;
  public correcto: boolean = false;
  constructor(private _juegoService: JuegoService, private router: Router) {
    this.juegoObjeto=new Juego("", "", 12);
   }

  ngOnInit(): void {
    this.correcto = false;
    this.status = false;
    if (sessionStorage.getItem("nombreJuego") != "" && sessionStorage.getItem("nombreJuego") != null) {
      this.status = true;
      this.juego = sessionStorage.getItem("nombreJuego");
    }
  }

  ngOnInput() {
    if (this.busqueda == '') {
      document.getElementById("resultado").setAttribute("class", "text-center d-none")
    } else {
      document.getElementById("resultado").setAttribute("class", "text-center");
    }
    this._juegoService.listarJuegos().subscribe(
      response => {
        document.getElementById("resultado").innerHTML = "";
        let contador = 0;
        for (let index = 0; index < response["juegos"].length; index++) {
          if (response["juegos"][index].NombreJuego.indexOf(this.busqueda) != -1) {
            document.getElementById("resultado").innerHTML +=
              `<div id="juegos" class="border d-flex justify-content-center align-items-center" style="height: 40px; cursor: pointer; background-color: white;" onclick="sessionStorage.setItem('nombreJuego', '` + response["juegos"][index].NombreJuego + `'); sessionStorage.setItem('idJuego', '` + response["juegos"][index]._id + `'); location.reload()">` + response["juegos"][index].NombreJuego + `</div>`
          } else {
            contador++;
          }
        }
        if (contador == response["juegos"].length) {
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

  modificarJuego(): void {
    if (this.juegoObjeto.NombreJuego == "") {
      alert("Debe de introducir el nuevo nombre del juego");
    } else {
      this._juegoService.editarJuego(sessionStorage.getItem("idJuego"), this.juegoObjeto).subscribe(
        response => {
          console.log(response);
          this.correcto = true;
          sessionStorage.setItem("nombreJuego", "");
          sessionStorage.setItem("idJuego", "");
        })
    }
  }

  cancelar(): void {
    sessionStorage.setItem("nombreJuego", "");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/Administrar/ModificarJuego"]);
  }

}
