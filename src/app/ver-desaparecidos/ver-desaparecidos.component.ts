import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import DataGridXL from "@datagridxl/datagridxl2";
import { DesaparecidosService } from '../servicios/desaparecidos.service';

@Component({
  selector: 'app-ver-desaparecidos',
  templateUrl: './ver-desaparecidos.component.html',
  styleUrls: ['./ver-desaparecidos.component.css']
})
export class VerDesaparecidosComponent implements OnInit {
  // FormGroup con el formulario para filtrar
  formularioVerDesaparecidos = new FormGroup({
    valor: new FormControl('', Validators.required),
    campo: new FormControl('')
  })

  gridInstance: any;    // Variable donde se crea la tabla
  desaparecidos: any;   // Variable donde se guardan los registros
  
  constructor(private servicioDesaparecidos: DesaparecidosService) { }

  /**
   * Al principio de la ejecucion se limpia la tabla, y se espera 
   * a que se obtengan los registros
   */
  ngOnInit(): void {
    this.clear();
    this.getDesaparecidos();
  }

  /**
   * Funcion para descargar la tabla en formato csv
   */
  download() {
    this.gridInstance.downloadDataAsCSV();
  }

  /**
   * Funcion que envia a la API una peticion con los campos y
   * contenidos por los que filtrar
   */
  busqueda() {
    this.servicioDesaparecidos.getDesaparecidosCampo(this.formularioVerDesaparecidos.value.campo, this.formularioVerDesaparecidos.value.valor)
      .subscribe(i => {
        this.crearTabla(i)
      });
  }

  /**
   * Funcion para obtener los registros de personas desaparecidas y
   * mostrarlas en la tabla
   */
  getDesaparecidos() {
    this.servicioDesaparecidos.getPrimerosDesaparecidos()
      .subscribe(i => {
        this.crearTabla(i)
      })
  }

  /**
   * Funcion para crear la tabla
   * @param desaparecidos Datos con los registros
   */
  crearTabla(desaparecidos) {
    this.gridInstance = new DataGridXL("grid", {
      data: desaparecidos.map(i => Object.values(i)),
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
          source: 4
        },
        {
          title: "Apellido Paterno",
          source: 5
        },
        {
          title: "Apellido Materno",
          source: 6
        },
        {
          title: "Folio de institucion",
          source: 1
        },
        {
          title: "Folio RNPDNO",
          source: 2
        },
        {
          title: "Fecha de la entrevista",
          source: 3
        }, 
        {
          title: "Nombre social",
          source: 7
        },
        {
          title: "Alias",
          source: 8
        },
        {
          title: "Nacionalidad del alias",
          source: 9
        },
        {
          title: "Sexo",
          source: 10
        },
        {
          title: "Fecha de nacimiento",
          source: 11
        },
        {
          title: "Nacionalidad",
          source: 12
        },
        {
          title: "Estado civil",
          source: 13
        },
        {
          title: "Viaja con identificacion",
          source: 14
        },
        {
          title: "¿Qué identificación?",
          source: 15
        },
        {
          title: "Último domicilio",
          source: 16
        },
        {
          title: "Idioma materno",
          source: 17
        },
        {
          title: "Habla español",
          source: 18
        },
        {
          title: "Hablas otros idiomas",
          source: 19
        },
        {
          title: "¿Qué idiomas?",
          source: 20
        },
        {
          title: "Pueblo originario",
          source: 21
        },
        {
          title: "¿Qué pueblo?",
          source: 22
        },
        {
          title: "Afrodescendiente",
          source: 23
        },
        {
          title: "Idioma de padres o abuelos",
          source: 24
        },
        {
          title: "¿Qué idioma?",
          source: 25
        },
        {
          title: "Sexo con el que se identifica",
          source: 26
        },
        {
          title: "Orientación sexual",
          source: 27
        },
        {
          title: "¿Qué  orientación?",
          source: 28
        },
        {
          title: "Profesión",
          source: 29
        },
        {
          title: "Edad a la que migró",
          source: 30
        },
        {
          title: "Año de la migración",
          source: 31
        },
        {
          title: "Motivo de la migración",
          source: 32
        },
        {
          title: "Número de migraciones",
          source: 33
        },
        {
          title: "Relato de la desaparicion",
          source: 34
        },
        {
          title: "País de perdida de contacto",
          source: 35
        },
        {
          title: "¿Qué país?",
          source: 36
        },
        {
          title: "Municipio de perdida de contacto",
          source: 37
        },
        {
          title: "Lugar de Cruce esperado",
          source: 38
        },
        {
          title: "Lugar de cruce confirmado",
          source: 39
        },
        {
          title: "País objetivo",
          source: 40
        },
        {
          title: "Estado objetivo",
          source: 41
        },
        {
          title: "Municipio objetivo",
          source: 42
        },
        {
          title: "Fecha de última comunicación",
          source: 43
        },
        {
          title: "Persona de última comunicación",
          source: 44
        },
        {
          title: "Deportada anteriormente",
          source: 45
        },
        {
          title: "País de deportación",
          source: 46
        },
        {
          title: "Fecha de última deportación",
          source: 47
        },
        {
          title: "Encarcelado",
          source: 48
        },
        {
          title: "Ubicacion de la carcel",
          source: 49
        },
        {
          title: "Fecha de detención",
          source: 50
        },
        {
          title: "Identificación de la detencion en EEUU",
          source: 51
        },
        {
          title: "Usaba papeles falsos",
          source: 52
        },
        {
          title: "¿Qué papeles?",
          source: 53
        },
        {
          title: "Acompañantes de viaje",
          source: 54
        },
        {
          title: "Conocidos en el extranjero",
          source: 55
        },
        {
          title: "Estatura",
          source: 56
        },
        {
          title: "Peso",
          source: 57
        },
        {
          title: "Complexión",
          source: 58
        },
        {
          title: "Color de piel",
          source: 59
        },
        {
          title: "Vello facial",
          source: 60
        },
        {
          title: "¿Qué tipo de vello facial?",
          source: 61
        },
        {
          title: "Lentes",
          source: 62
        },
        {
          title: "Cabello",
          source: 63
        },
        {
          title: "Embarazada",
          source: 64
        },
        {
          title: "Meses de embarazo",
          source: 65
        },
        {
          title: "Número de celular",
          source: 66
        },
        {
          title: "Señales particulares",
          source: 67
        },
        {
          title: "Lesiones",
          source: 68
        },
        {
          title: "Tipo de dientes",
          source: 69
        },
        {
          title: "Estado de salud",
          source: 70
        },
        {
          title: "Descripcion de las prendas",
          source: 71
        },
        {
          title: "Redes sociales",
          source: 72
        },
/*         {
          title: "Imagen",
          source: 73
        }, */
        {
          title: "Hay denuncia",
          source: 74
        },
        {
          title: "¿Qué denuncia?",
          source: 75
        },
        {
          title: "Hay reporte",
          source: 76
        },
        {
          title: "¿Qué reporte?",
          source: 77
        },
        {
          title: "Hay avances en la denuncia",
          source: 78
        },
        {
          title: "¿Qué avances?",
          source: 79
        },
        {
          title: "Lugares de busqueda",
          source: 80
        },
        {
          title: "Nombre de quien busca",
          source: 81
        },
        {
          title: "Apellido paterno de quien busca",
          source: 82
        },
        {
          title: "Apellido materno de quien busca",
          source: 83
        },
        {
          title: "Parentesco de quien busca",
          source: 84
        },
        {
          title: "Direccion de quien busca",
          source: 85
        },
        {
          title: "Telefono de quien busca",
          source: 86
        },
        {
          title: "Correo electrónico de quien busca",
          source: 87
        },
        {
          title: "Mensaje de quien busca",
          source: 88
        },
        {
          title: "Información usada para",
          source: 89
        },
        {
          title: "Información pública",
          source: 90
        },
        {
          title: "Entrevistador",
          source: 91
        },
        {
          title: "Institución",
          source: 92
        },
        {
          title: "Cargo",
          source: 93
        }
      ]
    });
  }

  /**
   * Funcion para limpiar la tabla
   */
  clear(): void {
    this.crearTabla([{  "IdDesaparecido": "-",
                        "FolioInstitucion": "-",
                        "FolioRNPDNO": "-",
                        "FechaEntrevista": "-",
                        "Nombre": "-",
                        "ApellidoPaterno": "-",
                        "ApellidoMaterno": "-",
                        "NombreSocial": "-",
                        "Alias": "-",
                        "NacionalidadAlias": "-",
                        "Sexo": "-",
                        "FechaNacimiento": "-",
                        "Nacionalidad": "-",
                        "EstadoCivil": "-",
                        "ViajaConIdentificacion": "-",
                        "ViajaConIdentificacionCual": "-",
                        "UltimoDomicilio": "-",
                        "IdiomaMaterno": "-",
                        "HablaEspañol": "-",
                        "OtrosIdiomas": "-",
                        "OtrosIdiomasCual": "-",
                        "PuebloOriginario": "-",
                        "PuebloOriginarioCual": "-",
                        "Afrodescendiente": "-",
                        "IdiomaPadresAbuelos": "-",
                        "IdiomaPadresAbuelosCual": "-",
                        "SexoIdentifica": "-",
                        "OrientacionSexual": "-",
                        "OrientacionSexualCual": "-",
                        "Profesion": "-",
                        "EdadMigracion": "-",
                        "AñoComienzoMigracion": "-",
                        "MotivoMigracion": "-",
                        "NumeroMigraciones": "-",
                        "RelatoDesaparicion": "-",
                        "PaisPerdidaContacto": "-",
                        "PaisPerdidaContactoCual": "-",
                        "MunicipioPerdidaContacto": "-",
                        "LugarCrucePretendia": "-",
                        "LugarCruceConfirmado": "-",
                        "PaisObjetivo": "-",
                        "EstadoObjetivo": "-",
                        "MunicipioObjetivo": "-",
                        "FechaUltimaComunicacion": "-",
                        "PersonaUltimaComunicacion": "-",
                        "DeportadaAnteriormente": "-",
                        "PaisDeportacion": "-",
                        "FechaUltimaDeportacion": "-",
                        "Encarcelado": "-",
                        "UbicacionCarcel": "-",
                        "FechaDetencion": "-",
                        "IdentificacionDetencionEEUU": "-",
                        "PapelesFalsos": "-",
                        "PapelesFalsosCual": "-",
                        "AcompañantesViaje": "-",
                        "ConocidosEnExtranjero": "-",
                        "Estatura": "-",
                        "Peso": "-",
                        "Complexion": "-",
                        "ColorPiel": "-",
                        "VelloFacial": "-",
                        "VelloFacialCual": "-",
                        "Lentes": "-",
                        "Cabello": "-",
                        "Embarazada": "-",
                        "MesesEmbarazo": "-",
                        "NumeroCelular": "-",
                        "SeñalesParticulares": "-",
                        "Lesiones": "-",
                        "TipoDientes": "-",
                        "EstadoSalud": "-",
                        "DescripcionPrendas": "-",
                        "RedesSociales": "-",
                        "Imagen": "-",
                        "HayDenuncia": "-",
                        "HayDenunciaCual": "-",
                        "HayReporte": "-",
                        "HayReporteCual": "-",
                        "AvancesDenuncia": "-",
                        "AvancesDenunciaCual": "-",
                        "LugaresBusqueda": "-",
                        "NombreQuienBusca": "-",
                        "ApellidoPaternoQuienBusca": "-",
                        "ApellidoMaternoQuienBusca": "-",
                        "ParentescoQuienBusca": "-",
                        "DireccionQuienBusca": "-",
                        "TelefonoQuienBusca": "-",
                        "CorreoElectronicoQuienBusca": "-",
                        "MensajeQuienBusca": "-",
                        "InformacionUsadaPara": "-",
                        "InformacionPublica": "-",
                        "Entrevistador": "-",
                        "Institucion": "-",
                        "Cargo": "-"
                      }]);
  }
}
