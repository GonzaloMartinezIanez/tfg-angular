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

  getInteraccionCorto(id : string){
    return this.http.get(GlobalComponent.APIurl + "/interaccionCorto/" + id);
  }

  getInteraccionesPorNombre(cadena : string){
    var Nombre = cadena.split("/")[0];
    var ApellidoPaterno = cadena.split("/")[1];
    var ApellidoMaterno = cadena.split("/")[2];
    if(Nombre == ""){
      Nombre = "*"
    }
    if(ApellidoPaterno == ""){
      ApellidoPaterno = "*"
    }
    if(ApellidoMaterno == ""){
      ApellidoMaterno = "*"
    }
    return this.http.get(GlobalComponent.APIurl + "/interaccionesPorNombre/" + Nombre + "/" + ApellidoPaterno + "/" + ApellidoMaterno);
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

  getInteracciones(){
    return this.http.get(GlobalComponent.APIurl + "/interaccion");
  }

  getInteraccionCampo(datos){
    return this.http.post(GlobalComponent.APIurl + "/interaccionPorCampo/", datos);
  }
}
