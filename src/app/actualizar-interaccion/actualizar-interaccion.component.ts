import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../servicios/grupo.service';
import { HttpClient } from '@angular/common/http';
import { InteraccionService } from '../servicios/interaccion.service';
import * as L from "leaflet";

@Component({
  selector: 'app-actualizar-interaccion',
  templateUrl: './actualizar-interaccion.component.html',
  styleUrls: ['./actualizar-interaccion.component.css']
})
/**
 * Componente para captar una persona en interaccion y
 * actualizar la interaccion
 */
export class ActualizarInteraccionComponent implements OnInit {
  folio = "";                   // Contenido que se enviará en el formulario
  hayInteraccion = false;       // Hasta que no hay una interaccion, no se muestra el div
  estaEnGrupo = false;          // Mostrar los integrantes del grupo si hay
  interaccionesOriginal = ""    // Variable necesaria para saber si se ha tocado la interaccion

  interaccion: any = {          // Variable donde se guarda la interaccion
    Folio: "",
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    NombreSocial: "",
    FechaNacimiento: "",
    Sexo: "",
    Nacionalidad: "",
    Estado: "",
    Municipio: "",
    LugarFrecuenta: "",
    LugarActual: "",
    IdGrupo: "",
    SituacionCalle: "",
    MigrantesMexicanas: "",
    TrabajadorCampo: "",
    DesplazadasForzadasInternas: "",
    MigrantesExtranjeras: "",
    Deportadas: "",
    TrabajadorHogar: "",
    DescripcionFisica: "",
    Necesidades: "",
    MensajeFamiliares: "",
    Imagen: "",
    SaludFisica: "",
    SaludMental: "",
    Observaciones: "",
    Entrevistador: "",
    Institucion: "",
    Interacciones: "",
    NombreGrupo: ""
  }

  // Variables relacionadas con el mapa
  mapActualizarInteraccion;
  layer = new L.marker;
  ocultarMapa = true;
  primeraVezMapa = true;

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

  constructor(private http: HttpClient, private servicioGrupo: GrupoService, private servicioInteraccion: InteraccionService) { }

  ngOnInit(): void {
    // Al comenzar se crea un mapa vacio que no se muestra
    this.crearMapa();
  }

  /**
   * Funcion que pide la interacion y guarda el resultado en la interaccion
   * en la variable privada this.interaccion
   * En el caso de no existir o no tener acceso, se muestra un error
   */
  getInteraccion() {
    if (Number(this.folio)) {
      this.servicioInteraccion.getInteraccion(this.folio).subscribe(res => {
        if (res == "") {
          this.hayInteraccion = false
          alert("El registro no existe o no tienes acceso")
        } else {
          this.hayInteraccion = true

          this.interaccion.Folio = this.folio;
          this.interaccion.Nombre = res[0].Nombre;
          this.interaccion.ApellidoPaterno = res[0].ApellidoPaterno;
          this.interaccion.ApellidoMaterno = res[0].ApellidoMaterno;
          this.interaccion.NombreSocial = res[0].NombreSocial;
          this.interaccion.FechaNacimiento = res[0].FechaNacimiento;
          this.interaccion.Sexo = res[0].Sexo;
          this.interaccion.Nacionalidad = res[0].Nacionalidad;
          this.interaccion.Estado = res[0].Estado;
          this.interaccion.Municipio = res[0].Municipio;
          this.interaccion.LugarFrecuenta = res[0].LugarFrecuenta;
          this.interaccion.LugarActual = res[0].LugarActual;
          this.interaccion.IdGrupo = res[0].IdGrupo;
          this.interaccion.SituacionCalle = res[0].SituacionCalle;
          this.interaccion.MigrantesMexicanas = res[0].MigrantesMexicanas;
          this.interaccion.TrabajadorCampo = res[0].TrabajadorCampo;
          this.interaccion.DesplazadasForzadasInternas = res[0].DesplazadasForzadasInternas;
          this.interaccion.MigrantesExtranjeras = res[0].MigrantesExtranjeras;
          this.interaccion.Deportadas = res[0].Deportadas;
          this.interaccion.TrabajadorHogar = res[0].TrabajadorHogar;
          this.interaccion.DescripcionFisica = res[0].DescripcionFisica;
          this.interaccion.Necesidades = res[0].Necesidades;
          this.interaccion.MensajeFamiliares = res[0].MensajeFamiliares;
          this.interaccion.Imagen = res[0].Imagen;
          this.interaccion.SaludFisica = res[0].SaludFisica;
          this.interaccion.SaludMental = res[0].SaludMental;
          this.interaccion.Observaciones = res[0].Observaciones;
          this.interaccion.Entrevistador = res[0].Entrevistador;
          this.interaccion.Institucion = res[0].Institucion;
          this.interaccion.Interacciones = res[0].Interacciones;

          this.interaccionesOriginal = res[0].Interacciones;

          // Mostrar el mapa si es necesario
          if (this.interaccion.LugarActual != "") {
            const coordenadas = this.interaccion.LugarActual.split(', ');
            if (Number(coordenadas[0]) && Number(coordenadas[1])) {
              if(this.primeraVezMapa){          
                this.actualizarMapa();
                this.ocultarMapa = false;
              } else{
                this.ocultarMapa = true;
              }
            }
          } else {
            this.ocultarMapa = true;
          }

          // Si esta en un grupo hay que mostrarlo en la interfaz
          this.servicioGrupo.getGrupoInteraccion(this.folio).subscribe(res => {
            if (res == "[]") {
              this.estaEnGrupo = false;
            } else {
              this.estaEnGrupo = true;
              this.interaccion.NombreGrupo = res[0].NombreGrupo
            }
          })
        }
      })
      
    } else {
      alert("El folio debe ser un número")
    }
  }

  /**
   * Funcion que crea un mapa vacio
   */
  crearMapa() {
    this.mapActualizarInteraccion = L.map("mapActualizarInteraccion").setView([37.16788748437835, -3.5993957519531254], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapActualizarInteraccion);
  }

  /**
   * Funcion que añade un marcador al mapa con la nueva posicion
   */
  actualizarMapa() {
    if (this.interaccion.LugarActual != "") {
      const coordenadas = this.interaccion.LugarActual.split(', ');

      if (Number(coordenadas[0]) && Number(coordenadas[1])) {
        this.ocultarMapa = false;

        this.mapActualizarInteraccion.removeLayer(this.layer)
        this.mapActualizarInteraccion.setView([coordenadas[0], coordenadas[1]], 13);
        this.layer = L.marker([coordenadas[0], coordenadas[1]], this.markerIcon).addTo(this.mapActualizarInteraccion);
      } else {
        this.ocultarMapa = true;
      }
    }
  }

  /**
   * Funcion que manda una peticion a la API para
   * actualizar la interaccion de la persona
   */
  actualizar() {
    if (this.interaccionesOriginal == this.interaccion.Interacciones) {
      // No se ha modificado la interaccion
      alert("No se han modificado las interacciones")
    } else {
      this.servicioInteraccion.putInteraccion(this.folio, this.interaccion.Interacciones).subscribe(res => {
        console.log(res)
         if (res['message'] == "Interaccion actualizada") {
           alert("Interacción actualizada con éxito")
         }
      })
    }
  }

  /* delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } */
}
