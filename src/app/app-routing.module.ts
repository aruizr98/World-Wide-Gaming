import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrouselComponent } from './carrousel/carrousel.component';
import {EventosComponent } from './eventos/eventos.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import {RegistrarseComponent } from './registrarse/registrarse.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { ListaMensajesComponent } from './lista-mensajes/lista-mensajes.component';

const routes: Routes = [
  {path:"", component:CarrouselComponent},
  {path:"inicio", component:CarrouselComponent},
  {path:"eventos", component:EventosComponent},
  {path:"IniciarSesion", component:IniciarSesionComponent},
  {path:"Registrarse", component:RegistrarseComponent},
  {path:"Micuenta", component:MiCuentaComponent},
  {path:"ListaMensajes", component:MiCuentaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
