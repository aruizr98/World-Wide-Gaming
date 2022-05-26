import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../models/Mensaje';
import { MensajeService } from '../services/mensaje.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-mensaje-amigo',
  templateUrl: './mensaje-amigo.component.html',
  styleUrls: ['./mensaje-amigo.component.css']
})
export class MensajeAmigoComponent implements OnInit {
  public amigo: string = "";
  public status: boolean;
  public err: Number;
  public mensaje: Mensaje = new Mensaje("", "", "", "");

  constructor(private _usuarioService: UsuarioService, private _mensajeService: MensajeService) { }

  ngOnInit(): void {
    this.err = 0;
    this.status = false;
    this.amigo = sessionStorage.getItem("amigo");
  }

  enviarMensaje(): void {
    var val = document.forms["formulario"]["mensaje"].value;
    if (val == "") {
      this.err = 1;
    } else {
      this.mensaje.Mensaje = val;
      this.mensaje.Emisor = sessionStorage.getItem("idUsuario");
      this._usuarioService.listarUsuarios().subscribe(
        response => {
          for (let index = 0; index < response["usuarios"].length; index++) {
            if (response["usuarios"][index].NombreUsuario == this.amigo) {
              this.mensaje.Receptor = response["usuarios"][index]._id;
            }
          }
          this._mensajeService.crearMensjae(this.mensaje).subscribe(
            response => {
              console.log(response);
              this.status = true;
            },
            error => {
              console.log(<any>error);
            }
          )
        })
    }
  }

}
