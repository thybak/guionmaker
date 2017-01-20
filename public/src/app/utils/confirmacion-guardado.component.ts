﻿import { Component, Input } from '@angular/core';

export class ConfirmacionGuardado {
    guardadoOk: boolean;
    guardadoKo: boolean;
    multiguardado: boolean;
    estadosMultiguardado: string[] = [];
    timeoutVal: any;

    limpiarEstadosMultiguardado() {
        this.estadosMultiguardado = [];
    }
    setEstadoMultiguardado(elemento: string, isOk: boolean) {
        console.log(elemento);
        if (isOk) {
            this.estadosMultiguardado.push(elemento + " guardado OK.");
        } else {
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
    setTimeoutRetirarAviso(timeOutMs: number = 5000) {
        this.timeoutVal = setTimeout(() => { this.retirarAviso() }, timeOutMs);
    }
    setEstadoGuardado(guardadoOk: boolean) {
        this.guardadoOk = guardadoOk;
        this.guardadoKo = !guardadoOk;
    }
}

@Component({
    selector: 'confirmacion-guardado',
    templateUrl: './templates/confirmacion-guardado.component.html'
})
export class ConfirmacionGuardadoComponent {
    @Input()
    oConfirm: ConfirmacionGuardado;
}