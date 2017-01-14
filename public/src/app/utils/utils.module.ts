import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConfirmacionGuardadoComponent } from './confirmacion-guardado.component';
import { BotonesGuardadoComponent } from './botones-guardado.component';

@NgModule({
    declarations: [ConfirmacionGuardadoComponent, BotonesGuardadoComponent],
    imports: [CommonModule, FormsModule],
    exports: [ConfirmacionGuardadoComponent, BotonesGuardadoComponent]
})
export class UtilsModule { }