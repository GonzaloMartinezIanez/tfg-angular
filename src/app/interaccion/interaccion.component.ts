import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EntrevistadorService } from '../servicios/entrevistador.service';
import { GrupoService } from '../servicios/grupo.service';
import * as L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global-component';
import { NacionesService } from '../servicios/naciones.service';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interaccion',
  templateUrl: './interaccion.component.html',
  styleUrls: ['./interaccion.component.css']
})
export class InteraccionComponent implements OnInit {
  // FormGroup ocn el formulario de personas en interaccion
  formularioInteraccion = new FormGroup({
    // Datos generales
    Nombre: new FormControl('', Validators.required),
    ApellidoPaterno: new FormControl('', Validators.required),
    ApellidoMaterno: new FormControl(''),
    NombreSocial: new FormControl(''),
    FechaNacimiento: new FormControl('', Validators.required),
    Edad: new FormControl('', Validators.required),
    Sexo: new FormControl(''),
    ViajaConIdentificacion: new FormControl(''),
    ViajaConIdentificacionCual: new FormControl(''),
    OtrosIdiomas: new FormControl(''),
    OtrosIdiomasCual: new FormControl(''),
    PuebloOriginario: new FormControl(''),
    PuebloOriginarioCual: new FormControl(''),
    Profesion: new FormControl(''),

    // Procedencia de la persona
    Nacionalidad: new FormControl('', Validators.required),
    Estado: new FormControl(''),
    Municipio: new FormControl(''),
    LugarFrecuenta: new FormControl(''),
    EdadMigracion: new FormControl(''),
    AnioComienzoMigracion: new FormControl(''),
    MotivoMigracion: new FormControl(''),
    LugarActual: new FormControl(''),
    LugarActualCoordenadas: new FormControl(''),
    Interacciones: new FormControl(''),
    IdGrupo: new FormControl(''),

    // Descripcion fisica
    Estatura: new FormControl(''),
    Peso: new FormControl(''),
    Lentes: new FormControl(''),
    VelloFacial: new FormControl(''),
    VelloFacialCual: new FormControl(''),
    SenialesParticulares: new FormControl(''),
    Lesiones: new FormControl(''),
    EstadoSalud: new FormControl(''),
    DescripcionPrendas: new FormControl(''),
    Imagen: new FormControl(null),

    // Situacion y datos individualizantes de la persona
    SituacionCalle: new FormControl(''),
    MigrantesMexicanas: new FormControl(''),
    TrabajadorCampo: new FormControl(''),
    DesplazadasForzadasInternas: new FormControl(''),
    MigrantesExtranjeras: new FormControl(''),
    Deportadas: new FormControl(''),
    TrabajadorHogar: new FormControl(''),
    Necesidades: new FormControl(''),
    Telefono: new FormControl(''),
    MensajeFamiliares: new FormControl(''),
    NombreQuienBusca: new FormControl(''),
    ApellidoPaternoQuienBusca: new FormControl(''),
    ApellidoMaternoQuienBusca: new FormControl(''),
    ParentescoQuienBusca: new FormControl(''),
    DireccionQuienBusca: new FormControl(''),
    TelefonoQuienBusca: new FormControl(''),
    CorreoElectronicoQuienBusca: new FormControl(''),
    OtroContactoQuienBusca: new FormControl(''),

    // Observaciones
    SaludFisica: new FormControl(''),
    SaludMental: new FormControl(''),
    Observaciones: new FormControl(''),
    // Datos del entrevistador
    FechaEntrevista: new FormControl('', Validators.required),
  })

  entrevistador = {
    Nombre: "",
    Institucion: "",
    Cargo: ""
  }

  // Variable que guarda el estado de los radio buttons
  valoresRadioButton = {
    "ViajaConIdentificacion": "",
    "OtrosIdiomas": "",
    "PuebloOriginario": "",
    "Lentes": "",
    "VelloFacial": "",
    "SituacionCalle": "",
    "MigrantesMexicanas": "",
    "TrabajadorCampo": "",
    "DesplazadasForzadasInternas": "",
    "MigrantesExtranjeras": "",
    "Deportadas": "",
    "TrabajadorHogar": ""
  }

  // Variables para mostrar la alerta con error o exito
  hayError = false;
  mensaje = "Mensaje con el error";
  exito = false;
  reiniciar = true;
  home = true;

  // Variables del mapa
  mapInteraccion;
  fisrtTimeMap = true;
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

  posicionFormulario: any;      // Variable que marca en que paso esta el formulario 
  imagenSRC: string = "";

  // Variable donde se guarda el id y el nombre del os grupos
  grupos: any;
  // Variable donde se guardan los integrantes de un grupo
  personasEnGrupo: any;

  naciones: any;
  entidades: any;
  municipios: any;

  constructor(private servicioEntrevistador: EntrevistadorService,
    private servicioGrupo: GrupoService, private http: HttpClient, private nacionesSercive: NacionesService,
    private authService: AuthService, public router: Router) { }

  /**
   * Al comienzo se obtienen los grupos, datos del entrevistador y las nacionalidades
   * Tambien comienza en el primer paso del formulario (0)
   */
  ngOnInit(): void {
    this.obtenerCargo();
    this.posicionFormulario = 0;
    this.getGrupos();
    this.getEntrevistador();
    this.getNaciones();
  }

  obtenerCargo() {
    this.authService.obtenerCargo().subscribe(res => {
      if (res[0]['Cargo'] == "ENTREVISTADOR") {
        this.router.navigate(['home'])
      }
    });
  }

  /**
   * Funcion para crear el mapa
   */
  crearMapa() {
    this.mapInteraccion = L.map("mapInteraccion").setView([37.16788748437835, -3.5993957519531254], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mapInteraccion);

    L.Control.geocoder()
      .on('markgeocode', e => {
        this.formularioInteraccion.patchValue({
          LugarActual: e.geocode.name.toUpperCase(),
          LugarActualCoordenadas: e.geocode.center.lat + ", " + e.geocode.center.lng,
          Interacciones: "COMIENZA EN  " + e.geocode.name.toUpperCase() + "."
        })
      }).addTo(this.mapInteraccion);

    if (this.formularioInteraccion.value.LugarActualCoordenadas != undefined) {
      const coordenadas = this.formularioInteraccion.value.LugarActualCoordenadas.split(', ');

      if (Number(coordenadas[0]) && Number(coordenadas[1])) {
        this.mapInteraccion.setView([coordenadas[0], coordenadas[1]], 13);
        this.layer = L.marker([coordenadas[0], coordenadas[1]], this.markerIcon).addTo(this.mapInteraccion);
      }
    }

    /* this.mapInteraccion.on("click", e => {
      //Marcar las coordenadas en el formulario
      this.formularioInteraccion.patchValue({
        LugarActual: e.latlng.lat + ", " + e.latlng.lng
      });
      // Eliminar la marca anterior
      this.layer.remove();
      // Guardar la marca y dibujarla en el mapa
      this.layer = L.marker([e.latlng.lat, e.latlng.lng], this.markerIcon).addTo(this.mapInteraccion);
    }); */
  }

  /**
   * Funcion que se llama cuando se selecciona una imagen
   * @param event Contiene la informacion de la imagen
   */
  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imagenSRC = reader.result as string;

        this.formularioInteraccion.patchValue({
          Imagen: event.target.files[0]
        })
      };
    }
  }

  /**
   * Funcion para obtener el id y nombre de los grupos
   */
  getGrupos() {
    this.servicioGrupo.getGruposCorto()
      .subscribe(grupos => {
        this.grupos = grupos;
        this.formularioInteraccion.patchValue({
          IdGrupo: "Sin grupo"
        })
      });
  }

  /**
   * Funcion que se llama cada vez que se selecciona un grupo y
   * se manda una petcion para obtener los integrantes de este
   * @param event 
   */
  onGruposChange(event) {
    this.servicioGrupo.getPersonasEnGrupo(this.formularioInteraccion.value.IdGrupo).subscribe(personas => {
      this.personasEnGrupo = personas
    })
  }

  /**
   * Funcion para obtener y guardar los datos del entrevistador
   */
  getEntrevistador(): void {
    this.servicioEntrevistador.getEntrevistador()
      .subscribe(entrevistador => {
        this.entrevistador = {
          Nombre: entrevistador[0].Nombre + " " + entrevistador[0].ApellidoPaterno + " " + entrevistador[0].ApellidoMaterno,
          Institucion: entrevistador[0].Institucion,
          Cargo: entrevistador[0].Cargo
        }
        this.formularioInteraccion.patchValue({
          LugarActual: entrevistador[0].LugarActual,
          LugarActualCoordenadas: entrevistador[0].LugarActualCoordenadas,
          Interacciones: "COMIENZA EN " + entrevistador[0].LugarActual
        });
      });
  }

  /**
   * Funcion para obtener las nacionlidades
   */
  getNaciones() {
    this.nacionesSercive.getNaciones().subscribe(n => {
      this.naciones = n;
    })
  }

  /**
   * Funcion que se llama cada vez que se selecciona una nacionalidad
   * en el select del html
   */
  onNacionesChange(event) {
    if (this.formularioInteraccion.value.Nacionalidad === "México") {
      this.nacionesSercive.getEntidades().subscribe(e => {
        this.entidades = e;
      })
    } else {
      this.formularioInteraccion.patchValue({
        Estado: "",
        Municipio: ""
      })
    }
  }

  /**
   * Funcion que se llama cada vez que cambia la entidad para mostrar los 
   * municipios de esta entidad
   */
  onEntidadesChange(event) {
    this.nacionesSercive.getMunicipios(this.formularioInteraccion.value.Estado).subscribe(m => {
      this.municipios = m;
    })
  }

  /**
   * Funcion que manda los datos del formulario a la API
   */
  enviar(): void {
    if (this.formularioInteraccion.invalid) {
      this.hayError = true;
      this.mensaje = 'Hay campos obligatorios vacíos';
      this.exito = false;
      this.reiniciar = false;
      this.home = false;
    } else {
      this.rellenarCamposRadio();
      if (this.formularioInteraccion.value.LugarActual == "") {
        this.formularioInteraccion.patchValue({
          LugarActualCoordenadas: ""
        })
      }

      if (Number(this.formularioInteraccion.value.Estado)) {
        this.formularioInteraccion.patchValue({
          Estado: this.entidades.find(ent => ent.idEntidad == this.formularioInteraccion.value.Estado).entidad
        })
      }

      const formData = new FormData();
      for (const key of Object.keys(this.formularioInteraccion.value)) {
        const value = this.formularioInteraccion.value[key];
        formData.append(key, value);
      }

      this.http.post(GlobalComponent.APIurl + "/interaccion", formData)
        .subscribe(res => {
          if (res['message'] == "Interacción añadida") {
            this.hayError = true;
            this.mensaje = "Interacción añadida con número de folio " + res['folio'];
            this.exito = true;
            this.reiniciar = true;
            this.home = true;
          } else if (res['message'] == "La interaccion existe") {
            this.hayError = true;
            this.mensaje = "Esta persona está registrada con el folio: " + res['folio'];
            this.exito = false;
            this.reiniciar = true;
            this.home = true;
          } else {
            this.hayError = true;
            this.mensaje = 'Se ha producido un error';
            this.exito = false;
            this.reiniciar = false;
            this.home = false;
          }
        })
    }
  }

  /**
   *  Funcion para cambiar a otro paso del formulario
   * @param siguientePaso Numero del paso objetivo
   */
  async cambiarPasoFormulario(siguientePaso) {
    this.posicionFormulario = siguientePaso;
    // Esta espera es necesaria ya que a la hora de crear el mapa, no le da tiempo al html a mostrar 
    // el div con "mapInteraccion" y en la función crearMapa no la encuentra y produce un error
    await this.delay(1);

    if (siguientePaso == 1) {
      if (this.fisrtTimeMap) {
        this.crearMapa()
        this.fisrtTimeMap = false;
      }
    }
  }

  /**
   * Funcion para avanzar o retroceder en el formulario
   * @param avanzar Si es verdadera avanza, de lo contrario retrocede
   */
  async botonSiguienteRetrocer(avanzar) {
    if (avanzar) {
      this.posicionFormulario++;
    } else {
      this.posicionFormulario--;
    }

    // Esta espera es necesaria ya que a la hora de crear el mapa, no le da tiempo al html a mostrar 
    // el div con "mapInteraccion" y en la función crearMapa no la encuentra y produce un error
    await this.delay(1);

    if (this.posicionFormulario == 1) {
      if (this.fisrtTimeMap) {
        this.crearMapa()
        this.fisrtTimeMap = false;
      }
    }
  }

  /**
   * Funcion para detener la ejecucion un tiempo
   * @param ms Tiempo en milisegundos
   * @returns 
   */
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Funcion que se llama cada vez que se pulsa un radio button del formulario
   * @param event 
   */
  onChange(event) {
    if (event.target.value == "Sí") {
      this.valoresRadioButton[event.target.name] = "SÍ"
    } else if (event.target.value == "No") {
      this.valoresRadioButton[event.target.name] = "NO"
    }
  }

  /**
   * Funcion que rellena el valor de los radio buttons en 
   * los campos del formulario
   */
  rellenarCamposRadio() {
    this.formularioInteraccion.patchValue({
      ViajaConIdentificacion: this.valoresRadioButton.ViajaConIdentificacion,
      OtrosIdiomas: this.valoresRadioButton.OtrosIdiomas,
      PuebloOriginario: this.valoresRadioButton.PuebloOriginario,
      Lentes: this.valoresRadioButton.Lentes,
      VelloFacial: this.valoresRadioButton.VelloFacial,
      SituacionCalle: this.valoresRadioButton.SituacionCalle,
      MigrantesMexicanas: this.valoresRadioButton.MigrantesMexicanas,
      TrabajadorCampo: this.valoresRadioButton.TrabajadorCampo,
      DesplazadasForzadasInternas: this.valoresRadioButton.DesplazadasForzadasInternas,
      MigrantesExtranjeras: this.valoresRadioButton.MigrantesExtranjeras,
      Deportadas: this.valoresRadioButton.Deportadas,
      TrabajadorHogar: this.valoresRadioButton.TrabajadorHogar
    });
  }

  onMessageClose() {
    this.hayError = false;
    this.mensaje = '';
    this.exito = false;
    this.reiniciar = true;
    this.home = true;
  }
}
