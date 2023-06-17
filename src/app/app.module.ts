import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DesaparecidosComponent } from './desaparecidos/desaparecidos.component';
import { InteraccionComponent } from './interaccion/interaccion.component';
import { GrupoComponent } from './grupo/grupo.component';
import { VerDesaparecidosComponent } from './ver-desaparecidos/ver-desaparecidos.component';
import { VerInteraccionComponent } from './ver-interaccion/ver-interaccion.component';
import { EntrevistadorComponent } from './entrevistador/entrevistador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DesaparecidosComponent,
    InteraccionComponent,
    GrupoComponent,
    VerDesaparecidosComponent,
    VerInteraccionComponent,
    EntrevistadorComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
