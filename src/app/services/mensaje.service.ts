import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Mensaje} from "../models/Mensaje";
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  public url:string;
  constructor(
    private _http:HttpClient
  ) {
    this.url=Global.url;
   }
  listarMensajes(){
    let headers=new HttpHeaders().set("content-type", "application/json");

    return this._http.get(this.url+"mensajes", {headers:headers});
   }
}
