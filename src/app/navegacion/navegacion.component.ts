import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavegacionService } from '../services/navegacion.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  public sessionStorage:boolean;
  public localStorage:boolean;
  public juegos: Array<String>

  constructor(private _navService: NavegacionService, private router: Router) {
  }

  ngOnInit(): void {
    if(localStorage.getItem("nombreUsuario") !=undefined){
      this.localStorage=true;
    }else{
      this.localStorage=false;
      console.log(this.localStorage);
      if(sessionStorage.getItem("nombreUsuario") !=undefined){
        this.sessionStorage=true;
      }
    }
    this.juegos=[];
    this._navService.listarJuegos().subscribe(
      response => {
        for (let index = 0; index < response["juegos"].length; index++) {
          this.juegos.push(response["juegos"][index].NombreJuego);
        }
      })
  }

  recargar(juego){
    localStorage.setItem("juego", juego);
    let currentUrl = "/MenuForo/"+juego;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
