var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { EscenaModel } from './models/EscenasModel';
import { AngularAPIHelper } from '../utils/AngularAPIHelper';
import { LocalStorageService } from '../utils/LocalStorageService';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';
let EscenasListComponent = class EscenasListComponent {
    constructor(angularAPIHelper, localStorageService) {
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        this.sortOptions = {
            animation: 150
        };
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.confirmacionGuardado.multiguardado = true;
        this.botonesGuardado = new BotonesGuardado();
        this.cargarEscenas();
    }
    guardarCambios() {
        for (let escena of this.escenas) {
            let escenaaux = escena;
            this.angularAPIHelper.postEntryOrFilter('escena/actualizar', JSON.stringify(escenaaux)).subscribe(null, error => this.confirmacionGuardado.setEstadoMultiguardado(escenaaux.titulo, false), () => {
                this.confirmacionGuardado.setEstadoMultiguardado(escenaaux.titulo, true);
                this.cargarEscenas();
            });
        }
    }
    cambiarOrdenEscenas() {
        let idx = 1;
        for (let escena of this.escenas) {
            escena.orden = idx++;
        }
    }
    cargarEscenas(proyectoId = "", orden = 1) {
        let peticion = this.angularAPIHelper.buildPeticion({ 'proyecto': this.localStorageService.getPropiedad('proyectoActual') }, { 'orden': '1' });
        this.angularAPIHelper.postEntryOrFilter('escenasPorFiltro', JSON.stringify(peticion))
            .subscribe(response => {
            this.escenas = response.consulta;
            this.escenas = this.escenas == undefined ? [] : this.escenas; // workaround para el componente de listado ordenable
        }, error => console.error('Error: ' + error));
    }
    generarHtmlImagen(detalle) {
        let htmlImagen = "";
        if (detalle.imagen != undefined && detalle.mimeType != undefined) {
            htmlImagen = "<img src=\"data:" + detalle.mimeType + ";base64, " + detalle.imagen + "\" style=\"max-height: 20em; width: auto; margin: 0 auto;\" /><br />";
        }
        return htmlImagen;
    }
    generarHtmlExportacion(literario, plantillaEscena) {
        this.exportacionWindow = window.open();
        this.exportacionWindow.document.title = "Vista completa del guión - GuionMaker";
        for (let escena of this.escenas) {
            let escenaActual = escena;
            let plantillaModificada = plantillaEscena.html.replace("{{tituloEscena}}", escenaActual.orden + ". " + this.getSituacionString(escenaActual) + ". " + escenaActual.titulo.toUpperCase() + ". " + this.getTemporalidadString(escenaActual));
            this.angularAPIHelper.getById(literario ? 'detalleLiterario' : 'detalleTecnico', literario ? escenaActual.detalleLiterario : escenaActual.detalleTecnico).subscribe(response => {
                let detalle;
                if (literario) {
                    detalle = response.consulta[0];
                }
                else {
                    detalle = response.consulta[0];
                }
                this.htmlExportado += plantillaModificada.replace("{{contenidoEscena}}", this.generarHtmlImagen(detalle) + detalle.texto);
                this.exportacionWindow.document.documentElement.innerHTML = this.htmlExportado;
            });
        }
    }
    exportarGuion(literario) {
        // una vez se tenga el usuario habría que hacer join de usuario y proyecto para sacar la plantilla que se debe usar, por ahora defecto
        this.htmlExportado = "";
        this.angularAPIHelper.getById("plantilla", "5884c9c1e369b82e24883387").subscribe(response => {
            let plantillaEscena = response.consulta[0];
            if (plantillaEscena != undefined) {
                this.angularAPIHelper.getById("plantilla", "5884c982e369b82e24883386").subscribe(response2 => {
                    let plantillaPortada = response2.consulta[0];
                    if (plantillaPortada != undefined) {
                        plantillaPortada.html = plantillaPortada.html.replace("{{tituloProyecto}}", this.localStorageService.getPropiedad('nombreProyectoActual'));
                        this.htmlExportado += plantillaPortada.html.replace("{{tipoGuion}}", literario ? "Guión literario" : "Guión técnico");
                        this.generarHtmlExportacion(literario, plantillaEscena);
                    }
                });
            }
        });
    }
    onDestacar(destacar, escena) {
        escena.destacado = destacar;
    }
    onNuevaEscena() {
        let escena = new EscenaModel();
        escena.proyecto = this.localStorageService.getPropiedad('proyectoActual');
        escena.orden = this.escenas.length + 1;
        this.angularAPIHelper.postEntryOrFilter('escena', JSON.stringify(escena)).subscribe(response => this.escenas.push(response.insertado)); // por mejorar el asunto del orden
    }
    onGuardarCambios() {
        this.cambiarOrdenEscenas();
        this.guardarCambios();
        this.confirmacionGuardado.setTimeoutRetirarAviso();
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.onGuardarCambios();
        }
        else if (event == TipoOperacionGuardado.Eliminar) {
            this.onEliminar();
        }
    }
    getTemporalidadString(escena) {
        let _escena = EscenaModel.cargarEscena(escena);
        return _escena.getTemporalidadString();
    }
    getSituacionString(escena) {
        let _escena = EscenaModel.cargarEscena(escena);
        return _escena.getSituacionString();
    }
    onSeleccionEscenaAEliminar(escena) {
        this.escenaAEliminar = escena;
    }
    onEliminar() {
        let escena = EscenaModel.cargarEscena(this.escenaAEliminar);
        escena.eliminar(this.angularAPIHelper).subscribe(null, null, () => this.cargarEscenas());
    }
};
EscenasListComponent = __decorate([
    Component({
        selector: 'lista-escenas',
        templateUrl: './templates/escenas-lista.component.html',
        providers: [AngularAPIHelper, LocalStorageService]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, LocalStorageService])
], EscenasListComponent);
export { EscenasListComponent };
//# sourceMappingURL=escenas-lista.component.js.map