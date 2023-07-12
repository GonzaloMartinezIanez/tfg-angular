import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalComponent } from '../global-component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * Componente con la vista para iniciar sesion
 * en el sistema
 */
export class LoginComponent implements OnInit {
  // FormGroup con el formulario
  formularioLogIn = new FormGroup({
    User: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient, public router: Router, private authService: AuthService) { }

  /**
   * Al comenzar la ejecucion se comprueba si se esta logeado
   * en el sistema y de ser asi se redirecciona hacia el menu principal
   */
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home'])
    }
  }

  /**
   * Funcion que envia los datos del formulario a la API
   * Si los datos son correctos se guarda el token y se accede al sistema,
   * en caso contrario se muestra un error
   */
  enviar(): void {
    if (!this.formularioLogIn.valid) {
      alert("Tienes que rellenar los campos")
    } else {
      this.http.post(GlobalComponent.APIurl + "/auth", this.formularioLogIn.value)
        .subscribe(res => {
          if (res['token'] != undefined) {
            localStorage.setItem('token', res['token'])
            this.router.navigate(['home'])
          } else {
            alert("Usuario o contraseña incorrecta")
          }
        })
    }
  }
}
