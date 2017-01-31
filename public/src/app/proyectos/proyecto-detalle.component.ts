import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from '../utils/AngularAPIHelper';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { ProyectoModel } from './models/ProyectosModel';
import { GeneroModel } from './models/GenerosModel';
import { ClasificacionModel } from './models/ClasificacionesModel';

import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';


@Component({
    selector: 'detalle-proyecto',
    templateUrl: './templates/proyecto-detalle.component.html',
    providers: [AngularAPIHelper]
})
export class DetalleProyectoComponent {
    confirmacionGuardado: ConfirmacionGuardado;
    botonesGuardado: BotonesGuardado;
    proyecto: ProyectoModel;
    respuesta: RespuestaJson;
    generos: GeneroModel[];
    clasificaciones: ClasificacionModel[];

    constructor(private angularAPIHelper: AngularAPIHelper, private router : Router, private route : ActivatedRoute) {
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompletoCancelar();
        this.cargarSelects();
        this.route.params.switchMap((params: Params) =>
            this.angularAPIHelper.postEntryOrFilter('proyectosPorFiltro', JSON.stringify(this.angularAPIHelper.buildPeticion({ '_id': params['id'], 'cancelado': false }, '')))).
            subscribe(response => this.cargarModelo(response));
    }
    private cargarSelects() {
        GeneroModel.getAll(this.angularAPIHelper).subscribe(response => this.generos = (response as RespuestaJson).consulta as GeneroModel[]);
        ClasificacionModel.getAll(this.angularAPIHelper).subscribe(response => this.clasificaciones = (response as RespuestaJson).consulta as ClasificacionModel[]);
    }
    private cargarModelo(proyecto: any) {
        this.proyecto = (proyecto as RespuestaJson).consulta[0] as ProyectoModel;
        this.proyecto.sinopsis = this.proyecto.sinopsis == undefined ? new String('') : this.proyecto.sinopsis; // workaround ng2-summernote
    }
    private guardarCambios(exit: boolean) {
        this.proyecto.fechaModificacion = new Date();
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(this.proyecto)).subscribe(
            response => {
                this.respuesta = response as RespuestaJson
            },
            error => {
                this.confirmacionGuardado.setEstadoGuardado(false);
                this.confirmacionGuardado.setTimeoutRetirarAviso();
            },
            () => {
                let isOk = this.respuesta.estado == ResponseStatus.OK;
                if (!isOk) {
                    console.log(this.respuesta.error);
                }
                this.confirmacionGuardado.setEstadoGuardado(isOk);
                this.confirmacionGuardado.setTimeoutRetirarAviso();
                if (exit && isOk) {
                    this.router.navigate(['/proyectos']);
                }

            });
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.guardarCambios(false);
        } else if (event == TipoOperacionGuardado.Eliminar) {
            this.proyecto.cancelado = true;
            this.guardarCambios(true);
        } else if (event == TipoOperacionGuardado.Volver) { 
            this.router.navigate(['/proyectos']);
        }
    }
}