import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public post: Post = new Post("", "", "", "", "", "", "", false, "");

  constructor(private _foroService: ForoService, private _usuarioService: UsuarioService, private route: ActivatedRoute, private router: Router) { }

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

  crearPost(): void {
    var titulo = document.forms["formulario"]["titulo"].value;
    var descripcion = document.forms["formulario"]["descripcion"].value;
    let juego = this.route.snapshot.paramMap.get("juego");
    let foro = this.route.snapshot.paramMap.get("nombre");
    this.post.Titulo = titulo;
    this.post.TextoPost = descripcion;
    this.post.NombreJuego = juego;
    this.post.NombreForo = foro;
    console.log(this.post.NombreForo);
    this.post.FechaHora = new Date().toLocaleString().replace(",", "").replace(/:.. /, " ");
    this.post.UsuarioCreador = sessionStorage.getItem("idUsuario");
    this._foroService.crearPost(this.post).subscribe(
      response => {
        console.log(response);
      })
    document.getElementById("formulario").style.display = "none";
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/Foro/" + foro + "/" + juego]);
  }

  mostrarCrearPost(): void {
    document.getElementById("formulario").style.display = "block";
    document.getElementById("botonCrear").style.display = "none";
  }

  cancelar(): void {
    document.getElementById("formulario").style.display = "none";
    document.getElementById("botonCrear").style.display = "block";
    let juego = this.route.snapshot.paramMap.get("juego");
    let foro = this.route.snapshot.paramMap.get("nombre");
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/Foro/" + foro + "/" + juego]);
  }

}