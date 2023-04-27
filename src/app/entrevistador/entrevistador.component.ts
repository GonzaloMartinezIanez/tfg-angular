import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EntrevistadorService } from '../entrevistador.service';
import { Observable } from 'rxjs';
import * as L from "leaflet";


@Component({
  selector: 'app-entrevistador',
  templateUrl: './entrevistador.component.html',
  styleUrls: ['./entrevistador.component.css']
})

export class EntrevistadorComponent implements OnInit {
  formularioEntrevistador = new FormGroup({
    Nombre: new FormControl(''),
    ApellidoPaterno: new FormControl(''),
    ApellidoMaterno: new FormControl(''),
    Institucion: new FormControl(''),
    LugarActual: new FormControl(''),
  });

  mapEntrevistador;
  layer = new L.marker;
  
  e: any;

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

  ngOnInit(): void {

    this.getEntrevistadorId("1");

    this.crearMapa();
  }

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

  getEntrevistadorId(id: string): void {
    this.servicioEntrevistador.getEntrevistadorId(id)
      .subscribe(entrevistador => {
        this.formularioEntrevistador.patchValue({
          Nombre: entrevistador[0].Nombre,
          ApellidoPaterno: entrevistador[0].ApellidoPaterno,
          ApellidoMaterno: entrevistador[0].ApellidoMaterno,
          Institucion: entrevistador[0].Institucion,
          LugarActual: entrevistador[0].LugarActual
        });

        const coordenadas = entrevistador[0].LugarActual.split(', ');

        if (Number(coordenadas[0]) && Number(coordenadas[1])) {
          this.mapEntrevistador.setView([coordenadas[0], coordenadas[1]], 13);
          this.layer = L.marker([coordenadas[0], coordenadas[1]], this.markerIcon).addTo(this.mapEntrevistador);
        }
      });
  }

  modificar(): void {
    const e = {
      "Nombre": this.formularioEntrevistador.value.Nombre,
      "ApellidoPaterno": this.formularioEntrevistador.value.ApellidoPaterno,
      "ApellidoMaterno": this.formularioEntrevistador.value.ApellidoMaterno,
      "Institucion": this.formularioEntrevistador.value.Institucion,
      "LugarActual": this.formularioEntrevistador.value.LugarActual
    };

    this.servicioEntrevistador.putEntrevistador("1", this.formularioEntrevistador.value);
  }
}
