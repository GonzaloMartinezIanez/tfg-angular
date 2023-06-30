import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from './global-component';

@Injectable({
  providedIn: 'root'
})
export class InteraccionService {
  constructor(private http: HttpClient) { }

  getInteraccion(id : string){
    return this.http.get(GlobalComponent.APIurl + "/interaccion/" + id/* , {responseType: 'blob', headers: new HttpHeaders().append('Content-Type', 'application/json')} */);
  }

  putInteraccion(id: string, interacciones : string){
    // crear el mensaje
    const body = {
      IdInteraccion: id,
      Interacciones: interacciones
    }

    console.log(body)
    return this.http.put(GlobalComponent.APIurl + "/interaccion/", body);
  }

  getPrimerasInteracciones(){
    return this.http.get(GlobalComponent.APIurl + "/interaccion");
  }

  getInteraccionCampo(campo, valor){
    return this.http.get(GlobalComponent.APIurl + "/interaccionPorCampo/" + campo + "/" + valor);
  }
}
