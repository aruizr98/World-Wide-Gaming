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
  public evento:Evento;
  constructor(private _juegoService:JuegoService, private _eventoService:EventoService) {this.evento=new Evento("", "", "", "", "", "", []); }

  ngOnInit(): void {
    this._juegoService.listarJuegos().subscribe(
      response =>{
        for (let index = 0; index < response["juegos"].length; index++) {
          document.getElementById("nombreJuego").innerHTML+=`
            <option value='`+response["juegos"][index].NombreJuego+`'>`+response["juegos"][index].NombreJuego+`</option>
          `
          
        }
      },
      error =>{

      }
    )
  }
  onSubmit(){
    if(sessionStorage.getItem("idUsuario")){
      this.evento.Creador=sessionStorage.getItem("idUsuario");
    }else{
      this.evento.Creador=localStorage.getItem("idUsuario");
    }
    this._eventoService.crearEvento(this.evento).subscribe(
      response =>{
        console.log(response)
      },
      error =>{
        console.log(<any>error);
      }
    )
    console.log(this.evento)
    
  }
}
