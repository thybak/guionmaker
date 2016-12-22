import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConfirmacionGuardadoComponent } from './confirmacionGuardado.component';

@NgModule({
    declarations: [ConfirmacionGuardadoComponent],
    imports: [CommonModule, FormsModule],
    exports: [ConfirmacionGuardadoComponent]
})
export class UtilsModule { }