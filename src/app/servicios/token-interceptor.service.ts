import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import {AuthService} from './auth.service'

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio que modifica todas las peticiones que se realizan a la
 * API añadiend el token en la cabecera
 */
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  // Añadir el header a todas las peticiones que se hagan al backend
  intercept(req, next) {
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
