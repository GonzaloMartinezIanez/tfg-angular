import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
/**
 * Servicio encargado de gestionar el sistema de sesiones
 */
export class AuthService {
  constructor(private router: Router) { }

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
}
