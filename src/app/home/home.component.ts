import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * Componente que contiene el menu principal de la aplicacion
 */
export class HomeComponent implements OnInit {
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Funcion que redirecciona al usuario al componente indicado
   * @param direccion Cadena con la url
   */
  navegar(direccion : string) : void {
    this.router.navigate([direccion]);
  }
}
