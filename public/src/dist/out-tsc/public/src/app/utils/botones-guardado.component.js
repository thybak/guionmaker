"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var TipoOperacionGuardado;
(function (TipoOperacionGuardado) {
    TipoOperacionGuardado[TipoOperacionGuardado["Guardar"] = 0] = "Guardar";
    TipoOperacionGuardado[TipoOperacionGuardado["Eliminar"] = 1] = "Eliminar";
    TipoOperacionGuardado[TipoOperacionGuardado["Volver"] = 2] = "Volver";
    TipoOperacionGuardado[TipoOperacionGuardado["Restaurar"] = 3] = "Restaurar";
    TipoOperacionGuardado[TipoOperacionGuardado["CancelarEliminacion"] = 4] = "CancelarEliminacion";
    TipoOperacionGuardado[TipoOperacionGuardado["CancelarRegistro"] = 5] = "CancelarRegistro";
})(TipoOperacionGuardado = exports.TipoOperacionGuardado || (exports.TipoOperacionGuardado = {}));
var BotonesGuardado = (function () {
    function BotonesGuardado() {
        this.mostrarGuardado = true;
    }
    BotonesGuardado.prototype.mostrarCompleto = function (sinConfirmacionVolver) {
        if (sinConfirmacionVolver === void 0) { sinConfirmacionVolver = true; }
        this.mostrarGuardado = true;
        this.mostrarBorrado = true;
        this.mostrarVolver = sinConfirmacionVolver;
        this.mostrarVolverConfirmacion = !sinConfirmacionVolver;
    };
    BotonesGuardado.prototype.mostrarBasicoVolver = function () {
        this.mostrarVolver = true;
    };
    BotonesGuardado.prototype.mostrarBasico = function () {
        this.mostrarGuardado = true;
        this.mostrarBorrado = true;
    };
    BotonesGuardado.prototype.mostrarCompletoCancelar = function (sinConfirmacionVolver) {
        if (sinConfirmacionVolver === void 0) { sinConfirmacionVolver = true; }
        this.mostrarGuardado = true;
        this.mostrarCancelar = true;
        this.mostrarVolver = sinConfirmacionVolver;
        this.mostrarVolverConfirmacion = !sinConfirmacionVolver;
    };
    BotonesGuardado.prototype.mostrarSoloVolver = function (sinConfirmacion) {
        if (sinConfirmacion === void 0) { sinConfirmacion = true; }
        this.mostrarVolver = sinConfirmacion;
        this.mostrarVolverConfirmacion = !sinConfirmacion;
        this.mostrarGuardado = false;
    };
    BotonesGuardado.prototype.cargarSoloModales = function () {
        this.mostrarGuardado = false;
    };
    return BotonesGuardado;
}());
exports.BotonesGuardado = BotonesGuardado;
var BotonesGuardadoComponent = (function () {
    function BotonesGuardadoComponent() {
        this.onAccionGuardado = new core_1.EventEmitter();
    }
    BotonesGuardadoComponent.prototype.onGuardarCambios = function () {
        this.onAccionGuardado.emit(TipoOperacionGuardado.Guardar);
    };
    BotonesGuardadoComponent.prototype.onEliminar = function () {
        this.onAccionGuardado.emit(TipoOperacionGuardado.Eliminar);
    };
    BotonesGuardadoComponent.prototype.onVolver = function () {
        this.onAccionGuardado.emit(TipoOperacionGuardado.Volver);
    };
    BotonesGuardadoComponent.prototype.onRestaurar = function () {
        this.onAccionGuardado.emit(TipoOperacionGuardado.Restaurar);
    };
    BotonesGuardadoComponent.prototype.onCancelarEliminar = function () {
        this.onAccionGuardado.emit(TipoOperacionGuardado.CancelarEliminacion);
    };
    BotonesGuardadoComponent.prototype.onCancelar = function () {
        this.onAccionGuardado.emit(TipoOperacionGuardado.CancelarRegistro);
    };
    return BotonesGuardadoComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", BotonesGuardado)
], BotonesGuardadoComponent.prototype, "oBotonesGuardado", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BotonesGuardadoComponent.prototype, "onAccionGuardado", void 0);
BotonesGuardadoComponent = __decorate([
    core_1.Component({
        templateUrl: './templates/botones-guardado.component.html',
        selector: 'botones-guardado'
    })
], BotonesGuardadoComponent);
exports.BotonesGuardadoComponent = BotonesGuardadoComponent;
//# sourceMappingURL=botones-guardado.component.js.map