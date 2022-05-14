import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    sessionStorage.removeItem('nombreUsuario');
    sessionStorage.removeItem('idUsuario');
    localStorage.removeItem('idUsuario');
    localStorage.setItem("mensajes", "false");
    localStorage.removeItem('nombreUsuario');
    location.href="/Inicio";
  }

}
