import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/Post';
import { ForoService } from '../services/foro.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  public foro: string;
  public posts: Array<Post> = [];
  public usuario: Array<string> = [];

  constructor(private _foroService: ForoService, private _usuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.foro = this.route.snapshot.paramMap.get("nombre");
    document.getElementById("titulo").innerHTML = "Foro de " + this.foro;
    let juego = this.route.snapshot.paramMap.get("juego");
    this._foroService.listarPosts().subscribe(
      response => {
        for (let index = 0; index < response["posts"].length; index++) {
          if (juego == response['posts'][index].NombreJuego && this.foro == response['posts'][index].NombreForo) {
            this.posts.push(response['posts'][index]);
          }
        }
      })
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        for (let index = 0; index < this.posts.length; index++) {
          for (let index2 = 0; index2 < response["usuarios"].length; index2++) {
            if (this.posts[index].UsuarioCreador == response["usuarios"][index2]._id) {
              this.posts[index].NombreCreador = response['usuarios'][index2].NombreUsuario;
            }
          }
        }
      })
  }

  cogerId(id): void {
    localStorage.setItem("post", id);
  }

}