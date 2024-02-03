import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InteraccionService } from '../servicios/interaccion.service';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global-component';

import DataGridXL from "@datagridxl/datagridxl2";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EntrevistadorService } from '../servicios/entrevistador.service';
import { GrupoService } from '../servicios/grupo.service';


@Component({
  selector: 'app-ver-interaccion',
  templateUrl: './ver-interaccion.component.html',
  styleUrls: ['./ver-interaccion.component.css']
})
export class VerInteraccionComponent implements OnInit {
  @ViewChild('content1', { static: false }) content1: ElementRef;
  @ViewChild('content2', { static: false }) content2: ElementRef;
  @ViewChild('content3', { static: false }) content3: ElementRef;

  campoSeleccionado = false;

  campo = "";
  valorTexto = "";
  valorFechaInicio = "";
  valorFechaFin = "";

  campoTextoSeleccionado = false;
  campoTextoMinusculaSeleccionado = false;
  campoNumeroSeleccionado = false;
  campoBooleanoSeleccionado = false;
  campoFechaSeleccionado = false;
  campoEstadoSaludSeleccionado = false;
  campoSexoSeleccionado = false;

  imagenURL: any;
  estaEnGrupo = false;
  interaccion: any = {
    IdInteraccion: "",
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    NombreSocial: "",
    FechaNacimiento: "",
    Edad: "",
    Sexo: "",
    ViajaConIdentificacion: "",
    ViajaConIdentificacionCual: "",
    OtrosIdiomas: "",
    OtrosIdiomasCual: "",
    PuebloOriginario: "",
    PuebloOriginarioCual: "",
    Profesion: "",

    Nacionalidad: "",
    Estado: "",
    Municipio: "",
    LugarFrecuenta: "",
    EdadMigracion: "",
    AnioComienzoMigracion: "",
    MotivoMigracion: "",
    LugarActual: "",
    LugarActualCoordenadas: "",
    Interacciones: "",
    IdGrupo: "",

    Estatura: "",
    Peso: "",
    Lentes: "",
    VelloFacial: "",
    VelloFacialCual: "",
    SenialesParticulares: "",
    Lesiones: "",
    EstadoSalud: "",
    DescripcionPrendas: "",
    Imagen: "",

    SituacionCalle: "",
    MigrantesMexicanas: "",
    TrabajadorCampo: "",
    DesplazadasForzadasInternas: "",
    MigrantesExtranjeras: "",
    Deportadas: "",
    TrabajadorHogar: "",
    Necesidades: "",
    Telefono: "",
    MensajeFamiliares: "",
    NombreQuienBusca: "",
    ApellidoPaternoQuienBusca: "",
    ApellidoMaternoQuienBusca: "",
    ParentescoQuienBusca: "",
    DireccionQuienBusca: "",
    TelefonoQuienBusca: "",
    CorreoElectronicoQuienBusca: "",
    OtroContactoQuienBusca: "",

    SaludFisica: "",
    SaludMental: "",
    Observaciones: "",
    FechaEntrevista: "",
    IdEntrevistador: "",
    Entrevistador: "",
    NombreGrupo: ""
  }

  @ViewChild("grid") grid: ElementRef;
  gridInstance: any;    // Variable donde se crea la tabla
  interacciones: any;   // Variable donde se guardan los registros

  constructor(private servicioInteraccion: InteraccionService, private servicioEntrevistadores: EntrevistadorService, private servicioGrupo: GrupoService, private http: HttpClient) {
  }

  /**
  * Al principio de la ejecucion se limpia la tabla, y se espera 
  * a que se obtengan los registros
  */
  ngOnInit(): void {
    this.clear();
  }

  getTodasInteracciones() {
    this.servicioInteraccion.getInteracciones()
      .subscribe(i => {
        this.crearTabla(i)
      })
  }

  /**
   * Funcion para descargar la tabla en formato csv
   */
  download() {
    this.gridInstance.downloadDataAsCSV();
  }

  async downloadpdf() {
    /* const content = this.pdf.nativeElement;

    html2canvas(content, { scale: 1}).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Captura la imagen como base64

      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
      pdf.save('documento.pdf');
    }); */
    const pdf = new jsPDF();

    const imgData1 = await this.captureContentToImage(this.content1.nativeElement);
    const imgData2 = await this.captureContentToImage(this.content2.nativeElement);
    const imgData3 = await this.captureContentToImage(this.content3.nativeElement);

    pdf.addImage(imgData1, 'PNG', 10, 10, 190, 0);
    pdf.addPage();
    pdf.addImage(imgData2, 'PNG', 10, 10, 190, 0);
    pdf.addPage();
    pdf.addImage(imgData3, 'PNG', 10, 10, 190, 0);

    pdf.save('documento.pdf');
  }

  private async captureContentToImage(content: HTMLElement): Promise<string> {
    const canvas = await html2canvas(content);
    return canvas.toDataURL('image/png');
  }

  /**
    * Funcion que envia a la API una peticion con los campos y
    * contenidos por los que filtrar
    */
  busqueda() {
    if (!this.campoFechaSeleccionado) {
      // Datos que requieren que sea la búsqueda sea exacta
      if (this.campoNumeroSeleccionado || this.campoBooleanoSeleccionado || this.campoEstadoSaludSeleccionado || this.campoSexoSeleccionado || this.campo == "IdInteraccion" || this.campo == "Telefono") {
        const datos = {
          "tipoCampo": "textoConcreto",
          "campo": this.campo,
          "valor": this.valorTexto
        }
        this.servicioInteraccion.getInteraccionCampo(datos).subscribe(res => {
          this.crearTabla(res)
        });
        // Tipo de búsqueda en la que se filtrarán datos que contengan la cadena
      } else {
        const datos = {
          "tipoCampo": "texto",
          "campo": this.campo,
          "valor": this.valorTexto
        }
        this.servicioInteraccion.getInteraccionCampo(datos).subscribe(res => {
          this.crearTabla(res)
        });
      }
    } else {
      const datos = {
        "tipoCampo": "fecha",
        "campo": this.campo,
        "valorFechaInicio": this.valorFechaInicio,
        "valorFechaFin": this.valorFechaFin
      }
      this.servicioInteraccion.getInteraccionCampo(datos).subscribe(res => {
        this.crearTabla(res)
      });;
    }
  }

  reiniciarCampos() {
    this.campoTextoSeleccionado = false;
    this.campoTextoMinusculaSeleccionado = false;
    this.campoNumeroSeleccionado = false;
    this.campoBooleanoSeleccionado = false;
    this.campoFechaSeleccionado = false;
    this.campoEstadoSaludSeleccionado = false;
    this.campoSexoSeleccionado = false;

    /* this.valorTexto = ""; */
    this.valorFechaInicio = "";
    this.valorFechaFin = "";
  }

  onSelectChange($event) {
    this.reiniciarCampos()
    if (!this.campoSeleccionado) {
      this.campoSeleccionado = true;
    }
    switch (this.campo) {
      case "IdInteraccion": this.campoTextoMinusculaSeleccionado = true; break;
      case "FechaEntrevista": this.campoFechaSeleccionado = true; break;
      case "Nombre": this.campoTextoSeleccionado = true; break;
      case "ApellidoPaterno": this.campoTextoSeleccionado = true; break;
      case "ApellidoMaterno": this.campoTextoSeleccionado = true; break;
      case "NombreSocial": this.campoTextoSeleccionado = true; break;
      case "FechaNacimiento": this.campoFechaSeleccionado = true; break;
      case "Edad": this.campoNumeroSeleccionado = true; break;
      case "Sexo": this.campoSexoSeleccionado = true; break;
      case "Nacionalidad": this.campoTextoSeleccionado = true; break;
      case "Estado": this.campoTextoSeleccionado = true; break;
      case "Municipio": this.campoTextoSeleccionado = true; break;
      case "ViajaConIdentificacion": this.campoBooleanoSeleccionado = true; break;
      case "OtrosIdiomas": this.campoBooleanoSeleccionado = true; break;
      case "Profesion": this.campoTextoSeleccionado = true; break;
      case "Telefono": this.campoTextoMinusculaSeleccionado = true; break;
      case "SituacionCalle": this.campoBooleanoSeleccionado = true; break;
      case "MigrantesMexicanas": this.campoBooleanoSeleccionado = true; break;
      case "TrabajadorCampo": this.campoBooleanoSeleccionado = true; break;
      case "DesplazadasForzadasInternas": this.campoBooleanoSeleccionado = true; break;
      case "MigrantesExtranjeras": this.campoBooleanoSeleccionado = true; break;
      case "Deportadas": this.campoBooleanoSeleccionado = true; break;
      case "TrabajadorHogar": this.campoBooleanoSeleccionado = true; break;
      case "SaludFisica": this.campoEstadoSaludSeleccionado = true; break;
      case "SaludMental": this.campoEstadoSaludSeleccionado = true; break;
      default: break;
    }

    if (!this.campoBooleanoSeleccionado) {
      this.valorTexto = "";
    }
  }

  normalizarTabla(interacciones) {
    var arrayInteracciones = interacciones.map(i => Object.values(i))
    arrayInteracciones.forEach((i) => {
      if (i[5] != "-")
        i[5] = i[5].split("T")[0].split("-").reverse().join("-");

      if (i[56] != "-")
        i[56] = i[56].split("T")[0].split("-").reverse().join("-") + " " + i[56].split("T")[1].slice(0, 5)
    })
    return arrayInteracciones
  }
  /**
   * Funcion para crear la tabla
   * @param interacciones Datos con los registros
   */
  crearTabla(interacciones) {
    this.gridInstance = new DataGridXL("grid", {
      data: this.normalizarTabla(interacciones),
      frozenCols: 4,
      allowEditCells: false,
      allowFillCells: false,
      allowInsertRows: false,
      allowDeleteRows: false,
      allowInsertCols: false,
      allowDeleteCols: false,
      allowCut: false,
      allowPaste: false,
      allowCopy: false,
      allowHideCols: true,
      columns: [
        {
          title: "Folio",
          source: 0
        },
        {
          title: "Nombre",
          source: 1
        },
        {
          title: "Apellido Paterno",
          source: 2
        },
        {
          title: "Apellido Materno",
          source: 3
        },
        {
          title: "Fecha de la entrevista",
          source: 56
        },
        {
          title: "Nombre social",
          source: 4
        },
        {
          title: "Fecha de nacimiento",
          source: 5
        },
        {
          title: "Edad",
          source: 6
        },
        {
          title: "Viaja con identificación",
          source: 7
        },
        {
          title: "Número de identificación",
          source: 8
        },
        {
          title: "Habla otros idiomas",
          source: 9
        },
        {
          title: "Idiomas",
          source: 10
        },
        {
          title: "Pertenece a un pueblo originario",
          source: 11
        },
        {
          title: "Pueblo originario",
          source: 12
        },
        {
          title: "Profesión",
          source: 13
        },
        {
          title: "Sexo",
          source: 14
        },
        {
          title: "Nacionalidad",
          source: 15
        },
        {
          title: "Estado",
          source: 16
        },
        {
          title: "Municipio",
          source: 17
        },
        {
          title: "Lugar que frecuenta",
          source: 18
        },
        {
          title: "Edad de migración",
          source: 19
        },
        {
          title: "Año de comienzo de migración",
          source: 20
        },
        {
          title: "Motivo de la migración",
          source: 21
        },
        {
          title: "Lugar actual",
          source: 22
        },
        {
          title: "Coordenadas",
          source: 23
        },
        {
          title: "Interacciones",
          source: 24
        },
        {
          title: "Estatura",
          source: 25
        },
        {
          title: "Peso",
          source: 26
        },
        {
          title: "Lentes",
          source: 27
        },
        {
          title: "Vello facial",
          source: 28
        },
        {
          title: "¿Qué tipo de vello facial?",
          source: 29
        },
        {
          title: "Señales particulares",
          source: 30
        },
        {
          title: "Lesiones",
          source: 31
        },
        {
          title: "Estado de salud",
          source: 32
        },
        {
          title: "Descripcion de las prendas",
          source: 33
        },
        /* {
          title: "Imagen",
          source: 34
        }, */
        {
          title: "En situación de calle",
          source: 35
        },
        {
          title: "Migrante Mexicana",
          source: 36
        },
        {
          title: "Trabajador de campo",
          source: 37
        },
        {
          title: "Desplazada forzada interna",
          source: 38
        },
        {
          title: "Migrante extranjera",
          source: 39
        },
        {
          title: "Deportada",
          source: 40
        },
        {
          title: "Trabajadora de hogar",
          source: 41
        },
        {
          title: "Necesidades",
          source: 42
        },
        {
          title: "Número de teléfono",
          source: 43
        },
        {
          title: "Mensaje a familiares",
          source: 44
        },
        {
          title: "Nombre del pariente",
          source: 45
        },
        {
          title: "Apellido paterno del pariente",
          source: 46
        },
        {
          title: "Apellido materno del pariente",
          source: 47
        },
        {
          title: "Parentesco",
          source: 48
        },
        {
          title: "Dirección del pariente",
          source: 49
        },
        {
          title: "Telefono del pariente",
          source: 50
        },
        {
          title: "Correo electrñonico del pariente",
          source: 51
        },
        {
          title: "Otro contacto del pariente",
          source: 52
        },
        {
          title: "Salud física",
          source: 53
        },
        {
          title: "Salud mental",
          source: 54
        },
        {
          title: "Observaciones",
          source: 55
        }
      ]
    });

    this.gridInstance.events.on('setselection', gridEvent => {
      this.interaccion = interacciones[gridEvent.cellCursorPosition.y]

      if (this.interaccion['FechaNacimiento'].length == 24 || this.interaccion['FechaEntrevista'].length == 24) {
        this.interaccion['FechaNacimiento'] = this.interaccion['FechaNacimiento'].split("T")[0].split("-").reverse().join("-")
        this.interaccion['FechaEntrevista'] = this.interaccion['FechaEntrevista'].split("T")[0].split("-").reverse().join("-") + " " + this.interaccion['FechaEntrevista'].split("T")[1].slice(0, 5)
      }

      if (this.interaccion['Imagen'] != "") {
        this.http.get(GlobalComponent.APIurl + "/imagen/" + this.interaccion['Imagen'], { responseType: 'blob' }).subscribe(res => {
          this.createImageFromBlob(res);
        })
      } else {
        this.imagenURL = "";
      }

      this.servicioEntrevistadores.getEntrevistadorNombre(this.interaccion['IdEntrevistador']).subscribe(res => {
        this.interaccion['Entrevistador'] = res[0].Nombre + " " + res[0].ApellidoPaterno + " " + res[0].ApellidoMaterno;
      })

      

      this.servicioGrupo.getGrupoInteraccion(this.interaccion['IdInteraccion']).subscribe(res => {
        if(res != ""){
          this.interaccion['NombreGrupo'] = res[0].NombreGrupo;
          this.estaEnGrupo = true;
        } else{
          this.estaEnGrupo = false;
        }
      })

    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagenURL = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  /**
   * Funcion para limpiar la tabla
   */
  clear(): void {
    this.crearTabla([{ "IdInteraccion": "-", "Nombre": "-", "ApellidoPaterno": "-", "ApellidoMaterno": "-", "NombreSocial": "-", "FechaNacimiento": "-", "Edad": "-", "ViajaConIdentificacion": "-", "ViajaConIdentificacionCual": "-", "OtrosIdiomas": "-", "OtrosIdiomasCual": "-", "PuebloOriginario": "-", "PuebloOriginarioCual": "-", "Profesion": "-", "Sexo": "-", "Nacionalidad": "-", "Estado": "-", "Municipio": "-", "LugarFrecuenta": "-", "EdadMigracion": "-", "AnioComienzoMigracion": "-", "MotivoMigracion": "-", "LugarActual": "-", "LugarActualCoordenadas": "-", "Interacciones": "-", "Estatura": "-", "Peso": "-", "Lentes": "-", "VelloFacial": "-", "VelloFacialCual": "-", "SenialesParticulares": "-", "Lesiones": "-", "EstadoSalud": "-", "DescripcionPrendas": "-", "Imagen": "-", "SituacionCalle": "-", "MigrantesMexicanas": "-", "TrabajadorCampo": "-", "DesplazadasForzadasInternas": "-", "MigrantesExtranjeras": "-", "Deportadas": "-", "TrabajadorHogar": "-", "Necesidades": "-", "Telefono": "-", "MensajeFamiliares": "-", "NombreQuienBusca": "-", "ApellidoPaternoQuienBusca": "-", "ApellidoMaternoQuienBusca": "-", "ParentescoQuienBusca": "-", "DireccionQuienBusca": "-", "TelefonoQuienBusca": "-", "CorreoElectronicoQuienBusca": "-", "OtroContactoQuienBusca": "-", "SaludFisica": "-", "SaludMental": "-", "Observaciones": "-", "FechaEntrevista": "-", "IdEntrevistador": "-" }]);
  }


}