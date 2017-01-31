import { Component, Input, Output, EventEmitter } from '@angular/core';

export enum TipoOperacionGuardado {
    Guardar,
    Eliminar,
    Volver,
    Restaurar
}
export class BotonesGuardado {
    mostrarGuardado: boolean;
    mostrarBorrado: boolean;
    mostrarVolver: boolean;
    mostrarCancelar: boolean;

    constructor() {
        this.mostrarGuardado = true;
    }
    mostrarCompleto() {
        this.mostrarGuardado = true;
        this.mostrarBorrado = true;
        this.mostrarVolver = true;
    }
    mostrarBasico() {
        this.mostrarGuardado = true;
        this.mostrarBorrado = true;
    }
    mostrarCompletoCancelar() {
        this.mostrarGuardado = true;
        this.mostrarCancelar = true;
        this.mostrarVolver = true;
    }
    mostrarSoloVolver() {
        this.mostrarGuardado = false;
        this.mostrarVolver = true;
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
}
