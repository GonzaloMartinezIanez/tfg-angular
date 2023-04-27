import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalComponent } from './global-component';

@Injectable({
  providedIn: 'root'
})
export class InteraccionService {
  constructor(private http: HttpClient) { }

  getInteraccion(id : string){
    
  }

  getPrimerasInteracciones(){
    return this.http.get(GlobalComponent.APIurl + "/interaccion");
  }

  getInteraccionCampo(campo, valor){
    return this.http.get(GlobalComponent.APIurl + "/interaccionPorCampo/" + campo + "/" + valor);
  }
}
