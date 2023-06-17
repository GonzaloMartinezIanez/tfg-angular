import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { GlobalComponent } from './global-component';

@Injectable({
  providedIn: 'root'
})
export class EntrevistadorService {

  constructor(private http: HttpClient) { }

  getEntrevistadorId(id: string) {
    return this.http.get(GlobalComponent.APIurl + "/entrevistador/" + id);
  }

  putEntrevistador(id: string, e: any) {
    this.http.put(GlobalComponent.APIurl + "/entrevistador/" + id, e)
      .subscribe(res => {
        console.log(res)
        if (res == "Entrevistador actualizado")
          alert("Entrevistador actualizado")
      });
  }
}
