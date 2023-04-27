import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from './global-component';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  constructor(private http: HttpClient) { }

  getGrupos() {
    return this.http.get(GlobalComponent.APIurl + "/grupo");
  }

  getGrupoId(id : string){
    return this.http.get(GlobalComponent.APIurl + "/" + id);
  }

  getGruposCorto() {
    return this.http.get(GlobalComponent.APIurl + "/grupocorto");
  }

}
