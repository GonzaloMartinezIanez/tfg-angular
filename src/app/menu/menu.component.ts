import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router, RouterLink } from '@angular/router';
import { EntrevistadorService } from '../servicios/entrevistador.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
/**
 * Componente con la navegacion superior del sistema
 */
export class MenuComponent implements OnInit {
  user = "Usuario"    // Variable que guarda el nombre del entrevistador

  constructor(private authService: AuthService, public router: Router, private servicioEntrevistador: EntrevistadorService) { }

  /**
   * Al comenzar, se comprueba que el usuario esta logeado, de no ser el caso
   * se redirige a la pagina del login
   * De esta forma si una persona no autorizada prueba a conectarse a una url
   * a la que no tiene acceso, el front-end ni siquiere manda los datos del componente,
   * por lo que no lo podra ver
   */
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['login'])
    } else{
      this.servicioEntrevistador.getEntrevistador().subscribe(res => {
        this.user = res[0].Nombre;
      })
    }
  }

  /**
   * Funcion para cerrar sesion en el sistema
   */
  logOut(){
    this.authService.logOut()
  }
}
