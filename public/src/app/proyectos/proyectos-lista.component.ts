﻿import { Component } from '@angular/core';
import { AngularAPIHelper, RespuestaJson } from '../utils/AngularAPIHelper';
import { LocalStorageService } from '../utils/LocalStorageService';
import { ProyectoModel } from './models/ProyectosModel';
import { BotonesGuardadoComponent, BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';

@Component({
    selector: 'lista-proyectos',
    templateUrl: './templates/proyectos-lista.component.html',
    providers: [AngularAPIHelper]
})
export class ProyectosListComponent {
    proyectos: ProyectoModel[];
    usuarioLogeado: string;
    proyectoAModificar: ProyectoModel;
    mostrarCancelados: boolean;
    botonesGuardado: BotonesGuardado;

    constructor(private angularAPIHelper: AngularAPIHelper, private localStorageService : LocalStorageService) {
        this.mostrarCancelados = false;
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.cargarSoloModales();
        this.cargarProyectos();
        this.usuarioLogeado = this.localStorageService.getPropiedad('usuarioLogeado');
    }
    private cargarProyectos() {
        ProyectoModel.getProyectosByEstado(this.mostrarCancelados, this.angularAPIHelper).subscribe(
            response => { this.proyectos = (response as RespuestaJson).consulta as ProyectoModel[]; }, null, null);
    }
    private actualizarProyectoAModificar(cancelado: boolean) {
        this.proyectoAModificar.cancelado = cancelado;
        if (this.proyectoAModificar.cancelado && this.proyectoAModificar._id == this.localStorageService.getPropiedad('proyectoActual')) {
            this.localStorageService.deletePropiedad('proyectoActual');
            this.localStorageService.deletePropiedad('nombreProyectoActual');
        }
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(this.proyectoAModificar)).subscribe(null, null, () => this.cargarProyectos());
    }
    onNuevoProyecto() {
        let proyecto: ProyectoModel = new ProyectoModel();
        proyecto.autor = this.localStorageService.getPropiedad('usuarioLogeado');
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(proyecto)).subscribe(null, null, () => this.cargarProyectos());
    }
    onModificar(proyecto: any) {
        this.proyectoAModificar = proyecto as ProyectoModel;
    }
    toggleMostrarCancelados() {
        this.mostrarCancelados = !this.mostrarCancelados;
        this.cargarProyectos();
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.CancelarRegistro) {
            this.actualizarProyectoAModificar(true);
        } else if (event == TipoOperacionGuardado.Restaurar) {
            this.actualizarProyectoAModificar(false);
        }
    }

}