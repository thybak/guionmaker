import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EscenaModel } from './models/EscenasModel';
import { DetalleLiterarioModel } from './models/DetallesLiterariosModel';
import { DetalleTecnicoModel } from './models/DetallesTecnicosModel';

import { RespuestaJson, AngularAPIHelper } from '../utils/AngularAPIHelper';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';
import { GestorSubidaComponent, Fichero } from '../utils/gestor-subida.component';

import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
import * as jQuery from "jquery";

@Component({
    templateUrl: './templates/escena-detalle.component.html',
    providers: [AngularAPIHelper],
    selector: 'detalle-escena'
})
export class DetalleEscenaComponent {
    fichero: Fichero;
    confirmacionGuardado: ConfirmacionGuardado;
    escena: EscenaModel;
    detalleLiterario: DetalleLiterarioModel;
    detalleTecnico: DetalleTecnicoModel;
    botonesGuardado: BotonesGuardado;
    ng2sconfig: any = {
        hint: {
            words: ['apple', 'orange', 'watermelon', 'lemon'],
            match: /\b(\w{1,})$/,
            search: function (keyword, callback) {
                callback(jQuery.grep(this.words, function (item) {
                    return item.indexOf(keyword) === 0;
                }));
            }
        },
        minHeight: 200,
        lang: 'es-ES',
        placeholder: 'Escribe tu texto...'
    };

    constructor(private angularAPIHelper: AngularAPIHelper, private el: ElementRef, private router: Router, private route: ActivatedRoute) {
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompleto(false);
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.fichero = new Fichero();
        this.route.params.switchMap((params: Params) => this.angularAPIHelper.getById('escena', params['id'])).
            subscribe(response => this.cargarModelo(response),
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
        this.angularAPIHelper.postEntryOrFilter('escena', JSON.stringify(this.escena)).subscribe(null, error => this.confirmacionGuardado.setEstadoGuardado(false), () => this.confirmacionGuardado.setEstadoGuardado(true));
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

    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.detalleTecnico.imagen = this.fichero.base64;
            this.detalleTecnico.mimeType = this.fichero.mimeType;
            console.log(this.fichero);
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