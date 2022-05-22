import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {
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
}
