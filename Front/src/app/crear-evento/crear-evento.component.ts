import { Component, OnInit } from '@angular/core';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';
import { JuegoService } from '../services/juego.service';

@Component({
  selector: 'crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  public evento: Evento;
  public juegoSeleccionado: boolean;
  public eventoCreado:boolean;
  constructor(private _juegoService: JuegoService, private _eventoService: EventoService) { this.evento = new Evento("", "", "", "", "", "", []); }

  ngOnInit(): void {
    this.juegoSeleccionado=true;
    this.eventoCreado=false;
    this._juegoService.listarJuegos().subscribe(
      response => {
        document.getElementById("nombreJuego").innerHTML = "<option>Seleccionar juego</option>";
        for (let index = 0; index < response["juegos"].length; index++) {
          document.getElementById("nombreJuego").innerHTML += `
            <option value='`+ response["juegos"][index].NombreJuego + `'>` + response["juegos"][index].NombreJuego + `</option>
          `
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  onSubmit(form) {
    if (sessionStorage.getItem("idUsuario")) {
      this.evento.Creador = sessionStorage.getItem("idUsuario");
    } else {
      this.evento.Creador = localStorage.getItem("idUsuario");
    }
    if (this.evento.NombreJuego == "") {
      this.juegoSeleccionado = false;
    } else {
      this.juegoSeleccionado = true;
      this._eventoService.crearEvento(this.evento).subscribe(
        response => {
          console.log(response);
          this.eventoCreado=true;
          form.reset();
        },
        error => {
          console.log(<any>error);
        }
      )
      console.log(this.evento)
    }

  }
}
