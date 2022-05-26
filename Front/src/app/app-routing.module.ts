import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrouselComponent } from './carrousel/carrousel.component';
import {EventosComponent } from './eventos/eventos.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import {RegistrarseComponent } from './registrarse/registrarse.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { ListaMensajesComponent } from './lista-mensajes/lista-mensajes.component';
import{CerrarSesionComponent} from './cerrar-sesion/cerrar-sesion.component';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ModuleWithProviders } from '@angular/core';
import { MenuForoComponent } from './menu-foro/menu-foro.component';
import { ForoComponent } from './foro/foro.component';
import { PostComponent } from './post/post.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { CrearJuegoComponent } from './administracion/crear-juego/crear-juego.component';
import { ModificarJuegoComponent } from './administracion/modificar-juego/modificar-juego.component';
import { EliminarJuegoComponent } from './administracion/eliminar-juego/eliminar-juego.component';
import { MensajeAmigoComponent } from './mensaje-amigo/mensaje-amigo.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';


const routes: Routes = [
  {path:"", component:CarrouselComponent},
  {path:"inicio", component:CarrouselComponent},
  {path:"Eventos", component:EventosComponent},
  {path:"IniciarSesion", component:IniciarSesionComponent},
  {path:"Registrarse", component:RegistrarseComponent},
  {path:"MiCuenta", component:MiCuentaComponent},
  {path:"CerrarSesion", component:CerrarSesionComponent},
  {path:"ListaMensajes", component:ListaMensajesComponent},
  {path:"EnviarMensaje", component:EnviarMensajeComponent},
  {path:"BuscarUsuarios", component:BuscarComponent},
  {path:"MenuForo/:juego", component:MenuForoComponent},
  {path:"Foro/:nombre/:juego", component:ForoComponent},
  {path:"Post", component:PostComponent},
  {path:"Administrar", component:AdministracionComponent},
  {path:"Administrar/CrearJuego", component:CrearJuegoComponent},
  {path:"Administrar/ModificarJuego", component:ModificarJuegoComponent},
  {path:"Administrar/EliminarJuego", component:EliminarJuegoComponent},
  {path:"MensajeAmigo", component:MensajeAmigoComponent},
  {path:"CrearEvento", component:CrearEventoComponent},
  {path:"**", component:CarrouselComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
