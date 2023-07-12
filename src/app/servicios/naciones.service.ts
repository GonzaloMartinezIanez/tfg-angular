import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global-component';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio encargado de las nacionalidades, entidades y municipios
 */
export class NacionesService {

  constructor(private http: HttpClient) { }

  getNaciones() {
    return this.http.get(GlobalComponent.APIurl + "/naciones");
  }

  getEntidades() {
    return this.http.get(GlobalComponent.APIurl + "/entidades");
  }

  getMunicipios(id : string) {
    return this.http.get(GlobalComponent.APIurl + "/municipios/" + id);
  }
}
