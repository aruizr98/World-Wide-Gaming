import { Component, OnInit } from '@angular/core';
import { Juego } from 'src/app/models/Juego';
import { JuegoService } from 'src/app/services/juego.service';

@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.component.html',
  styleUrls: ['./crear-juego.component.css']
})
export class CrearJuegoComponent implements OnInit {
  public status: boolean;
  public err: Number;
  public juego: Juego;

  constructor(private _juegoService: JuegoService) {this.juego=new Juego("", "", 12) }

  ngOnInit(): void {
    this.err = 0;
    this.status = false;
  }

  guardarJuego(): void {
    this.err = 0;
    var val = document.forms["formulario"]["juego"].value;
    var val2 = document.forms["formulario"]["numeroJugadores"].value;
    this.juego.NombreJuego = val;
    this.juego.LimiteUsuarios = val2;
    if (this.juego.NombreJuego == "") {
      this.err = 1;
    }else if(this.juego.LimiteUsuarios.toString() == ""){
      this.err = 3;
    } else {
      this._juegoService.listarJuegos().subscribe(
        response => {
          for (let index = 0; index < response["juegos"].length; index++) {
            if (this.juego.NombreJuego == response["juegos"][index].NombreJuego) {
              this.err = 2;
            }
          }
          if(isNaN(Number(this.juego.LimiteUsuarios))){
            this.err=4;
          }
          console.log(this.err);
          if (this.err == 0) {
            this._juegoService.crearJuego(this.juego).subscribe(
              response => {
                console.log(response);
              })
            this.status = true;
          }
        })
    }
  }
}
