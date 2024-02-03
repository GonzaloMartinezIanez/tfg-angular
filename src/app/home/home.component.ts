import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/**
 * Componente que contiene el menu principal de la aplicacion
 */
export class HomeComponent implements OnInit {
  constructor(public router: Router, private authService: AuthService) { }
  entrevistador = false;


  ngOnInit(): void {
    this.obtenerCargo();
  }

  /**
   * Funcion que redirecciona al usuario al componente indicado
   * @param direccion Cadena con la url
   */
  navegar(direccion : string) : void {
    this.router.navigate([direccion]);
  }
  
  obtenerCargo() {
    this.authService.obtenerCargo().subscribe(res => {
      if (res[0]['Cargo'] == "ENTREVISTADOR") {
        this.entrevistador = true
      }
    });
  }
}
