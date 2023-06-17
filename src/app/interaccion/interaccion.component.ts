import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntrevistadorService } from '../entrevistador.service';
import { GrupoService } from '../grupo.service';
import * as L from "leaflet";
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global-component';

@Component({
  selector: 'app-interaccion',
  templateUrl: './interaccion.component.html',
  styleUrls: ['./interaccion.component.css']
})
export class InteraccionComponent implements OnInit {
  mapInteraccion;
  layer = new L.marker;
  imagenSRC: string = "";

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

  posicionFormulario: any;

  formularioInteraccion = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    ApellidoPaterno: new FormControl('', Validators.required),
    ApellidoMaterno: new FormControl(''),
    NombreSocial: new FormControl(''),
    FechaNacimiento: new FormControl(''),
    Sexo: new FormControl(''),
    Nacionalidad: new FormControl(''),
    Estado: new FormControl(''),
    Municipio: new FormControl(''),
    LugarFrecuenta: new FormControl(''),
    LugarActual: new FormControl(''),
    IdGrupo: new FormControl(''),
    SituacionCalle: new FormControl(''),
    MigrantesMexicanas: new FormControl(''),
    TrabajadorCampo: new FormControl(''),
    DesplazadasForzadasInternas: new FormControl(''),
    MigrantesExtranjeras: new FormControl(''),
    Deportadas: new FormControl(''),
    TrabajadorHogar: new FormControl(''),
    DescripcionFisica: new FormControl(''),
    Necesidades: new FormControl(''),
    MensajeFamiliares: new FormControl(''),
    Imagen: new FormControl(null),
    SaludFisica: new FormControl(''),
    SaludMental: new FormControl(''),
    Observaciones: new FormControl(''),
    Folio: new FormControl('', Validators.required),
    Entrevistador: new FormControl('', Validators.required),
    Institucion: new FormControl('', Validators.required),
    Interacciones: new FormControl(''),
  })

  grupos: any;

  constructor(private servicioEntrevistador: EntrevistadorService,
    private servicioGrupo: GrupoService, private http: HttpClient) { }

  ngOnInit(): void {
    this.posicionFormulario = 0;
    this.getGrupos();
    this.getEntrevistadorId("1");
  }

  crearMapa() {
    this.mapInteraccion = L.map("mapInteraccion", { scrollWheelZoom: false }).setView([37.16788748437835, -3.5993957519531254], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapInteraccion);

    if (this.formularioInteraccion.value.LugarActual != undefined) {
      const coordenadas = this.formularioInteraccion.value.LugarActual.split(', ');

      if (Number(coordenadas[0]) && Number(coordenadas[1])) {
        this.mapInteraccion.setView([coordenadas[0], coordenadas[1]], 13);
        this.layer = L.marker([coordenadas[0], coordenadas[1]], this.markerIcon).addTo(this.mapInteraccion);
      }
    }

    this.mapInteraccion.on("click", e => {
      //Marcar las coordenadas en el formulario
      this.formularioInteraccion.patchValue({
        LugarActual: e.latlng.lat + ", " + e.latlng.lng
      });
      // Eliminar la marca anterior
      this.layer.remove();
      // Guardar la marca y dibujarla en el mapa
      this.layer = L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.mapInteraccion);
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imagenSRC = reader.result as string;

        this.formularioInteraccion.patchValue({
          Imagen: reader.result
        });
      };
    }
  }

  getGrupos() {
    this.servicioGrupo.getGruposCorto()
      .subscribe(grupos => {
        this.grupos = grupos;
        this.formularioInteraccion.patchValue({
          IdGrupo: "Sin grupo"
        })
      });
  }

  getEntrevistadorId(id: string): void {
    this.servicioEntrevistador.getEntrevistadorId(id)
      .subscribe(entrevistador => {
        this.formularioInteraccion.patchValue({
          Entrevistador: entrevistador[0].Nombre,
          Institucion: entrevistador[0].Institucion,
          LugarActual: entrevistador[0].LugarActual,
        });

        /* const coordenadas = entrevistador[0].LugarActual.split(', ');

        if (Number(coordenadas[0]) && Number(coordenadas[1])) {
          this.mapInteraccion.setView([coordenadas[0], coordenadas[1]], 13);
          this.layer = L.marker([coordenadas[0], coordenadas[1]], this.markerIcon).addTo(this.mapInteraccion);
        } */
      });
  }

  enviar(): void {
    //.log(this.formularioInteraccion.value)
     this.http.post(GlobalComponent.APIurl + "/interaccion", this.formularioInteraccion.value)
       .subscribe(res => {
         console.log(res)
         if(res['message'] == "Interacción añadida"){
          alert("Interacción añadida")
         }
       })
  }

  async cambiarPasoFormulario(siguientePaso) {
    this.posicionFormulario = siguientePaso;
    // Esta espera es necesaria ya que a la hora de crear el mapa, no le da tiempo al html a mostrar 
    // el div con "mapInteraccion" y en la función crearMapa no la encuentra y produce un error
    await this.delay(1);

    if (siguientePaso == 1) {
      this.crearMapa()
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
