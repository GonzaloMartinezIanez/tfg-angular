import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalComponent } from '../global-component';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio encargado de los entrevistadores
 */
export class EntrevistadorService {

  constructor(private http: HttpClient) { }

  getEntrevistador() {
    return this.http.get(GlobalComponent.APIurl + "/entrevistador");
  }

  getEntrevistadores() {
    return this.http.get(GlobalComponent.APIurl + "/entrevistadores");
  }

  getEntrevistadorNombre(id : string) {
    return this.http.get(GlobalComponent.APIurl + "/entrevistadorNombre/" + id);
  }

  putEntrevistador(datos: any) {
    return this.http.put(GlobalComponent.APIurl + "/entrevistador", datos);
  }

  putEntrevistadorAdmin(datos: any){
    return this.http.put(GlobalComponent.APIurl + "/modificarEntrevistador", datos);
  }

  changePassword(datos: any) {
    return this.http.put(GlobalComponent.APIurl + "/cambiarContrasenia", datos);
  }

  changePasswordAdmin(datos: any){
    return this.http.put(GlobalComponent.APIurl + "/cambiarContraseniaAdmin", datos);
  }

  registrarEntrevistador(datos: any){
    return this.http.post(GlobalComponent.APIurl + "/registrar", datos);
  }


}
