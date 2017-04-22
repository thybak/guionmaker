import { Component, ElementRef, DoCheck, KeyValueDiffers } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EscenaModel } from './models/EscenasModel';
import { DetalleLiterarioModel } from './models/DetallesLiterariosModel';
import { DetalleTecnicoModel } from './models/DetallesTecnicosModel';

import { RespuestaJson, AngularAPIHelper } from '../utils/AngularAPIHelper';
import { LocalStorageService } from '../utils/LocalStorageService';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';
import { GestorSubidaComponent, Fichero } from '../utils/gestor-subida.component';
import { AyudaDiccionariosComponent } from '../utils/ayuda-diccionarios.component';

import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
import * as jQuery from "jquery";

@Component({
    templateUrl: './templates/escena-detalle.component.html',
    providers: [AngularAPIHelper, LocalStorageService],
    selector: 'detalle-escena'
})
export class DetalleEscenaComponent implements DoCheck {
    fichero: Fichero;
    confirmacionGuardado: ConfirmacionGuardado;
    escena: EscenaModel;
    detalleLiterario: DetalleLiterarioModel;
    detalleTecnico: DetalleTecnicoModel;
    botonesGuardado: BotonesGuardado;
    ng2sconfig: any;
    elementosBiblia: string[];
    activarSugerencias: boolean;
    differ: any;

    constructor(private angularAPIHelper: AngularAPIHelper, private el: ElementRef, private router: Router, private route: ActivatedRoute, private localStorageService: LocalStorageService, private differs: KeyValueDiffers) {
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompleto();
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.fichero = new Fichero();
        this.activarSugerencias = this.localStorageService.getPropiedad('activarSugerencias') == 'true';
        this.differ = this.differs.find({}).create(null);
        this.route.params.switchMap((params: Params) => this.angularAPIHelper.getById('escena', params['id'])).
            subscribe(response => {
                this.cargarModelo(response);
                let peticion = this.angularAPIHelper.buildPeticion({ proyecto: this.escena.proyecto }, {}, "nombre proyecto");
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
                    let nombrePersonajes = (response as RespuestaJson).consulta;
                    if (nombrePersonajes != undefined) {
                        this.rellenarAutocompletar(nombrePersonajes);
                    }
                });
                this.angularAPIHelper.postEntryOrFilter('escenariosPorFiltro', JSON.stringify(peticion)).subscribe(response => {
                    let nombreEscenarios = (response as RespuestaJson).consulta;
                    if (nombreEscenarios != undefined) {
                        this.rellenarAutocompletar(nombreEscenarios);
                    }
                });


            },
            error => console.log('Error:' + error));
    }

    private cargarModelo(response) {
        this.escena = (response as RespuestaJson).consulta[0] as EscenaModel;
        if (this.escena != undefined) {
            if (this.escena.detalleLiterario != undefined) {
                this.angularAPIHelper.getById('detalleLiterario', this.escena.detalleLiterario)
                    .subscribe(response => {
                        this.detalleLiterario = (response as RespuestaJson).consulta[0] as DetalleLiterarioModel;
                        this.detalleLiterario.texto = this.detalleLiterario.texto == "" ? new String('') : this.detalleLiterario.texto; // workaround por culpa del componente ng2-summernote donde con "" no se muestra nada.
                    },
                    error => console.log('Error:' + error));
            } else {
                this.detalleLiterario = new DetalleLiterarioModel();
            }
            if (this.escena.detalleTecnico != undefined) {
                this.angularAPIHelper.getById('detalleTecnico', this.escena.detalleTecnico)
                    .subscribe(response => {
                        this.detalleTecnico = (response as RespuestaJson).consulta[0] as DetalleTecnicoModel;
                        this.detalleTecnico.texto = this.detalleTecnico.texto == "" ? new String('') : this.detalleTecnico.texto;
                        this.fichero.base64 = this.detalleTecnico.imagen;
                        this.fichero.mimeType = this.detalleTecnico.mimeType;
                    },
                    error => console.log('Error: ' + error));
            } else {
                this.detalleTecnico = new DetalleTecnicoModel();
            }
        }
    }

    private guardarEscena(response) {
        let resultadoDetalleTecnico = (response as RespuestaJson).insertado as DetalleTecnicoModel;
        if (resultadoDetalleTecnico != undefined) {
            this.escena.detalleTecnico = resultadoDetalleTecnico._id;
            this.detalleTecnico = resultadoDetalleTecnico;
        }
        this.angularAPIHelper.postEntryOrFilter('escena', JSON.stringify(this.escena)).subscribe(null, error => this.confirmacionGuardado.setEstadoGuardado(false), () => { this.confirmacionGuardado.setEstadoGuardado(true); this.botonesGuardado.mostrarCompleto(); });
    }

    private guardarDetalles(response) {
        let resultadoDetalleLiterario = (response as RespuestaJson).insertado as DetalleLiterarioModel;
        if (resultadoDetalleLiterario != undefined) {
            this.escena.detalleLiterario = resultadoDetalleLiterario._id;
            this.detalleLiterario = resultadoDetalleLiterario;
        }
        this.angularAPIHelper.postEntryOrFilter('detalleTecnico', JSON.stringify(this.detalleTecnico))
            .subscribe(response => this.guardarEscena(response),
            error => this.confirmacionGuardado.setEstadoGuardado(false));
    }

    private guardarCambios() {
        this.angularAPIHelper.postEntryOrFilter('detalleLiterario', JSON.stringify(this.detalleLiterario))
            .subscribe(response => this.guardarDetalles(response),
            error => this.confirmacionGuardado.setEstadoGuardado(false));
    }

    private rellenarAutocompletar(elementos: any[]) {
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
        } else if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/escenas']);
        } else if (event == TipoOperacionGuardado.Eliminar) {
            let escena = EscenaModel.cargarEscena(this.escena);
            escena.eliminar(this.angularAPIHelper).subscribe(null, null, () => this.router.navigate(['/escenas']));
        }
    }
}