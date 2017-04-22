var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
export class ConfirmacionGuardado {
    constructor() {
        this.estadosMultiguardado = [];
    }
    limpiarEstadosMultiguardado() {
        this.estadosMultiguardado = [];
    }
    setEstadoMultiguardado(elemento, isOk) {
        if (isOk) {
            this.estadosMultiguardado.push(elemento + " guardado OK.");
        }
        else {
            this.estadosMultiguardado.push(elemento + " no guardado.");
        }
    }
    retirarAviso() {
        this.guardadoOk = false;
        this.guardadoKo = false;
        this.limpiarEstadosMultiguardado();
        clearTimeout(this.timeoutVal);
        this.timeoutVal = undefined;
    }
    setTimeoutRetirarAviso(timeOutMs = 5000) {
        this.timeoutVal = setTimeout(() => { this.retirarAviso(); }, timeOutMs);
    }
    setEstadoGuardado(guardadoOk) {
        this.guardadoOk = guardadoOk;
        this.guardadoKo = !guardadoOk;
    }
}
let ConfirmacionGuardadoComponent = class ConfirmacionGuardadoComponent {
};
__decorate([
    Input(),
    __metadata("design:type", ConfirmacionGuardado)
], ConfirmacionGuardadoComponent.prototype, "oConfirm", void 0);
ConfirmacionGuardadoComponent = __decorate([
    Component({
        selector: 'confirmacion-guardado',
        templateUrl: './templates/confirmacion-guardado.component.html'
    })
], ConfirmacionGuardadoComponent);
export { ConfirmacionGuardadoComponent };
//# sourceMappingURL=confirmacion-guardado.component.js.map