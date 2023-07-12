import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from '../global-component';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio encargado de las interacciones
 */
export class InteraccionService {
  constructor(private http: HttpClient) { }

  getInteraccion(id : string){
    return this.http.get(GlobalComponent.APIurl + "/interaccion/" + id);
  }

  /**
   * Funcion para actualizar la ruta de la persona
   */
  putInteraccion(id: string, interacciones : string){
    // crear el mensaje
    const body = {
      IdInteraccion: id,
      Interacciones: interacciones
    }

    return this.http.put(GlobalComponent.APIurl + "/interaccion/", body);
  }

  getPrimerasInteracciones(){
    return this.http.get(GlobalComponent.APIurl + "/interaccion");
  }

  getInteraccionCampo(campo, valor){
    return this.http.get(GlobalComponent.APIurl + "/interaccionPorCampo/" + campo + "/" + valor);
  }
}
