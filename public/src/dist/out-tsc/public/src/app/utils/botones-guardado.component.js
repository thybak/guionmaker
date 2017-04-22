var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
export var TipoOperacionGuardado;
(function (TipoOperacionGuardado) {
    TipoOperacionGuardado[TipoOperacionGuardado["Guardar"] = 0] = "Guardar";
    TipoOperacionGuardado[TipoOperacionGuardado["Eliminar"] = 1] = "Eliminar";
    TipoOperacionGuardado[TipoOperacionGuardado["Volver"] = 2] = "Volver";
    TipoOperacionGuardado[TipoOperacionGuardado["Restaurar"] = 3] = "Restaurar";
    TipoOperacionGuardado[TipoOperacionGuardado["CancelarEliminacion"] = 4] = "CancelarEliminacion";
    TipoOperacionGuardado[TipoOperacionGuardado["CancelarRegistro"] = 5] = "CancelarRegistro";
})(TipoOperacionGuardado || (TipoOperacionGuardado = {}));
export class BotonesGuardado {
    constructor() {
        this.mostrarGuardado = true;
    }
    mostrarCompleto(sinConfirmacionVolver = true) {
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
    mostrarCompletoCancelar(sinConfirmacionVolver = true) {
        this.mostrarGuardado = true;
        this.mostrarCancelar = true;
        this.mostrarVolver = sinConfirmacionVolver;
        this.mostrarVolverConfirmacion = !sinConfirmacionVolver;
    }
    mostrarSoloVolver(sinConfirmacion = true) {
        this.mostrarVolver = sinConfirmacion;
        this.mostrarVolverConfirmacion = !sinConfirmacion;
        this.mostrarGuardado = false;
    }
    cargarSoloModales() {
        this.mostrarGuardado = false;
    }
}
let BotonesGuardadoComponent = class BotonesGuardadoComponent {
    constructor() {
        this.onAccionGuardado = new EventEmitter();
    }
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
};
__decorate([
    Input(),
    __metadata("design:type", BotonesGuardado)
], BotonesGuardadoComponent.prototype, "oBotonesGuardado", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], BotonesGuardadoComponent.prototype, "onAccionGuardado", void 0);
BotonesGuardadoComponent = __decorate([
    Component({
        templateUrl: './templates/botones-guardado.component.html',
        selector: 'botones-guardado'
    })
], BotonesGuardadoComponent);
export { BotonesGuardadoComponent };
//# sourceMappingURL=botones-guardado.component.js.map