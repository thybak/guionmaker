import { Component } from '@angular/core';
import { EscenaModel } from '../../../../models/EscenasModel';
import { RespuestaJson, AngularAPIHelper } from '../utils/AngularAPIHelper';
import { SortablejsOptions } from 'angular-sortablejs';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';

@Component({
    selector: 'lista-escenas',
    templateUrl: './templates/escenas-lista.component.html',
    providers: [AngularAPIHelper]
})
export class EscenasListComponent {
    escenas: EscenaModel[];
    angularAPIHelper: AngularAPIHelper;
    confirmacionGuardado: ConfirmacionGuardado;
    botonesGuardado: BotonesGuardado;
    sortOptions: SortablejsOptions = {
        animation: 150
    }
    constructor(angularAPIHelper: AngularAPIHelper) {
        this.angularAPIHelper = angularAPIHelper;
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.botonesGuardado = new BotonesGuardado();
        this.cargarEscenas();
    }
    private guardarCambios() {
        let isOk: boolean = true;
        for (let escena of this.escenas) {
            this.angularAPIHelper.postEntryOrFilter('escena/actualizar', JSON.stringify(escena)).subscribe(error => isOk = false);
        }
        this.confirmacionGuardado.setEstadoGuardado(isOk);
    }
    private cambiarOrdenEscenas() {
        let idx: number = 1;
        for (let escena of this.escenas) {
            escena.orden = idx++;
        }
    }
    private cargarEscenas(proyectoId: string = "", orden: number = 1) {
        let peticion = this.angularAPIHelper.buildPeticion({ 'proyecto': '57f1687fe942851c18cec84b' }, { 'orden': '1' });
        this.angularAPIHelper.postEntryOrFilter('escenasPorFiltro', JSON.stringify(peticion))
            .subscribe(response => this.escenas = (response as RespuestaJson).consulta as EscenaModel[],
            error => console.error('Error: ' + error),
            () => console.log('Actualizado'));
    }
    onDestacar(destacar: boolean, escena: EscenaModel) {
        escena.destacado = destacar;
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
    }
}
