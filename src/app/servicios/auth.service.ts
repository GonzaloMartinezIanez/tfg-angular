import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global-component';


@Injectable({
  providedIn: 'root'
})
/**
 * Servicio encargado de gestionar el sistema de sesiones
 */
export class AuthService {
  constructor(private router: Router, private http: HttpClient) { }

  /**
   * Funcion para obtener el JWT
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Funcion que devuelve si el usuario tiene o no 
   * una sesion abierta
   */
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  /**
   * Funcion para cerrar sesion
   */
  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  esAdmin(){
    return this.http.get(GlobalComponent.APIurl + "/administrador"); 
  }
}
