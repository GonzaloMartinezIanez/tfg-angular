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
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokenInterceptorService } from './servicios/token-interceptor.service';
import { VerGruposComponent } from './ver-grupos/ver-grupos.component';
import { ActualizarInteraccionComponent } from './actualizar-interaccion/actualizar-interaccion.component';

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
    VerGruposComponent,
    ActualizarInteraccionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
