import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { EntrevistadorService } from '../servicios/entrevistador.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global-component';
import DataGridXL from "@datagridxl/datagridxl2";

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})
export class AdministrarUsuariosComponent implements OnInit {
  formularioNuevoEntrevistador = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    ApellidoPaterno: new FormControl('', Validators.required),
    ApellidoMaterno: new FormControl('', Validators.required),
    Institucion: new FormControl('', Validators.required),
    Cargo: new FormControl('', Validators.required),
    User: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    Password2: new FormControl('', Validators.required),
  });

  formularioModificarEntrevistador = new FormGroup({
    IdEntrevistador: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    ApellidoPaterno: new FormControl('', Validators.required),
    ApellidoMaterno: new FormControl('', Validators.required),
    Institucion: new FormControl('', Validators.required),
    Cargo: new FormControl('', Validators.required),
    User: new FormControl('', Validators.required),
  });

  formularioCambiarContrasenia = new FormGroup({
    IdEntrevistador: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    Password2: new FormControl('', Validators.required),
  });

  gridInstance: any;      // Variable donde se crea la tabla
  entrevistadores: any;   // Variable donde se guardan los registros
  posicion = 0;


  hayError = false;
  mensaje = "Mensaje con el error";
  exito = false;
  reiniciar = true;


  constructor(private authService: AuthService, public router: Router, private servicioEntrevistador: EntrevistadorService, private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerCargo();
    this.getEntrevistadores();
  }

  obtenerCargo() {
    this.authService.obtenerCargo().subscribe(res => {
      if (res[0]['Cargo'] != "ADMINISTRADOR") {
        this.router.navigate(['login'])
      }
    });
  }

  getEntrevistadores() {
    this.servicioEntrevistador.getEntrevistadores().subscribe(e => {
      this.entrevistadores = e;
      this.crearTabla(e);
    })
  }

  crearTabla(entrevistadores) {
    this.gridInstance = new DataGridXL("grid", {
      data: entrevistadores.map(e => Object.values(e)),
      allowEditCells: false,
      allowFillCells: false,
      allowInsertRows: false,
      allowDeleteRows: false,
      allowInsertCols: false,
      allowDeleteCols: false,
      allowCut: false,
      allowPaste: false,
      allowCopy: false,
      allowHideCols: true,
      columns: [
        {
          title: "IdEntrevistador",
          source: 0
        },
        {
          title: "Nombre",
          source: 1
        },
        {
          title: "Apellido Paterno",
          source: 2
        },
        {
          title: "Apellido Materno",
          source: 3
        },
        {
          title: "Institucion",
          source: 4
        },
        {
          title: "Cargo",
          source: 5
        },
        {
          title: "Usuario",
          source: 6
        },
        {
          title: "Lugar actual",
          source: 7
        },
        {
          title: "Coordenadas lugar actual",
          source: 8
        }
      ]
    });

    this.gridInstance.events.on('setselection', gridEvent => {
      this.formularioModificarEntrevistador.patchValue({
        IdEntrevistador: this.entrevistadores[gridEvent.cellCursorPosition.y].IdEntrevistador,
        Nombre: this.entrevistadores[gridEvent.cellCursorPosition.y].Nombre,
        ApellidoPaterno: this.entrevistadores[gridEvent.cellCursorPosition.y].ApellidoPaterno,
        ApellidoMaterno: this.entrevistadores[gridEvent.cellCursorPosition.y].ApellidoMaterno,
        Institucion: this.entrevistadores[gridEvent.cellCursorPosition.y].Institucion,
        Cargo: this.entrevistadores[gridEvent.cellCursorPosition.y].Cargo,
        User: this.entrevistadores[gridEvent.cellCursorPosition.y].User,
      });

      this.formularioCambiarContrasenia.patchValue({
        IdEntrevistador: this.entrevistadores[gridEvent.cellCursorPosition.y].IdEntrevistador,
      })

    })
  }

  /**
  * Funcion para descargar la tabla en formato csv
  */
  download() {
    this.gridInstance.downloadDataAsCSV();
  }

  comporbarContrasenia(pass1: string, pass2: string) {
    var valida = true;

    if (pass1 != pass2) {
      this.hayError = true;
      this.mensaje = 'Las contraseñas no son iguales';
      this.exito = false;
      this.reiniciar = false;
      valida = false;
    } else if (pass1.length < 8) {
      this.hayError = true;
      this.mensaje = 'La contraseña debe contener al menos 8 caracteres';
      this.exito = false;
      this.reiniciar = false;
      valida = false;
    } else if (!pass1.match(/[a-z]/) && !pass1.match(/[A-Z]/)) {
      this.hayError = true;
      this.mensaje = 'La contraseña debe contener letras mayúsculas y minúsculas';
      this.exito = false;
      this.reiniciar = false;
      valida = false;
    } else if (!pass1.match(/\d/)) {
      this.hayError = true;
      this.mensaje = 'La contraseña debe contener un número';
      this.exito = false;
      this.reiniciar = false;
      valida = false;
    }

    return valida;
  }

  crearUsuario() {
    if (this.formularioNuevoEntrevistador.invalid) {
      this.hayError = true;
      this.mensaje = 'Hay campos obligatorios vacíos';
      this.exito = false;
      this.reiniciar = false;
    } else {
      if (this.comporbarContrasenia(this.formularioNuevoEntrevistador.value.Password, this.formularioNuevoEntrevistador.value.Password2)) {
        this.servicioEntrevistador.registrarEntrevistador(this.formularioNuevoEntrevistador.value).subscribe(res => {
          if (res['message'] == "Entrevistador añadido") {
            this.hayError = true;
            this.mensaje = "Entrevistador añadido";
            this.exito = true;
            this.reiniciar = true;
          } else {
            this.hayError = true;
            this.mensaje = "Se ha producido un error";
            this.exito = false;
            this.reiniciar = false;
          }
        })
      }
    }
  }

  modificarUsuario() {
    if (this.formularioModificarEntrevistador.invalid) {
      this.hayError = true;
      this.mensaje = 'Hay campos obligatorios vacíos';
      this.exito = false;
      this.reiniciar = false;
    } else {
      this.servicioEntrevistador.putEntrevistadorAdmin(this.formularioModificarEntrevistador.value).subscribe(res => {
        if (res['message'] == "Entrevistador actualizado") {
          this.hayError = true;
          this.mensaje = "Entrevistador actualizado";
          this.exito = true;
          this.reiniciar = false;
          this.getEntrevistadores();
        } else {
          this.hayError = true;
          this.mensaje = "Se ha producido un error";
          this.exito = false;
          this.reiniciar = false;
        }
      })
    }
  }

  cambiarContrasenia() {
    if (this.formularioCambiarContrasenia.invalid) {
      this.hayError = true;
      this.mensaje = 'Hay campos obligatorios vacíos';
      this.exito = false;
      this.reiniciar = false;
    } else {
      if (this.comporbarContrasenia(this.formularioCambiarContrasenia.value.Password, this.formularioCambiarContrasenia.value.Password2)) {
        this.servicioEntrevistador.changePasswordAdmin(this.formularioCambiarContrasenia.value).subscribe(res => {
          if (res['message'] == "Contraseña actualizada") {
            this.hayError = true;
            this.mensaje = "Contraseña actualizada";
            this.exito = true;
            this.reiniciar = false;
          } else {
            this.hayError = true;
            this.mensaje = "Se ha producido un error";
            this.exito = false;
            this.reiniciar = false;
          }
        })
      }
    }
  }

  onMessageClose() {
    this.hayError = false;
    this.mensaje = '';
    this.exito = false;
    this.reiniciar = true;
  }

  cambiarPaso(paso) {
    this.posicion = paso;
  }
}
