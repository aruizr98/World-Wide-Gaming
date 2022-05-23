import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/Post';
import { Respuesta } from '../models/Respuesta';
import { ForoService } from '../services/foro.service';
import { RespuestaService } from '../services/respuesta.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public posts: Array<Post> = [];
  public respuestas: Array<Respuesta> = [];
  public post: string = "";
  public respuesta: Respuesta = new Respuesta("", "", "", "", "", false);
  public logeado: boolean = false;

  constructor(private router: Router, private _foroService: ForoService, private _usuarioService: UsuarioService, private _respuestaService: RespuestaService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("idUsuario") != null) {
      this.logeado = true;
    }
    this._foroService.listarPosts().subscribe(
      response => {
        for (let index = 0; index < response["posts"].length; index++) {
          if (localStorage.getItem("post") == response['posts'][index]._id) {
            this.posts.push(response['posts'][index]);
          }
        }
      })
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        for (let index = 0; index < this.posts.length; index++) {
          for (let index2 = 0; index2 < response["usuarios"].length; index2++) {
            if (this.posts[index].UsuarioCreador == sessionStorage.getItem("idUsuario")) {
              this.posts[index].eliminar = true;
            }
            if (this.posts[index].UsuarioCreador == response["usuarios"][index2]._id) {
              this.posts[index].UsuarioCreador = response['usuarios'][index2].NombreUsuario;
            }
          }
        }
      })
    this._respuestaService.listarRespuestas().subscribe(
      response => {
        for (let index = 0; index < this.posts.length; index++) {
          for (let index2 = 0; index2 < response["respuestas"].length; index2++) {
            if (this.posts[index]._id == response["respuestas"][index2].PostId) {
              this.respuestas.push(response['respuestas'][index2]);
            }
          }
        }
      })
    this._usuarioService.listarUsuarios().subscribe(
      response => {
        for (let index = 0; index < this.respuestas.length; index++) {
          for (let index2 = 0; index2 < response["usuarios"].length; index2++) {
            if (this.respuestas[index].UsuarioCreador == sessionStorage.getItem("idUsuario")) {
              this.respuestas[index].eliminar = true;
            }
            if (this.respuestas[index].UsuarioCreador == response["usuarios"][index2]._id) {
              this.respuestas[index].UsuarioCreador = response['usuarios'][index2].NombreUsuario;
            }
          }
        }
      })
  }

  responder(id): void {
    this.post = id;
    document.getElementById("formulario").style.display = "block";
  }

  cancelar(): void {
    document.getElementById("formulario").style.display = "none";
  }

  publicar(): void {
    var textarea = document.forms["form"]["respuesta"].value;
    if (textarea != "") {
      this.respuesta.Respuesta = textarea;
      this.respuesta.PostId = this.post;
      this.respuesta.FechaHora = new Date().toLocaleString().replace(",", "").replace(/:.. /, " ");
      this.respuesta.UsuarioCreador = sessionStorage.getItem("idUsuario");
      this._respuestaService.crearRespuesta(this.respuesta).subscribe(
        response => {
          console.log(response);
        })
      document.getElementById("formulario").style.display = "none";
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(["/Post"]);
    } else {
      alert("Debe rellenar el campo de la respuesta para publicarla.");
    }
  }

  eliminarPost(id): void {
    this._foroService.eliminarPost(id).subscribe(
      response => {
        console.log(response);
      })
    this._respuestaService.listarRespuestas().subscribe(
      response => {
        for (let index = 0; index < response["respuestas"].length; index++) {
          if(response["respuestas"][index].PostId == id) {
            this._respuestaService.eliminarRespuesta(response["respuestas"][index]._id).subscribe(
              response => {
                console.log(response);
              })
          }
        }
      })
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/Post"]);
  }

  eliminarRespuesta(id): void {
    this._respuestaService.eliminarRespuesta(id).subscribe(
      response => {
        console.log(response);
      })
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/Post"]);
  }

}
