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

  getEntrevistador() {
    return this.http.get(GlobalComponent.APIurl + "/entrevistador");
  }

  putEntrevistador(e: any) {
    this.http.put(GlobalComponent.APIurl + "/entrevistador", e)
      .subscribe(res => {
        console.log(res)
        if (res == "Entrevistador actualizado")
          alert("Entrevistador actualizado")
      });
  }
}
