import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Respuesta } from '../models/Respuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  public url: string;
  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }
  listarRespuestas() {
    let headers = new HttpHeaders().set("content-type", "application/json");

    return this._http.get(this.url + "respuestas", { headers: headers });
  }

  crearRespuesta(respuesta: Respuesta): Observable<any> {
    let params = JSON.stringify(respuesta);
    let headers = new HttpHeaders().set("content-type", "application/json");

    return this._http.post(this.url + "crearRespuesta", params, { headers: headers });
  }

  eliminarRespuesta(id: string) {
    let headers = new HttpHeaders().set("content-type", "application/json");

    return this._http.delete(this.url + "eliminarRespuesta/" + id, { headers: headers });
  }
}
