import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntrevistadorService } from '../servicios/entrevistador.service';
import * as L from "leaflet";
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global-component';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})

/**
 * Componente para la creacion de grupos de personas
 */
export class GrupoComponent implements OnInit {
  // FormGroup con el formulario
  formularioGrupo = new FormGroup({
    NombreGrupo: new FormControl('', Validators.required),
    FechaCreacion: new FormControl(''),    
    NombreEncargado: new FormControl(''),
    LugarCreacion: new FormControl(''),
    LugarCreacionCoordenadas: new FormControl(''),
  })

  // Variables del mapa
  mapGrupo;
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
  reiniciar = true;
  home = true;

  constructor(private http: HttpClient, private servicioEntrevistador: EntrevistadorService,
    private authService: AuthService, public router: Router) { }

  /**
   * Se obtiene el entrevistador al comenzar el componente
   */
  ngOnInit(): void {
    this.obtenerCargo();
    this.getEntrevistador();
  }

  obtenerCargo() {
    this.authService.obtenerCargo().subscribe(res => {
      if (res[0]['Cargo'] == "ENTREVISTADOR") {
        this.router.navigate(['home'])
      }
    });
  }

  /**
   * Obtener el entrevistador actual y rellenar el campo del lugar de 
   * creacion del grupo
   */
  getEntrevistador(): void {
    this.servicioEntrevistador.getEntrevistador()
      .subscribe(entrevistador => {
        this.formularioGrupo.patchValue({
          LugarCreacion: entrevistador[0].LugarActual,
          LugarCreacionCoordenadas: entrevistador[0].LugarActualCoordenadas,
        });

        this.crearMapa()
      });
  }

  /**
   * Funcion para crear el mapa
   */
  crearMapa() {
    this.mapGrupo = L.map("mapGrupo").setView([37.16788748437835, -3.5993957519531254], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapGrupo);

    L.Control.geocoder()
      .on('markgeocode', e => {
        this.formularioGrupo.patchValue({
          LugarCreacion: e.geocode.name.toUpperCase(),
          LugarCreacionCoordenadas: e.geocode.center.lat + ", " + e.geocode.center.lng
        })
      }).addTo(this.mapGrupo);

    if (this.formularioGrupo.value.LugarCreacionCoordenadas != undefined) {
      const coordenadas = this.formularioGrupo.value.LugarCreacionCoordenadas.split(', ');

      if (Number(coordenadas[0]) && Number(coordenadas[1])) {
        this.mapGrupo.setView([coordenadas[0], coordenadas[1]], 13);
        this.layer = L.marker([coordenadas[0], coordenadas[1]], this.markerIcon).addTo(this.mapGrupo);
      }
    }

    /**
     * Funcion que se ejecuta cada vez que se hace click sobre el mapa
     */
    /* this.mapGrupo.on("click", e => {
      //Marcar las coordenadas en el formulario
      this.formularioGrupo.patchValue({
        LugarCreacion: e.latlng.lat + ", " + e.latlng.lng
      });
      // Eliminar la marca anterior
      this.layer.remove();
      // Guardar la marca y dibujarla en el mapa
      this.layer = L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.mapGrupo);
    }); */
  }

  /**
   * Funcion que envia el formulario a la API
   */
  crearGrupo() {
    if (this.formularioGrupo.invalid) {
      this.hayError = true;
      this.mensaje = 'Hay campos obligatorios vacíos';
      this.exito = false;
      this.reiniciar = false;
      this.home = false;
    } else {
      if(this.formularioGrupo.value.LugarCreacion == ""){
        this.formularioGrupo.patchValue({
          LugarCreacionCoordenadas: ""
        })
      }

      this.http.post(GlobalComponent.APIurl + "/grupo", this.formularioGrupo.value)
        .subscribe(res => {
          if (res['message'] == "Grupo añadido") {
            this.hayError = true;
            this.mensaje = "Grupo añadido";
            this.exito = true;
            this.reiniciar = true;
            this.home = true;
          } else {
            this.hayError = true;
            this.mensaje = "Se ha producido un error";
            this.exito = false;
            this.reiniciar = false;
            this.home = false;
          }
        })
    }
  }

  onMessageClose() {
    this.hayError = false;
    this.mensaje = '';
    this.exito = false;
    this.reiniciar = true;
    this.home = true;
  }
}
