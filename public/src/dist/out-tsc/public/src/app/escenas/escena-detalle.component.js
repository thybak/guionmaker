var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, KeyValueDiffers } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EscenaModel } from './models/EscenasModel';
import { DetalleLiterarioModel } from './models/DetallesLiterariosModel';
import { DetalleTecnicoModel } from './models/DetallesTecnicosModel';
import { AngularAPIHelper } from '../utils/AngularAPIHelper';
import { LocalStorageService } from '../utils/LocalStorageService';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';
import { Fichero } from '../utils/gestor-subida.component';
import * as jQuery from "jquery";
let DetalleEscenaComponent = class DetalleEscenaComponent {
    constructor(angularAPIHelper, el, router, route, localStorageService, differs) {
        this.angularAPIHelper = angularAPIHelper;
        this.el = el;
        this.router = router;
        this.route = route;
        this.localStorageService = localStorageService;
        this.differs = differs;
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompleto();
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.fichero = new Fichero();
        this.activarSugerencias = this.localStorageService.getPropiedad('activarSugerencias') == 'true';
        this.differ = this.differs.find({}).create(null);
        this.route.params.switchMap((params) => this.angularAPIHelper.getById('escena', params['id'])).
            subscribe(response => {
            this.cargarModelo(response);
            let peticion = this.angularAPIHelper.buildPeticion({ proyecto: this.escena.proyecto }, {}, "nombre");
            this.ng2sconfig = {
                addclass: {
                    debug: false
                },
                hint: {
                    elementosBiblia: [],
                    activarSugerencias: this.activarSugerencias,
                    match: /\b(\w{1,})$/,
                    search: function (keyword, callback) {
                        callback(jQuery.grep(this.elementosBiblia, (item) => {
                            if (!this.activarSugerencias) {
                                return false;
                            }
                            return item.toLowerCase().indexOf(keyword.toLowerCase()) === 0;
                        }));
                    }
                },
                minHeight: 200,
                lang: 'es-ES',
                placeholder: 'Escribe tu texto...',
                toolbar: [
                    ['style', ['addclass', 'fontname', 'clear']],
                    ['fontstyle', ['bold', 'italic', 'paragraph']],
                    ['fontstyleextra', ['strikethrough', 'underline', 'hr', 'color', 'superscript', 'subscript']],
                    ['extra', ['table', 'height']],
                    ['misc', ['undo', 'redo', 'codeview']]
                ],
                fontNames: ['Courier New', 'Arial', 'Arial Black', 'Sans-serif', 'Serif']
            };
            this.ng2sconfig.hint.activarSugerencias = this.activarSugerencias;
            this.angularAPIHelper.postEntryOrFilter('personajesPorFiltro', JSON.stringify(peticion)).subscribe(response => {
                let nombrePersonajes = response.consulta;
                if (nombrePersonajes != undefined) {
                    this.rellenarAutocompletar(nombrePersonajes);
                }
            });
            this.angularAPIHelper.postEntryOrFilter('escenariosPorFiltro', JSON.stringify(peticion)).subscribe(response => {
                let nombreEscenarios = response.consulta;
                if (nombreEscenarios != undefined) {
                    this.rellenarAutocompletar(nombreEscenarios);
                }
            });
        }, error => console.log('Error:' + error));
    }
    cargarModelo(response) {
        this.escena = response.consulta[0];
        if (this.escena != undefined) {
            if (this.escena.detalleLiterario != undefined) {
                this.angularAPIHelper.getById('detalleLiterario', this.escena.detalleLiterario)
                    .subscribe(response => {
                    this.detalleLiterario = response.consulta[0];
                    this.detalleLiterario.texto = this.detalleLiterario.texto == "" ? new String('') : this.detalleLiterario.texto; // workaround por culpa del componente ng2-summernote donde con "" no se muestra nada.
                }, error => console.log('Error:' + error));
            }
            else {
                this.detalleLiterario = new DetalleLiterarioModel();
            }
            if (this.escena.detalleTecnico != undefined) {
                this.angularAPIHelper.getById('detalleTecnico', this.escena.detalleTecnico)
                    .subscribe(response => {
                    this.detalleTecnico = response.consulta[0];
                    this.detalleTecnico.texto = this.detalleTecnico.texto == "" ? new String('') : this.detalleTecnico.texto;
                    this.fichero.base64 = this.detalleTecnico.imagen;
                    this.fichero.mimeType = this.detalleTecnico.mimeType;
                }, error => console.log('Error: ' + error));
            }
            else {
                this.detalleTecnico = new DetalleTecnicoModel();
            }
        }
    }
    guardarEscena(response) {
        let resultadoDetalleTecnico = response.insertado;
        if (resultadoDetalleTecnico != undefined) {
            this.escena.detalleTecnico = resultadoDetalleTecnico._id;
            this.detalleTecnico = resultadoDetalleTecnico;
        }
        this.angularAPIHelper.postEntryOrFilter('escena', JSON.stringify(this.escena)).subscribe(null, error => this.confirmacionGuardado.setEstadoGuardado(false), () => { this.confirmacionGuardado.setEstadoGuardado(true); this.botonesGuardado.mostrarCompleto(); });
    }
    guardarDetalles(response) {
        let resultadoDetalleLiterario = response.insertado;
        if (resultadoDetalleLiterario != undefined) {
            this.escena.detalleLiterario = resultadoDetalleLiterario._id;
            this.detalleLiterario = resultadoDetalleLiterario;
        }
        this.angularAPIHelper.postEntryOrFilter('detalleTecnico', JSON.stringify(this.detalleTecnico))
            .subscribe(response => this.guardarEscena(response), error => this.confirmacionGuardado.setEstadoGuardado(false));
    }
    guardarCambios() {
        this.angularAPIHelper.postEntryOrFilter('detalleLiterario', JSON.stringify(this.detalleLiterario))
            .subscribe(response => this.guardarDetalles(response), error => this.confirmacionGuardado.setEstadoGuardado(false));
    }
    rellenarAutocompletar(elementos) {
        for (let elemento of elementos) {
            this.ng2sconfig.hint.elementosBiblia.push(elemento.nombre);
        }
    }
    ngDoCheck() {
        let changes = this.differ.diff(this.escena);
        if (changes != undefined && changes._changesTail != undefined) {
            this.botonesGuardado.mostrarCompleto(false);
        }
    }
    toggleSugerencias() {
        this.ng2sconfig.hint.activarSugerencias = this.activarSugerencias;
        this.localStorageService.setPropiedad('activarSugerencias', this.activarSugerencias.valueOf().toString());
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.detalleTecnico.imagen = this.fichero.base64;
            this.detalleTecnico.mimeType = this.fichero.mimeType;
            this.guardarCambios();
            this.confirmacionGuardado.setTimeoutRetirarAviso();
        }
        else if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/escenas']);
        }
        else if (event == TipoOperacionGuardado.Eliminar) {
            let escena = EscenaModel.cargarEscena(this.escena);
            escena.eliminar(this.angularAPIHelper).subscribe(null, null, () => this.router.navigate(['/escenas']));
        }
    }
};
DetalleEscenaComponent = __decorate([
    Component({
        templateUrl: './templates/escena-detalle.component.html',
        providers: [AngularAPIHelper, LocalStorageService],
        selector: 'detalle-escena'
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, ElementRef, Router, ActivatedRoute, LocalStorageService, KeyValueDiffers])
], DetalleEscenaComponent);
export { DetalleEscenaComponent };
//# sourceMappingURL=escena-detalle.component.js.map