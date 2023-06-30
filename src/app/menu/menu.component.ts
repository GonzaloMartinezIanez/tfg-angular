import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { EntrevistadorService } from '../entrevistador.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user = "Usuario"

  constructor(private authService: AuthService, public router: Router, private servicioEntrevistador: EntrevistadorService) { }

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['login'])
    } else{
      this.servicioEntrevistador.getEntrevistador().subscribe(res => {
        this.user = res[0].Nombre;
      })
    }
  }

  mostrarUsuario

  logOut(){
    this.authService.logOut()
  }
}
