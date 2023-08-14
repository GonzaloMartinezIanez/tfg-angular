import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../servicios/grupo.service';
import { FormsModule } from '@angular/forms';
import * as L from "leaflet";

@Component({
  selector: 'app-ver-grupos',
  templateUrl: './ver-grupos.component.html',
  styleUrls: ['./ver-grupos.component.css']
})
/**
 * Componente para consultar los grupos de personas
 */
export class VerGruposComponent implements OnInit {
  grupoSeleccionado: any;     // Guarda el grupo que se ha seleccionado en el select
  gruposCorto: any;           // Id y nombre de los grupos
  personas: any;              // Nombre de los integrantes del grupo

  // Variable donde se guardan los datos del grupo seleccionado
  grupo: any = {
    nombreGrupo: "",
    fechaCreación: "",
    nombreEncargado: "",
    lugarCreacion: "",
    lugarCreacionCoordenadas: ""
  }

  // Variables del mapa
  mapVerGrupo;
  layer = new L.marker;
  ocultarMapa = true;
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

  constructor(private grupoService: GrupoService) { }

  /**
   * Funcion que se ejecuta en la creacion del componente
   * y obtiene el id y nombre de los grupos y crea el mapa
   */
  ngOnInit(): void {
    this.getGrupos();

    this.crearMapa();
  }

  /**
   * Funcion para obtener el id y nombre de los grupos
   */
  getGrupos() {
    this.grupoService.getGruposCorto().subscribe(g => {
      this.gruposCorto = g;
    })
  }

  /**
   * Funcion que se ejecuta cada vez que se seleciona un grupo,
   * solicita los datos e integrantes del grupo a la API
   */
  async onGruposChange(event) {
     this.grupoService.getGrupoId(this.grupoSeleccionado).subscribe(g => {
      this.grupo.nombreGrupo = g[0].NombreGrupo;
      this.grupo.fechaCreacion = g[0].FechaCreacion;
      this.grupo.nombreEncargado = g[0].NombreEncargado;
      this.grupo.lugarCreacion = g[0].LugarCreacion;
      this.grupo.lugarCreacionCoordenadas = g[0].LugarCreacionCoordenadas;
    });

    this.grupoService.getPersonasEnGrupo(this.grupoSeleccionado).subscribe(personas => {
      this.personas = personas
    })

    await this.delay(100);

    this.actualizarMapa();
  }

  /**
   * Funcion para crear el mapa
   */
  crearMapa() {
    this.mapVerGrupo = L.map("mapVerGrupo").setView([37.16788748437835, -3.5993957519531254], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapVerGrupo);
  }

  /**
   * Funcion para actualizar el mapa
   */
  actualizarMapa() {
    if (this.grupo.lugarCreacionCoordenadas != null) {
      const coordenadas = this.grupo.lugarCreacionCoordenadas.split(', ');

      if (Number(coordenadas[0]) && Number(coordenadas[1])) {
        this.ocultarMapa = false;        

        this.mapVerGrupo.removeLayer(this.layer)
        this.mapVerGrupo.setView([coordenadas[0], coordenadas[1]], 13);
        this.layer = L.marker([coordenadas[0], coordenadas[1]], this.markerIcon).addTo(this.mapVerGrupo);
      } 
    } else {
      this.ocultarMapa = true;
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
