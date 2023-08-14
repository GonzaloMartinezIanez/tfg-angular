import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { GrupoService } from '../servicios/grupo.service';
import { HttpClient } from '@angular/common/http';
import { InteraccionService } from '../servicios/interaccion.service';
import * as L from "leaflet";
import { GlobalComponent } from '../global-component';

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
  imagenURL: any;
  hayInteraccion = false;       // Hasta que no hay una interaccion, no se muestra el div
  interaccionesOriginal = ""    // Variable necesaria para saber si se ha tocado la interaccion

  interaccion: any = {          // Variable donde se guarda la interaccion
    Folio: "",
    Nombre: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Imagen: "",
    Institucion: "",
  }

  NombreABuscar = "";
  ApellidoPaternoABuscar = "";
  ApellidoMaternoABuscar = "";

  personas : any = [];

  private subject = new Subject<string>();

  // Variables para mostrar la alerta con error o exito
  hayError = false;
  mensaje = "Mensaje con el error";
  exito = false;

  constructor(private http: HttpClient, private servicioInteraccion: InteraccionService) { 
    this.subject.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.servicioInteraccion.getInteraccionesPorNombre(value).subscribe(res => {
          this.personas = res;
      });
    });
  }

  ngOnInit(): void {

  }

  /**
   * Funcion que pide la interacion y guarda el resultado en la interaccion
   * en la variable privada this.interaccion
   * En el caso de no existir o no tener acceso, se muestra un error
   */
  getInteraccionPorFolio(id : string, medianteFolio : boolean) {
    var folio = "";
    if(medianteFolio){
      folio = this.folio;
    } else{
      folio = id
    }

    if (folio) {
      this.servicioInteraccion.getInteraccionCorto(folio).subscribe(res => {
        if (res == "") {
          this.hayInteraccion = false
          this.hayError = true;
          this.mensaje = "El registro no existe o no tienes acceso";
          this.exito = false;
        } else {
          this.hayInteraccion = true

          this.interaccion.Folio = folio;
          this.interaccion.Nombre = res[0].Nombre;
          this.interaccion.ApellidoPaterno = res[0].ApellidoPaterno;
          this.interaccion.ApellidoMaterno = res[0].ApellidoMaterno;
          this.interaccion.FechaNacimiento = res[0].FechaNacimiento.split("T")[0].split("-").reverse().join("-");
          this.interaccion.Imagen = res[0].Imagen;
          this.interaccion.Interacciones = res[0].Interacciones;

          this.interaccionesOriginal = res[0].Interacciones;

          if (this.interaccion.Imagen != "") {
            this.http.get(GlobalComponent.APIurl + "/imagen/" + this.interaccion.Imagen, { responseType: 'blob' }).subscribe(res => {
              this.createImageFromBlob(res);
            })
          }
        }
      })
    } else {
      this.hayError = true;
      this.mensaje = "El folio debe ser un número";
      this.exito = false;
    }
  }

  getInteraccionPorNombre() {
    /* 
    }) */
    this.subject.next(this.NombreABuscar + "/" + this.ApellidoPaternoABuscar + "/" + this.ApellidoMaternoABuscar)
  }

  /**
   * Funcion que manda una peticion a la API para
   * actualizar la interaccion de la persona
   */
  actualizar() {
    if (this.interaccionesOriginal == this.interaccion.Interacciones) {
      // No se ha modificado la interaccion
      this.hayError = true;
      this.mensaje = "No se han modificado las interacciones";
      this.exito = false;
    } else {
      this.servicioInteraccion.putInteraccion(this.folio, this.interaccion.Interacciones).subscribe(res => {
        if (res['message'] == "Interaccion actualizada") {
          this.hayError = true;
          this.mensaje = "Interaccion actualizada";
          this.exito = true;
        }
      })
    }
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

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onMessageClose() {
    this.hayError = false;
    this.mensaje = '';
    this.exito = false;
  }
}
