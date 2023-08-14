import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntrevistadorService } from '../servicios/entrevistador.service';
import * as L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

@Component({
  selector: 'app-entrevistador',
  templateUrl: './entrevistador.component.html',
  styleUrls: ['./entrevistador.component.css']
})

/**
 * Componente con el formulario para cambiar los datos del entrevistador
 */
export class EntrevistadorComponent implements OnInit {
  // FormGroup con el formulario
  formularioEntrevistador = new FormGroup({
    /* Nombre: new FormControl(''),
    ApellidoPaterno: new FormControl(''),
    ApellidoMaterno: new FormControl(''),
    Institucion: new FormControl(''),
    Cargo: new FormControl(''), */
    LugarActual: new FormControl(''),
    LugarActualCoordenadas: new FormControl(''),
  });

  formularioPassword = new FormGroup({
    OldPassword: new FormControl('', Validators.required),
    NewPassword: new FormControl('', Validators.required),
    NewPassword2: new FormControl('', Validators.required),
  });

  entrevistador = {
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    Institucion: "",
    Cargo: "",
    User: "",
  }

  cambiarContraseña = false;

  // Variables del mapa
  mapEntrevistador;
  layer = new L.marker;
  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
    })
  };

  hayError = false;
  mensaje = "Mensaje con el error";
  exito = false;

  constructor(private servicioEntrevistador: EntrevistadorService) { }

  /**
   * Al comenzar la ejecucion se obtiene el entrevistador
   * y se crea el mapa
   */
  ngOnInit(): void {
    this.getEntrevistador();

    this.crearMapa();
  }

  /**
   * Funcion para crear el mapa
   */
  crearMapa() {
    this.mapEntrevistador = L.map("mapEntrevistador").setView([37.16788748437835, -3.5993957519531254], 9);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapEntrevistador);

    L.Control.geocoder()
      .on('markgeocode', e => {
        this.formularioEntrevistador.patchValue({
          LugarActual: e.geocode.name.toUpperCase(),
          LugarActualCoordenadas: e.geocode.center.lat + ", " + e.geocode.center.lng
        })
      }).addTo(this.mapEntrevistador);

    /* this.mapEntrevistador.on("click", e => {
      //Marcar las coordenadas en el formulario
      this.formularioEntrevistador.patchValue({
        LugarActual: e.latlng.lat + ", " + e.latlng.lng
      });
      // Eliminar la marca anterior
      this.layer.remove();
      // Guardar la marca y dibujarla en el mapa
      this.layer = L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.mapEntrevistador);
    }); */
  }

  /**
   * Funcion para obtener el entrevistador y mostrar sus
   * datos en el formulario
   */
  getEntrevistador(): void {
    this.servicioEntrevistador.getEntrevistador()
      .subscribe(entrevistador => {
        this.entrevistador = {
          Nombre: entrevistador[0].Nombre,
          ApellidoPaterno: entrevistador[0].ApellidoPaterno,
          ApellidoMaterno: entrevistador[0].ApellidoMaterno,
          Institucion: entrevistador[0].Institucion,
          Cargo: entrevistador[0].Cargo,
          User: entrevistador[0].User
        }
        this.formularioEntrevistador.patchValue({
          /* Nombre: entrevistador[0].Nombre,
          ApellidoPaterno: entrevistador[0].ApellidoPaterno,
          ApellidoMaterno: entrevistador[0].ApellidoMaterno,
          Institucion: entrevistador[0].Institucion,
          Cargo: entrevistador[0].Cargo, */
          LugarActual: entrevistador[0].LugarActual,
          LugarActualCoordenadas: entrevistador[0].LugarActualCoordenadas
        });

        const coordenadas = entrevistador[0].LugarActualCoordenadas.split(', ');

        // Si su lugar actual son coordenadas, se pone un marcador en el mapa
        if (Number(coordenadas[0]) && Number(coordenadas[1])) {
          this.mapEntrevistador.setView([coordenadas[0], coordenadas[1]], 9);
          this.layer = L.marker([coordenadas[0], coordenadas[1]], this.markerIcon).addTo(this.mapEntrevistador);
        }
      });
  }

  /**
   * Funcion para actualizar los datos del entrevistador 
   */
  modificar(): void {
    this.servicioEntrevistador.putEntrevistador(this.formularioEntrevistador.value).subscribe(res => {
      if (res['message'] == "Entrevistador actualizado") {
        this.hayError = true;
        this.mensaje = 'Entrevistador actualizado';
        this.exito = true;
      } else {
        this.hayError = true;
        this.mensaje = 'Se ha producido un error';
        this.exito = false;
      }
    });
  }

  changePassword() {
    if (this.formularioPassword.invalid) {
      this.hayError = true;
      this.mensaje = 'Hay campos obligatorios vacíos';
      this.exito = false;
    } else {
      if (this.comporbarContrasenia(this.formularioPassword.value.NewPassword, this.formularioPassword.value.NewPassword2)) {
        this.servicioEntrevistador.changePassword(this.formularioPassword.value).subscribe(res => {
          if (res['message'] == "Contraseña actualizada") {
            this.hayError = true;
            this.mensaje = 'Contraseña actualizada';
            this.exito = true;
          } else if (res['message'] == "Contraseña distinta") {
            this.hayError = true;
            this.mensaje = 'Contraseña distinta';
            this.exito = false;
          }
        }, error => {
          this.hayError = true;
          this.mensaje = 'Se ha producido un error';
          this.exito = false;
        })
      }

    }

  }

  comporbarContrasenia(pass1: string, pass2: string) {
    var valida = true;

    if (pass1 != pass2) {
      this.hayError = true;
      this.mensaje = 'Las contraseñas no son iguales';
      this.exito = false;
      valida = false;
    } else if (pass1.length < 8) {
      this.hayError = true;
      this.mensaje = 'La contraseña debe contener al menos 8 caracteres';
      this.exito = false;
      valida = false;
    } else if (!pass1.match(/[a-z]/) && !pass1.match(/[A-Z]/)) {
      this.hayError = true;
      this.mensaje = 'La contraseña debe contener letras mayúsculas y minúsculas';
      this.exito = false;
      valida = false;
    } else if (!pass1.match(/\d/)) {
      this.hayError = true;
      this.mensaje = 'La contraseña debe contener un número';
      this.exito = false;
      valida = false;
    }

    return valida;
  }

  onMessageClose() {
    this.hayError = false;
    this.mensaje = '';
    this.exito = false;
  }
}
