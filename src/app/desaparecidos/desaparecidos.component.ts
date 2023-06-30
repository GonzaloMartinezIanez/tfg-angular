import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from "leaflet";
import { EntrevistadorService } from '../entrevistador.service';
import { GlobalComponent } from '../global-component';
import { NacionesService } from '../naciones.service';
//import "leaflet/dist/leaflet.css";

@Component({
  selector: 'app-desaparecidos',
  templateUrl: './desaparecidos.component.html',
  styleUrls: ['./desaparecidos.component.css']
})
export class DesaparecidosComponent implements OnInit {
  formularioDesaparecidos = new FormGroup({
    // Datos de la entrevista
    FolioInstitucion: new FormControl(''),
    FolioRNPDNO: new FormControl(''),
    FechaEntrevista: new FormControl(''),

    // Datos de la persona
    Nombre: new FormControl('', Validators.required),
    ApellidoPaterno: new FormControl('', Validators.required),
    ApellidoMaterno: new FormControl('', Validators.required),
    NombreSocial: new FormControl(''),
    Alias: new FormControl(''),
    NacionalidadAlias: new FormControl(''),
    Sexo: new FormControl(''),
    FechaNacimiento: new FormControl('', Validators.required),
    Nacionalidad: new FormControl('', Validators.required),
    EstadoCivil: new FormControl(''),
    ViajaConIdentificacion: new FormControl(''),
    ViajaConIdentificacionCual: new FormControl(''),
    UltimoDomicilio: new FormControl(''),
    IdiomaMaterno: new FormControl(''),
    HablaEspañol: new FormControl(''),
    OtrosIdiomas: new FormControl(''),
    OtrosIdiomasCual: new FormControl(''),
    PuebloOriginario: new FormControl(''),
    PuebloOriginarioCual: new FormControl(''),
    Afrodescendiente: new FormControl(''),
    IdiomaPadresAbuelos: new FormControl(''),
    IdiomaPadresAbuelosCual: new FormControl(''),
    SexoIdentifica: new FormControl(''),
    OrientacionSexual: new FormControl(''),
    OrientacionSexualCual: new FormControl(''),
    Profesion: new FormControl(''),
    EdadMigracion: new FormControl(''),
    AñoComienzoMigracion: new FormControl(''),
    MotivoMigracion: new FormControl(''),
    NumeroMigraciones: new FormControl(''),

    // Relato de la desaparición
    RelatoDesaparicion: new FormControl(''),
    PaisPerdidaContacto: new FormControl(''),
    PaisPerdidaContactoCual: new FormControl(''),
    MunicipioPerdidaContacto: new FormControl(''),
    LugarCrucePretendia: new FormControl(''),
    LugarCruceConfirmado: new FormControl(''),
    PaisObjetivo: new FormControl(''),
    EstadoObjetivo: new FormControl(''),
    MunicipioObjetivo: new FormControl(''),
    FechaUltimaComunicacion: new FormControl(''),
    PersonaUltimaComunicacion: new FormControl(''),
    DeportadaAnteriormente: new FormControl(''),
    PaisDeportacion: new FormControl(''),
    FechaUltimaDeportacion: new FormControl(''),
    Encarcelado: new FormControl(''),
    UbicacionCarcel: new FormControl(''),
    FechaDetencion: new FormControl(''),
    IdentificacionDetencionEEUU: new FormControl(''),
    PapelesFalsos: new FormControl(''),
    PapelesFalsosCual: new FormControl(''),
    AcompañantesViaje: new FormControl(''),
    ConocidosEnExtranjero: new FormControl(''),

    // Descripción física
    Estatura: new FormControl(''),
    Peso: new FormControl(''),
    Complexion: new FormControl(''),
    ColorPiel: new FormControl(''),
    VelloFacial: new FormControl(''),
    VelloFacialCual: new FormControl(''),
    Lentes: new FormControl(''),
    Cabello: new FormControl(''),
    Embarazada: new FormControl(''),
    MesesEmbarazo: new FormControl(''),
    NumeroCelular: new FormControl(''),
    SeñalesParticulares: new FormControl(''),
    Lesiones: new FormControl(''),
    TipoDientes: new FormControl(''),
    EstadoSalud: new FormControl(''),
    DescripcionPrendas: new FormControl(''),
    RedesSociales: new FormControl(''),
    Imagen: new FormControl(null),

    // Datos de quien busca
    HayDenuncia: new FormControl(''),
    HayDenunciaCual: new FormControl(''),
    HayReporte: new FormControl(''),
    HayReporteCual: new FormControl(''),
    AvancesDenuncia: new FormControl(''),
    AvancesDenunciaCual: new FormControl(''),
    LugaresBusqueda: new FormControl(''),
    NombreQuienBusca: new FormControl(''),
    ApellidoPaternoQuienBusca: new FormControl(''),
    ApellidoMaternoQuienBusca: new FormControl(''),
    ParentescoQuienBusca: new FormControl(''),
    DireccionQuienBusca: new FormControl(''),
    TelefonoQuienBusca: new FormControl(''),
    CorreoElectronicoQuienBusca: new FormControl(''),
    MensajeQuienBusca: new FormControl(''),
    InformacionUsadaPara: new FormControl('', Validators.required),
    InformacionPublica: new FormControl('', Validators.required),
    Entrevistador: new FormControl(''),
    Institucion: new FormControl('', Validators.required),
    Cargo: new FormControl('')
  })

  posicionFormulario: any;
  imagenSRC: string = "";

  valoresRadioButton = {
    "ViajaConIdentificacion": "",
    "HablaEspañol": "",
    "OtrosIdiomas": "",
    "PuebloOriginario": "",
    "Afrodescendiente": "",
    "IdiomaPadresAbuelos": "",    
    "OrientacionSexual": "",
    "PaisPerdidaContacto": "",
    "DeportadaAnteriormente": "",
    "Encarcelado":"",
    "PapelesFalsos": "",
    "VelloFacial": "",
    "Lentes":"",
    "Embarazada":"",
    "HayDenuncia": "",
    "HayReporte": "",
    "AvancesDenuncia": "",
    "InformacionPublica": "",
  }

  naciones: any;
  entidades: any;
  municipios: any;

  constructor(private servicioEntrevistador: EntrevistadorService,
    private http: HttpClient, private nacionesSercive: NacionesService) { }

  ngOnInit(): void {
    this.getEntrevistador();
    this.posicionFormulario = 0;
    this.getNaciones();
  }

  getEntrevistador(): void {
    this.servicioEntrevistador.getEntrevistador()
      .subscribe(entrevistador => {
        this.formularioDesaparecidos.patchValue({
          Entrevistador: entrevistador[0].Nombre + " " + entrevistador[0].ApellidoPaterno + " " + entrevistador[0].ApellidoMaterno,
          Institucion: entrevistador[0].Institucion,
          Cargo: entrevistador[0].Cargo,
        });
      });
  }

  getNaciones() {
    this.nacionesSercive.getNaciones().subscribe(n => {
      this.naciones = n;
    })
  }

  onNacionesChange(event) {
    if (this.formularioDesaparecidos.value.PaisObjetivo === "MEXICANA") {
      this.nacionesSercive.getEntidades().subscribe(e => {
        this.entidades = e;
      })
    }
  }

  onEntidadesChange(event) {
    this.nacionesSercive.getMunicipios(this.formularioDesaparecidos.value.EstadoObjetivo).subscribe(m => {
      this.municipios = m;
    })
  }

  enviar(): void {
    let valores = this.rellenarCamposRadio();

    if (Number(this.formularioDesaparecidos.value.EstadoObjetivo)) {
      this.formularioDesaparecidos.patchValue({
        EstadoObjetivo: this.entidades.find(ent => ent.idEntidad == this.formularioDesaparecidos.value.EstadoObjetivo).entidad
      })
    }

    const formData = new FormData();
    for (const key of Object.keys(this.formularioDesaparecidos.value)) {
      const value = this.formularioDesaparecidos.value[key];
      formData.append(key, value);
    }

    this.http.post(GlobalComponent.APIurl + "/desaparecidos", formData)
      .subscribe(res => {
        console.log(res)
        if (res['message'] == "Persona desaparecida añadida") {
          alert("Persona desaparecida añadida")
        }
      })
  }

   rellenarCamposRadio(){
    this.formularioDesaparecidos.patchValue({
      ViajaConIdentificacion: this.valoresRadioButton.ViajaConIdentificacion,
      HablaEspañol: this.valoresRadioButton.HablaEspañol,
      OtrosIdiomas: this.valoresRadioButton.OtrosIdiomas,
      PuebloOriginario: this.valoresRadioButton.PuebloOriginario,
      Afrodescendiente: this.valoresRadioButton.Afrodescendiente,
      IdiomaPadresAbuelos: this.valoresRadioButton.IdiomaPadresAbuelos,
      OrientacionSexual: this.valoresRadioButton.OrientacionSexual,
      PaisPerdidaContacto: this.valoresRadioButton.PaisPerdidaContacto,
      DeportadaAnteriormente: this.valoresRadioButton.DeportadaAnteriormente,
      Encarcelado: this.valoresRadioButton.Encarcelado,
      PapelesFalsos: this.valoresRadioButton.PapelesFalsos,
      VelloFacial: this.valoresRadioButton.VelloFacial,
      Lentes: this.valoresRadioButton.Lentes,
      Embarazada: this.valoresRadioButton.Embarazada,
      HayDenuncia: this.valoresRadioButton.HayDenuncia,
      HayReporte: this.valoresRadioButton.HayReporte,
      AvancesDenuncia: this.valoresRadioButton.AvancesDenuncia,
      InformacionPublica: this.valoresRadioButton.InformacionPublica
    })
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imagenSRC = reader.result as string;

        this.formularioDesaparecidos.patchValue({
          Imagen: event.target.files[0]
        })
      };
    }
  }

  cambiarPasoFormulario(siguientePaso) {
    this.posicionFormulario = siguientePaso;
  }

  botonSiguienteRetrocer(avanzar) {
    if (avanzar) {
      this.posicionFormulario++;
    } else{
      this.posicionFormulario--;
    }
  }

  onChange(event) {
    if (event.target.value == "Sí") {
      this.valoresRadioButton[event.target.name] = "Sí"
    } else if(event.target.value == "No"){
      this.valoresRadioButton[event.target.name] = "No"
    } else if((event.target.value == "Otro")){
      this.valoresRadioButton[event.target.name] = "Otro"
    }

    if(event.target.name == "InformacionPublica"){
      this.formularioDesaparecidos.patchValue({
        InformacionPublica: event.target.value
      });
    }
  }
}