import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InteraccionService } from '../interaccion.service';

import DataGridXL from "@datagridxl/datagridxl2";
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-ver-interaccion',
  templateUrl: './ver-interaccion.component.html',
  styleUrls: ['./ver-interaccion.component.css']
})
export class VerInteraccionComponent implements OnInit {
  @ViewChild("grid") grid: ElementRef;
  gridInstance: any;
  interacciones: any;

  formularioVerInteraccion = new FormGroup({
    valor: new FormControl('', Validators.required),
    campo: new FormControl('')
  })


  constructor(private servicioInteraccion: InteraccionService) {
  }

  ngOnInit(): void {
    this.clear();
    this.getInteracciones();
  }

  download() {
    this.gridInstance.downloadDataAsCSV();
  }

  busqueda() {
    this.servicioInteraccion.getInteraccionCampo(this.formularioVerInteraccion.value.campo, this.formularioVerInteraccion.value.valor)
      .subscribe(i => {
        this.crearTabla(i)
      });
  }

  getInteracciones() {
    this.servicioInteraccion.getPrimerasInteracciones()
      .subscribe(i => {
        this.crearTabla(i)
      })
  }

  crearTabla(interacciones) {
    this.gridInstance = new DataGridXL("grid", {
      data: interacciones.map(i => Object.values(i)),
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
          title: "Nombre social",
          source: 4
        },
        {
          title: "Fecha de nacimiento",
          source: 5
        },
        {
          title: "Sexo",
          source: 6
        },
        {
          title: "Nacionalidad",
          source: 7
        },
        {
          title: "Estado",
          source: 8
        },
        {
          title: "Municipio",
          source: 9
        },
        {
          title: "Lugar que frecuenta",
          source: 10
        },
        {
          title: "Lugar actual",
          source: 11
        },
        {
          title: "En situación de calle",
          source: 12
        },
        {
          title: "Migrante Mexicana",
          source: 13
        },
        {
          title: "Trabajador de campo",
          source: 14
        },
        {
          title: "Desplazada forzada interna",
          source: 15
        },
        {
          title: "Migrante extranjera",
          source: 16
        },
        {
          title: "Deportada",
          source: 17
        },
        {
          title: "Trabajadora de hogar",
          source: 18
        },
        {
          title: "Descripción física",
          source: 19
        },
        {
          title: "Necesidades",
          source: 20
        },
        {
          title: "Mensaje a familiares",
          source: 21
        },
        /* {
          title: "Imagen",
          source: 22
        }, */
        {
          title: "Salud física",
          source: 23
        },
        {
          title: "Salud mental",
          source: 24
        },
        {
          title: "Observaciones",
          source: 25
        }        
      ]
    });
  }

  clear(): void {
    this.crearTabla([{ "IdInteraccion": "-", "Nombre": "-", "ApellidoPaterno": "-", "ApellidoMaterno": "-", "NombreSocial": "-", "FechaNacimiento": "-", "Sexo": "-", "Nacionalidad": "-", "Estado": "-", "Municipio": "-", "LugarFrecuenta": "-", "LugarActual": "-", "SituacionCalle": "-", "MigrantesMexicanas": "-", "TrabajadorCampo": "-", "DesplazadasForzadasInternas": "-", "MigrantesExtranjeras": "-", "Deportadas": "-", "TrabajadorHogar": "-", "DescripcionFisica": "-", "Necesidades": "-", "MensajeFamiliares": "-", "Imagen": "-", "SaludFisica": "-", "SaludMental": "-", "Observaciones": "-", "Folio": "-" }]);
  }
}