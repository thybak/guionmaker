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
var ConfirmacionGuardado = (function () {
    function ConfirmacionGuardado() {
        this.estadosMultiguardado = [];
    }
    ConfirmacionGuardado.prototype.limpiarEstadosMultiguardado = function () {
        this.estadosMultiguardado = [];
    };
    ConfirmacionGuardado.prototype.setEstadoMultiguardado = function (elemento, isOk) {
        if (isOk) {
            this.estadosMultiguardado.push(elemento + " guardado OK.");
        }
        else {
            this.estadosMultiguardado.push(elemento + " no guardado.");
        }
    };
    ConfirmacionGuardado.prototype.retirarAviso = function () {
        this.guardadoOk = false;
        this.guardadoKo = false;
        this.limpiarEstadosMultiguardado();
        clearTimeout(this.timeoutVal);
        this.timeoutVal = undefined;
    };
    ConfirmacionGuardado.prototype.setTimeoutRetirarAviso = function (timeOutMs) {
        var _this = this;
        if (timeOutMs === void 0) { timeOutMs = 5000; }
        this.timeoutVal = setTimeout(function () { _this.retirarAviso(); }, timeOutMs);
    };
    ConfirmacionGuardado.prototype.setEstadoGuardado = function (guardadoOk) {
        this.guardadoOk = guardadoOk;
        this.guardadoKo = !guardadoOk;
    };
    return ConfirmacionGuardado;
}());
exports.ConfirmacionGuardado = ConfirmacionGuardado;
var ConfirmacionGuardadoComponent = (function () {
    function ConfirmacionGuardadoComponent() {
    }
    return ConfirmacionGuardadoComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", ConfirmacionGuardado)
], ConfirmacionGuardadoComponent.prototype, "oConfirm", void 0);
ConfirmacionGuardadoComponent = __decorate([
    core_1.Component({
        selector: 'confirmacion-guardado',
        templateUrl: './templates/confirmacion-guardado.component.html'
    })
], ConfirmacionGuardadoComponent);
exports.ConfirmacionGuardadoComponent = ConfirmacionGuardadoComponent;
//# sourceMappingURL=confirmacion-guardado.component.js.map