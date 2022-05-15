import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../models/Mensaje';
import { MensajeService } from '../services/mensaje.service';
import { UsuarioService } from '../services/usuario.service';
import { Global } from '../services/global';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.css'],
  providers: [MensajeService]
})
export class EnviarMensajeComponent implements OnInit {
  public mensaje: Mensaje;
  public url: string;
  public status: boolean;
  constructor(private _usuarioService: UsuarioService, private _mensajeService: MensajeService) {
    this.url = Global.url;
    if (sessionStorage.getItem("idUsuario")) {
      this.mensaje = new Mensaje("", "", "", sessionStorage.getItem("idUsuario"));
    } else {
      this.mensaje = new Mensaje("", "", "", localStorage.getItem("idUsuario"));
    }
  }
  ngOnInput(){
    if (this.mensaje.Receptor == '') {
      document.getElementById("resultado").setAttribute("class", "text-center d-none")
    } else {
      document.getElementById("resultado").setAttribute("class", "text-center");
    }
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        document.getElementById("resultado").innerHTML = "";
        for (let index = 0; index < response["usuarios"].length; index++) {
         if(response["usuarios"][index]._id == sessionStorage.getItem("idUsuario") || response["usuarios"][index]._id == localStorage.getItem("idUsuario")){
           for (let j = 0; j < response["usuarios"][index].Favoritos.length; j++) {
             this._usuarioService.listarUsuario(response["usuarios"][index].Favoritos[j]).subscribe(
               response2 =>{
               
                if(response2["usuario"].NombreUsuario.indexOf(this.mensaje.Receptor) != -1){
                  console.log(response2["usuario"].NombreUsuario);
                  document.getElementById("resultado").innerHTML += `
                  <div role='button' onclick="document.getElementById('busqueda').value='`+response2["usuario"].NombreUsuario+`'; sessionStorage.setItem('receptor', '`+response2["usuario"]._id+`'); sessionStorage.setItem('nombreReceptor', '`+response2["usuario"].NombreUsuario+`');"><h5>`+ response2["usuario"].NombreUsuario + `</h5></div>
                `
                }
               },
               error =>{
                 console.log(<any>error);
               }
             )
             
           }
         }
        }
      },
      error =>{
        console.log(<any>error);
      }
    )
  }
  ngOnInit(): void {
    // this._usuarioService.listarUsuarios().subscribe(
    //   response => {
    //     for (let index = 0; index < response["usuarios"].length; index++) {
    //       document.getElementById("receptores").innerHTML += `
    //         <option value='`+ response["usuarios"][index]._id + `'>` + response["usuarios"][index].NombreUsuario + `</option>
    //       `;
    //     };
    //   },
    //   error => {
    //     console.log(<any>error);
    //   }
    // )
  }
  onSubmit() {
    this.mensaje.Receptor=sessionStorage.getItem("receptor");
    this._mensajeService.crearMensjae(this.mensaje).subscribe(
      response => {
        console.log(response);
        this.status = true;
      },
      error => {
        console.log(<any>error);
      }
    )
    this.mensaje.Receptor=sessionStorage.getItem("nombreReceptor");
  }
  
}
