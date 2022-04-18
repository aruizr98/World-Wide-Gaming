import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Usuario} from "../models/usuario";
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url:string;
  constructor(
    private _http:HttpClient
  ) {
    this.url=Global.url;
   }
   testService(){
     return "probando el servicio de Angular";
   }
   guardarUsuario(usuario:Usuario):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set("content-type", "application/json");

    return this._http.post(this.url+"guardarUsuario", params, {headers:headers});
   }
}
