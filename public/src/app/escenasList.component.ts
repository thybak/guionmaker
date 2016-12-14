import { Component } from '@angular/core';
import { EscenaModel } from '../../../models/EscenasModel';
import { RespuestaJson, AngularAPIHelper } from './utils/AngularAPIHelper';
import { SortablejsOptions } from 'angular-sortablejs';
import { ConfirmacionGuardado } from './confirmacionGuardado.component';

@Component({
    selector: 'escenas-list',
    templateUrl: './templates/escenasList.component.html',
    providers: [AngularAPIHelper]
})
export class EscenasListComponent {
    escenas: EscenaModel[];
    angularAPIHelper: AngularAPIHelper;
    confirmacionGuardado: ConfirmacionGuardado;
    sortOptions: SortablejsOptions = {
        animation: 150
    }
    constructor(angularAPIHelper: AngularAPIHelper) {
        this.angularAPIHelper = angularAPIHelper;
        this.escenas = []; // esto es para forzar que el componente sortablejs se vincule a la propiedad del modelo
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.cargarEscenas();
    }
    private guardarCambios() {
        for (let escena of this.escenas) {
            this.angularAPIHelper.postEntry('escena/actualizar', JSON.stringify(escena)).subscribe(response => this.confirmacionGuardado.setEstadoGuardado(true), error => this.confirmacionGuardado.setEstadoGuardado(false));
        }
    }
    private cambiarOrdenEscenas() {
        let idx: number = 1;
        for (let escena of this.escenas) {
            escena.orden = idx++;
        }
    }
    private cargarEscenas(proyectoId: string = "", orden: number = 1) {
        let peticion = this.angularAPIHelper.buildPeticion({ 'proyecto': '57f1687fe942851c18cec84b' }, { 'orden': '1' });
        this.angularAPIHelper.getByFilter('escenasPorFiltro', JSON.stringify(peticion))
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
}
