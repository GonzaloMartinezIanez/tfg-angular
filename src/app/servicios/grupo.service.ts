import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global-component';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio encargado de los grupos
 */
export class GrupoService {
  constructor(private http: HttpClient) { }

  getGrupos() {
    return this.http.get(GlobalComponent.APIurl + "/grupo");
  }

  getGrupoId(id : string){
    return this.http.get(GlobalComponent.APIurl + "/grupo/" + id);
  }

  getGrupoInteraccion(id : string){
    return this.http.get(GlobalComponent.APIurl + "/grupointeraccion/" + id);
  }

  getGruposCorto() {
    return this.http.get(GlobalComponent.APIurl + "/grupocorto");
  }

  getPersonasEnGrupo(id : string){
    return this.http.get(GlobalComponent.APIurl + "/grupopersonas/" + id);
  }

}
