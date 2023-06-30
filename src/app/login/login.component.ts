import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalComponent } from '../global-component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioLogIn = new FormGroup({
    User: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  })

  constructor(private http: HttpClient, public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home'])
    }
  }

  enviar(): void {
    if (!this.formularioLogIn.valid) {
      alert("Tienes que rellenar los campos")
    } else {
      this.http.post(GlobalComponent.APIurl + "/auth", this.formularioLogIn.value)
        .subscribe(res => {
          console.log(res)
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
