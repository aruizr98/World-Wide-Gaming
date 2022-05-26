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
  public receptorMarcado:boolean;
  public status: boolean;
  public err: Number;
  public mensaje: Mensaje = new Mensaje("", "", "", "");

  constructor(private _usuarioService: UsuarioService, private _mensajeService: MensajeService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("amigo")){
      this.err = 0;
    this.status = false;
    this.amigo = sessionStorage.getItem("amigo");
    this.receptorMarcado=true;
    sessionStorage.removeItem("amigo");
    }else{
      this.receptorMarcado=false;
    }
    
  }
  ngOnInput() {
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        document.getElementById("resultado").innerHTML = "";
        for (let index = 0; index < response["usuarios"].length; index++) {
          if (response["usuarios"][index]._id == sessionStorage.getItem("idUsuario") || response["usuarios"][index]._id == localStorage.getItem("idUsuario")) {
            for (let j = 0; j < response["usuarios"][index].Favoritos.length; j++) {
              this._usuarioService.listarUsuario(response["usuarios"][index].Favoritos[j]).subscribe(
                response2 => {

                  if (response2["usuario"].NombreUsuario.indexOf(this.mensaje.Receptor) != -1) {
                    console.log(response2["usuario"].NombreUsuario);
                    document.getElementById("resultado").innerHTML += `
                  <div role='button' onclick="document.getElementById('busqueda').value='`+ response2["usuario"].NombreUsuario + `'; sessionStorage.setItem('receptor', '` + response2["usuario"]._id + `'); sessionStorage.setItem('nombreReceptor', '` + response2["usuario"].NombreUsuario + `');"><h5>` + response2["usuario"].NombreUsuario + `</h5></div>
                `
                  }
                },
                error => {
                  console.log(<any>error);
                }
              )

            }
          }
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
  enviarMensaje(): void {
    var val = document.forms["formulario"]["mensaje"].value;
    if (val == "") {
      this.err = 1;
    } else {
      this.mensaje.Mensaje = val;
      this.mensaje.Emisor = sessionStorage.getItem("idUsuario");
      if(!sessionStorage.getItem("amigo")){
        this.mensaje.Receptor=sessionStorage.getItem("receptor");
      }
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
