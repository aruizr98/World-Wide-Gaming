import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';
import { Juego } from '../models/Juego';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  public url: string;
  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }
  listarJuegos() {
    let headers = new HttpHeaders().set("content-type", "application/json");

    return this._http.get(this.url + "juegos", { headers: headers });
  }

  crearJuego(juego: Juego): Observable<any> {
    let params = JSON.stringify(juego);
    let headers = new HttpHeaders().set("content-type", "application/json");

    return this._http.post(this.url + "crearJuego", params, { headers: headers });
  }

  eliminarJuego(id: string) {
    let headers = new HttpHeaders().set("content-type", "application/json");

    return this._http.delete(this.url + "eliminarJuego/" + id, { headers: headers });
  }

  editarJuego(id: string, juego: Juego) {
    let headers = new HttpHeaders().set("content-type", "application/json");

    return this._http.put(this.url + "editarJuego/" + id, { headers: headers });
  }
}
