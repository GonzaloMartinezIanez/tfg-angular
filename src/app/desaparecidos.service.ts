import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from './global-component';

@Injectable({
  providedIn: 'root'
})
export class DesaparecidosService {

  constructor(private http: HttpClient) { }

  getDesaparecidos(id : string){
    
  }

  getPrimerosDesaparecidos(){
    return this.http.get(GlobalComponent.APIurl + "/desaparecidos");
  }

  getDesaparecidosCampo(campo, valor){
    return this.http.get(GlobalComponent.APIurl + "/desaparecidosPorCampo/" + campo + "/" + valor);
  }
}
