import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Evento} from "../models/Evento";
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  public url:string;
  constructor(
    private _http:HttpClient
  ) {
    this.url=Global.url;
   }
   listarEventos(){
    let headers=new HttpHeaders().set("content-type", "application/json");

    return this._http.get(this.url+"eventos", {headers:headers});
   }
}
