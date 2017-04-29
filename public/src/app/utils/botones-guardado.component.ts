import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModoColaborador } from './ModoColaborador';
import { AngularAPIHelper } from './AngularAPIHelper';
import { LocalStorageService } from './LocalStorageService';

export enum TipoOperacionGuardado {
    Guardar,
    Eliminar,
    Volver,
    Restaurar,
    CancelarEliminacion,
    CancelarRegistro
}
export class BotonesGuardado {
    mostrarGuardado: boolean;
    mostrarBorrado: boolean;
    mostrarVolver: boolean;
    mostrarCancelar: boolean;
    mostrarVolverConfirmacion: boolean;

    constructor() {
        this.mostrarGuardado = true;
    }
    mostrarCompleto(sinConfirmacionVolver: boolean = true) {
        this.mostrarGuardado = true;
        this.mostrarBorrado = true;
        this.mostrarVolver = sinConfirmacionVolver;
        this.mostrarVolverConfirmacion = !sinConfirmacionVolver;
    }
    mostrarBasicoVolver() {
        this.mostrarVolver = true;
    }
    mostrarBasico() {
        this.mostrarGuardado = true;
        this.mostrarBorrado = true;
    }
    mostrarCompletoCancelar(sinConfirmacionVolver: boolean = true) {
        this.mostrarGuardado = true;
        this.mostrarCancelar = true;
        this.mostrarVolver = sinConfirmacionVolver;
        this.mostrarVolverConfirmacion = !sinConfirmacionVolver;
    }
    mostrarSoloVolver(sinConfirmacion: boolean = true) {
        this.mostrarVolver = sinConfirmacion;
        this.mostrarVolverConfirmacion = !sinConfirmacion;
        this.mostrarGuardado = false;
    }
    cargarSoloModales() {
        this.mostrarGuardado = false;
    }
}
@Component({
    templateUrl: './templates/botones-guardado.component.html',
    selector: 'botones-guardado'
})
export class BotonesGuardadoComponent extends ModoColaborador {
    @Input()
    oBotonesGuardado: BotonesGuardado;
    @Output()
    onAccionGuardado: EventEmitter<TipoOperacionGuardado> = new EventEmitter<TipoOperacionGuardado>();

    constructor(angularAPIHelper: AngularAPIHelper, localStorageService: LocalStorageService) {
        super(angularAPIHelper, localStorageService, true);
        this.usuarioLogeadoAutor = window.location.pathname.indexOf("proyectos") >= 0; // wa para permitir guardar cambios cuando estamos bajo la ruta de proyectos
    }

    onGuardarCambios() {
        if (this.usuarioLogeadoAutor) {
            this.onAccionGuardado.emit(TipoOperacionGuardado.Guardar);
        }
    }
    onEliminar() {
        if (this.usuarioLogeadoAutor) {
            this.onAccionGuardado.emit(TipoOperacionGuardado.Eliminar);
        }
    }
    onVolver() {
        this.onAccionGuardado.emit(TipoOperacionGuardado.Volver);
    }
    onRestaurar() {
        if (this.usuarioLogeadoAutor) {
            this.onAccionGuardado.emit(TipoOperacionGuardado.Restaurar);
        }
    }
    onCancelarEliminar() {
        if (this.usuarioLogeadoAutor) {
            this.onAccionGuardado.emit(TipoOperacionGuardado.CancelarEliminacion);
        }
    }
    onCancelar() {
        if (this.usuarioLogeadoAutor) {
            this.onAccionGuardado.emit(TipoOperacionGuardado.CancelarRegistro);
        }
    }
}
