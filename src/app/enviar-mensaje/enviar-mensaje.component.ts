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
  public receptorCorrecto=true;
  constructor(private _usuarioService: UsuarioService, private _mensajeService: MensajeService) {
    this.url = Global.url;
    if (sessionStorage.getItem("idUsuario")) {
      this.mensaje = new Mensaje("", "", "", sessionStorage.getItem("idUsuario"));
    } else {
      this.mensaje = new Mensaje("", "", "", localStorage.getItem("idUsuario"));
    }
  }
  obtenerIdUsuario(nombreUsuario:string){
    this._usuarioService.listarUsuarios().subscribe(
      response =>{
        for (let index = 0; index < response["usuarios"].length; index++) {
          if(response["usuarios"][index].NombreUsuario == nombreUsuario){
            return response["usuarios"][index]._id;
          }
        }
      },
      error =>{
        console.log(<any>error);
        return "";
      }
    )
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
    if(sessionStorage.getItem("receptorEstablecido")) {
      let id:string;
      this.mensaje.Receptor=sessionStorage.getItem("receptorEstablecido");
      this._usuarioService.listarUsuarios().subscribe(
        response =>{
          for (let index = 0; index < response["usuarios"].length; index++) {
            if(response["usuarios"][index].NombreUsuario == sessionStorage.getItem("receptorEstablecido")){
              id=response["usuarios"][index]._id;
              sessionStorage.setItem("receptor", id);
            }
          }
        },
        error =>{
          console.log(<any>error);
        }
      )
      sessionStorage.setItem("nombreReceptor", sessionStorage.getItem("receptorEstablecido"));
    }
  }
  onSubmit() {
    if(sessionStorage.getItem("receptor") == sessionStorage.getItem("idUsuario") ||sessionStorage.getItem("receptor") == localStorage.getItem("idUsuario") ){
      this.receptorCorrecto=false;
    }else{
      this.receptorCorrecto=true;
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
  
}
