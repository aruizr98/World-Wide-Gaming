import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ForoService {
  public url: string;
  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }
  listarPosts() {
    let headers = new HttpHeaders().set("content-type", "application/json");

    return this._http.get(this.url + "posts", { headers: headers });
  }

  eliminarPost(id: string) {
    let headers = new HttpHeaders().set("content-type", "application/json");

    return this._http.delete(this.url + "eliminarPost/" + id, { headers: headers });
  }
}
