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

  putEntrevistador(e: any) {
    return this.http.put(GlobalComponent.APIurl + "/entrevistador", e);
  }
}
