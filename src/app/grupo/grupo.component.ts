import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntrevistadorService } from '../entrevistador.service';
import * as L from "leaflet";
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global-component';


@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  formularioGrupo = new FormGroup({
    NombreGrupo: new FormControl('', Validators.required),
    FechaCreacion: new FormControl(''),
    NombreEncargado: new FormControl(''),
    LugarCreacion: new FormControl(''),
  })

  constructor(private http: HttpClient) { }
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

  ngOnInit(): void {
    this.mapGrupo = L.map("mapGrupo").setView([37.16788748437835, -3.5993957519531254], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapGrupo);

    this.mapGrupo.on("click", e => {
      //Marcar las coordenadas en el formulario
      this.formularioGrupo.patchValue({
        LugarCreacion: e.latlng.lat + ", " + e.latlng.lng
      });
      // Eliminar la marca anterior
      this.layer.remove();
      // Guardar la marca y dibujarla en el mapa
      this.layer = L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.mapGrupo);
    });
  }

  crearGrupo() {
    this.http.post(GlobalComponent.APIurl + "/grupo", this.formularioGrupo.value)
      .subscribe(res => {
        console.log(res)
        if (res['message'] == "Grupo añadido") {
          alert("Grupo añadido")
        }
      })
  }
}
