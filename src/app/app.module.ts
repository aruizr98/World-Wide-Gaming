import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { FooterComponent } from './footer/footer.component';
import { EventosComponent } from './eventos/eventos.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { MiCuentaComponent } from './mi-cuenta/mi-cuenta.component';
import { ListaMensajesComponent } from './lista-mensajes/lista-mensajes.component';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';
import { BuscarComponent } from './buscar/buscar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    CarrouselComponent,
    FooterComponent,
    EventosComponent,
    IniciarSesionComponent,
    RegistrarseComponent,
    MiCuentaComponent,
    ListaMensajesComponent,
    EnviarMensajeComponent,
    BuscarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
