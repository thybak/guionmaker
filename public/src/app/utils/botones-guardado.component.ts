import { Component, Input, Output, EventEmitter } from '@angular/core';

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
export class BotonesGuardadoComponent {
    @Input()
    oBotonesGuardado: BotonesGuardado;
    @Output()
    onAccionGuardado: EventEmitter<TipoOperacionGuardado> = new EventEmitter<TipoOperacionGuardado>();
    onGuardarCambios() {
        this.onAccionGuardado.emit(TipoOperacionGuardado.Guardar); 
    }
    onEliminar() {
        this.onAccionGuardado.emit(TipoOperacionGuardado.Eliminar);
    }
    onVolver() {
        this.onAccionGuardado.emit(TipoOperacionGuardado.Volver);
    }
    onRestaurar() {
        this.onAccionGuardado.emit(TipoOperacionGuardado.Restaurar);
    }
    onCancelarEliminar() {
        this.onAccionGuardado.emit(TipoOperacionGuardado.CancelarEliminacion);
    }
    onCancelar() {
        this.onAccionGuardado.emit(TipoOperacionGuardado.CancelarRegistro);
    }
}
