import { Component, Input } from '@angular/core';

export class ConfirmacionGuardado {
    guardadoOk: boolean;
    guardadoKo: boolean;
    timeoutVal: any;

    retirarAviso() {
        this.guardadoOk = false;
        this.guardadoKo = false;
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