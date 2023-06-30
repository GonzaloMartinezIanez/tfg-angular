import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesaparecidosComponent } from './desaparecidos/desaparecidos.component';
import { EntrevistadorComponent } from './entrevistador/entrevistador.component';
import { GrupoComponent } from './grupo/grupo.component';
import { HomeComponent } from './home/home.component';
import { InteraccionComponent } from './interaccion/interaccion.component';
import { LoginComponent } from './login/login.component';
import { VerDesaparecidosComponent } from './ver-desaparecidos/ver-desaparecidos.component';
import { VerInteraccionComponent } from './ver-interaccion/ver-interaccion.component';
import { VerGruposComponent } from './ver-grupos/ver-grupos.component';
import { ActualizarInteraccionComponent } from './actualizar-interaccion/actualizar-interaccion.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'entrevistador', component: EntrevistadorComponent },
  { path: 'desaparecidos', component: DesaparecidosComponent },
  { path: 'interaccion', component: InteraccionComponent },
  { path: 'grupo', component: GrupoComponent },
  { path: 'ver-desaparecidos', component: VerDesaparecidosComponent },
  { path: 'ver-interaccion', component: VerInteraccionComponent },
  { path: 'ver-grupos', component: VerGruposComponent },
  { path: 'actualizar-interaccion', component: ActualizarInteraccionComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
