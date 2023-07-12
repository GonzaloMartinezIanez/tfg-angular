import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EntrevistadorService } from '../servicios/entrevistador.service';
import { Observable } from 'rxjs';
import * as L from "leaflet";


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
    Nombre: new FormControl(''),
    ApellidoPaterno: new FormControl(''),
    ApellidoMaterno: new FormControl(''),
    Institucion: new FormControl(''),
    Cargo: new FormControl(''),
    LugarActual: new FormControl(''),
  });

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
    this.mapEntrevistador = L.map("mapEntrevistador").setView([37.16788748437835, -3.5993957519531254], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapEntrevistador);

    this.mapEntrevistador.on("click", e => {
      //Marcar las coordenadas en el formulario
      this.formularioEntrevistador.patchValue({
        LugarActual: e.latlng.lat + ", " + e.latlng.lng
      });
      // Eliminar la marca anterior
      this.layer.remove();
      // Guardar la marca y dibujarla en el mapa
      this.layer = L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.mapEntrevistador);
    });
  }

  /**
   * Funcion para obtener el entrevistador y mostrar sus
   * datos en el formulario
   */
  getEntrevistador(): void {
    this.servicioEntrevistador.getEntrevistador()
      .subscribe(entrevistador => {
        this.formularioEntrevistador.patchValue({
          Nombre: entrevistador[0].Nombre,
          ApellidoPaterno: entrevistador[0].ApellidoPaterno,
          ApellidoMaterno: entrevistador[0].ApellidoMaterno,
          Institucion: entrevistador[0].Institucion,
          Cargo: entrevistador[0].Cargo,
          LugarActual: entrevistador[0].LugarActual
        });

        const coordenadas = entrevistador[0].LugarActual.split(', ');

        // Si su lugar actual son coordenadas, se pone un marcador en el mapa
        if (Number(coordenadas[0]) && Number(coordenadas[1])) {
          this.mapEntrevistador.setView([coordenadas[0], coordenadas[1]], 13);
          this.layer = L.marker([coordenadas[0], coordenadas[1]], this.markerIcon).addTo(this.mapEntrevistador);
        }
      });
  }

  /**
   * Funcion para actualizar los datos del entrevistador 
   */
  modificar(): void {
    this.servicioEntrevistador.putEntrevistador(this.formularioEntrevistador.value).subscribe(res => {
      console.log(res)
      if (res == "Entrevistador actualizado")
        alert("Entrevistador actualizado")
    });
  }
}
