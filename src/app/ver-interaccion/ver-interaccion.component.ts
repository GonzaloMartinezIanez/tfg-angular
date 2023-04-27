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

  formularioVerInteraccion = new FormGroup({
    valor: new FormControl('', Validators.required),
    campo: new FormControl('')
  })


  constructor(private servicioInteraccion: InteraccionService) {
  }

  ngOnInit(): void {
    this.getInteracciones();
  }

  download() {
    this.gridInstance.downloadDataAsCSV();
  }

  busqueda() {
    this.servicioInteraccion.getInteraccionCampo(this.formularioVerInteraccion.value.campo, this.formularioVerInteraccion.value.valor)
      .subscribe(i => {
        this.gridInstance = new DataGridXL("grid",
          {
            data: this.modificarInteracciones(i),
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
            allowHideCols: true
          });
      });
  }

  getInteracciones() {
    this.servicioInteraccion.getPrimerasInteracciones()
      .subscribe(i => {
        this.gridInstance = new DataGridXL("grid",
          {
            data: this.modificarInteracciones(i),
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
            allowHideCols: true
          });
      })
  }

  modificarInteracciones(interaccion) {
    interaccion.forEach(element => {
      element.IdInteraccion = '<a routerLink="/interaccion/"' + element.IdInteraccion + '>Modificar</a>'
    });

    return interaccion
  }
}