import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from "leaflet";
import { EntrevistadorService } from '../entrevistador.service';
//import "leaflet/dist/leaflet.css";

@Component({
  selector: 'app-desaparecidos',
  templateUrl: './desaparecidos.component.html',
  styleUrls: ['./desaparecidos.component.css']
})
export class DesaparecidosComponent implements OnInit {
  formularioDesaparecidos = new FormGroup({
    // Datos de la entrevista
    Folio: new FormControl(''),
    FolioInstitucion: new FormControl(''),
    FolioRNPDNO: new FormControl(''),
    FechaEntrevista: new FormControl(''),

    // Datos de la persona
    Nombre: new FormControl(''),
    ApellidoPaterno: new FormControl(''),
    ApellidoMaterno: new FormControl(''),
    NombreSocial: new FormControl(''),
    Alias: new FormControl(''),
    NacionalidadAlias: new FormControl(''),
    Sexo: new FormControl(''),
    FechaNacimiento: new FormControl(''),
    Nacionalidad: new FormControl(''),
    EstadoCivil: new FormControl(''),
    ViajaConIdentificacion: new FormControl(''),
    UltimoDomicilio: new FormControl(''),
    IdiomaMaterno: new FormControl(''),
    HablaEspañol: new FormControl(''),
    OtrosIdiomas: new FormControl(''),
    PuebloOriginario: new FormControl(''),
    Afrodescendiente: new FormControl(''),
    IdiomaPadresAbuelos: new FormControl(''),
    SexoIdentifica: new FormControl(''),
    OrientacionSexual: new FormControl(''),
    Profesion: new FormControl(''),
    EdadMigracion: new FormControl(''),
    AñoComienzoMigracion: new FormControl(''),
    MotivoMigracion: new FormControl(''),
    NumeroMigraciones: new FormControl(''),

    // Relato de la desaparición
    RelatoDesaparicion: new FormControl(''),
    PaisPerdidaContacto: new FormControl(''),
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
    AcompañantesViaje: new FormControl(''),
    ConocidosEnExtranjero: new FormControl(''),

    // Descripción física
    Estatura: new FormControl(''),
    Peso: new FormControl(''),
    Complexion: new FormControl(''),
    ColorPiel: new FormControl(''),
    VelloFacial: new FormControl(''),
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
    HayReporte: new FormControl(''),
    AvancesDenuncia: new FormControl(''),
    LugaresBusqueda: new FormControl(''),
    NombreQuienBusca: new FormControl(''),
    ApellidoPaternoQuienBusca: new FormControl(''),
    ApellidoMaternoQuienBusca: new FormControl(''),
    ParentescoQuienBusca: new FormControl(''),
    DireccionQuienBusca: new FormControl(''),
    TelefonoQuienBusca: new FormControl(''),
    CorreoElectronicoQuienBusca: new FormControl(''),
    MensajeQuienBusca: new FormControl(''),
    InformacionUsadaPara: new FormControl(''),
    InformacionPublica: new FormControl(''),
    Entrevistador: new FormControl(''),
    Institucion: new FormControl(''),
    Cargo: new FormControl('')

    /* // Datos de la entrevista
    Folio: new FormControl('', Validators.required),
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
    UltimoDomicilio: new FormControl(''),
    IdiomaMaterno: new FormControl(''),
    HablaEspañol: new FormControl(''),
    OtrosIdiomas: new FormControl(''),
    PuebloOriginario: new FormControl(''),
    Afrodescendiente: new FormControl(''),
    IdiomaPadresAbuelos: new FormControl(''),
    SexoIdentifica: new FormControl(''),
    OrientacionSexual: new FormControl(''),
    Profesion: new FormControl(''),
    EdadMigracion: new FormControl(''),
    AñoComienzoMigracion: new FormControl(''),
    MotivoMigracion: new FormControl(''),
    NumeroMigraciones: new FormControl(''),

    // Relato de la desaparición
    RelatoDesaparicion: new FormControl(''),
    PaisPerdidaContacto: new FormControl(''),
    MunicipioPerdidaContacto: new FormControl(''),
    LugarCrucePretendia: new FormControl(''),
    LugarCruceConfirmado: new FormControl(''),
    PaisObjetivo: new FormControl(''),
    EstadoObjetivo: new FormControl(''),
    MunicipioObjetivo: new FormControl(''),
    FechaUltimaComunicacion: new FormControl(''),
    PersonaUltimaComunicacion: new FormControl(''),
    DeportadaAnteriormente: new FormControl(false),
    PaisDeportacion: new FormControl(''),
    FechaUltimaDeportacion: new FormControl(''),
    Encarcelado: new FormControl(false),
    UbicacionCarcel: new FormControl(''),
    FechaDetencion: new FormControl(''),
    IdentificacionDetencionEEUU: new FormControl(''),
    PapelesFalsos: new FormControl(''),
    AcompañantesViaje: new FormControl(''),
    ConocidosEnExtranjero: new FormControl(''),

    // Descripción física
    Estatura: new FormControl(''),
    Peso: new FormControl(''),
    Complexion: new FormControl(''),
    ColorPiel: new FormControl(''),
    VelloFacial: new FormControl(''),
    Lentes: new FormControl(''),
    Cabello: new FormControl(''),
    Embarazada: new FormControl(false),
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
    HayReporte: new FormControl(''),
    AvancesDenuncia: new FormControl(''),
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
    Cargo: new FormControl('') */
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

  constructor(private servicioEntrevistador: EntrevistadorService,
    private http: HttpClient) { }

  ngOnInit(): void {
    //this.getEntrevistadorId("1");
    this.posicionFormulario = 0
  }

  getEntrevistadorId(id: string): void {
    this.servicioEntrevistador.getEntrevistadorId(id)
      .subscribe(entrevistador => {
        this.formularioDesaparecidos.patchValue({
          Entrevistador: entrevistador[0].Nombre,
          Institucion: entrevistador[0].Institucion,
        });
      });
  }

  enviar(): void {
    let valores = this.rellenarCamposRadio()
    console.log(valores)
    // Enviar estos valores
  }

  rellenarCamposRadio(){
    let valores = this.formularioDesaparecidos.value; 

    if(this.valoresRadioButton.ViajaConIdentificacion == "Sí" && this.formularioDesaparecidos.value.ViajaConIdentificacion != ""){
      valores['ViajaConIdentificacion'] = this.formularioDesaparecidos.value.ViajaConIdentificacion
    } else{
      valores['ViajaConIdentificacion'] = this.valoresRadioButton.ViajaConIdentificacion
    }

    if(this.valoresRadioButton.OtrosIdiomas == "Sí" && this.formularioDesaparecidos.value.OtrosIdiomas != ""){
      valores['OtrosIdiomas'] = this.formularioDesaparecidos.value.OtrosIdiomas
    } else{
      valores['OtrosIdiomas'] = this.valoresRadioButton.OtrosIdiomas
    }

    if(this.valoresRadioButton.PuebloOriginario == "Sí" && this.formularioDesaparecidos.value.PuebloOriginario != ""){
      valores['PuebloOriginario'] = this.formularioDesaparecidos.value.PuebloOriginario
    } else{
      valores['PuebloOriginario'] = this.valoresRadioButton.PuebloOriginario
    }

    if(this.valoresRadioButton.IdiomaPadresAbuelos == "Sí" && this.formularioDesaparecidos.value.IdiomaPadresAbuelos != ""){
      valores['IdiomaPadresAbuelos'] = this.formularioDesaparecidos.value.IdiomaPadresAbuelos
    } else{
      valores['IdiomaPadresAbuelos'] = this.valoresRadioButton.IdiomaPadresAbuelos
    }

    if(this.valoresRadioButton.OrientacionSexual == "Otro" && this.formularioDesaparecidos.value.OrientacionSexual != ""){
      valores['OrientacionSexual'] = this.formularioDesaparecidos.value.OrientacionSexual
    } else{
      valores['OrientacionSexual'] = this.valoresRadioButton.OrientacionSexual
    }

    if(this.valoresRadioButton.PaisPerdidaContacto == "Otro" && this.formularioDesaparecidos.value.PaisPerdidaContacto != ""){
      valores['PaisPerdidaContacto'] = this.formularioDesaparecidos.value.PaisPerdidaContacto
    } else{
      valores['PaisPerdidaContacto'] = this.valoresRadioButton.PaisPerdidaContacto
    } 

    if(this.valoresRadioButton.PapelesFalsos == "Sí" && this.formularioDesaparecidos.value.PapelesFalsos != ""){
      valores['PapelesFalsos'] = this.formularioDesaparecidos.value.PapelesFalsos
    } else{
      valores['PapelesFalsos'] = this.valoresRadioButton.PapelesFalsos
    }

    if(this.valoresRadioButton.VelloFacial == "Sí" && this.formularioDesaparecidos.value.VelloFacial != ""){
      valores['VelloFacial'] = this.formularioDesaparecidos.value.VelloFacial
    } else{
      valores['VelloFacial'] = this.valoresRadioButton.VelloFacial
    }

    if(this.valoresRadioButton.HayDenuncia == "Sí" && this.formularioDesaparecidos.value.HayDenuncia != ""){
      valores['HayDenuncia'] = this.formularioDesaparecidos.value.HayDenuncia
    } else{
      valores['HayDenuncia'] = this.valoresRadioButton.HayDenuncia
    }

    if(this.valoresRadioButton.HayReporte == "Sí" && this.formularioDesaparecidos.value.HayReporte != ""){
      valores['HayReporte'] = this.formularioDesaparecidos.value.HayReporte
    } else{
      valores['HayReporte'] = this.valoresRadioButton.HayReporte
    }

    if(this.valoresRadioButton.AvancesDenuncia == "Sí" && this.formularioDesaparecidos.value.AvancesDenuncia != ""){
      valores['AvancesDenuncia'] = this.formularioDesaparecidos.value.AvancesDenuncia
    } else{
      valores['AvancesDenuncia'] = this.valoresRadioButton.AvancesDenuncia
    }

    valores['InformacionPublica'] = this.valoresRadioButton.InformacionPublica
    valores['HablaEspañol'] = this.valoresRadioButton.HablaEspañol
    valores['Afrodescendiente'] = this.valoresRadioButton.Afrodescendiente
    valores['DeportadaAnteriormente'] = this.valoresRadioButton.DeportadaAnteriormente
    valores['Encarcelado'] = this.valoresRadioButton.Encarcelado
    valores['Lentes'] = this.valoresRadioButton.Lentes
    valores['Embarazada'] = this.valoresRadioButton.Embarazada

    return valores
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imagenSRC = reader.result as string;

        this.formularioDesaparecidos.patchValue({
          Imagen: reader.result
        });
      };
    }
  }

  async cambiarPasoFormulario(siguientePaso) {
    this.posicionFormulario = siguientePaso;
  }

  onChange(event) {
    if (event.target.value == "Sí") {
      this.valoresRadioButton[event.target.name] = "Sí"
    } else if(event.target.value == "No"){
      this.valoresRadioButton[event.target.name] = "No"
    } else if((event.target.value == "Otro")){
      this.valoresRadioButton[event.target.name] = "Otro"
    }

  }
}