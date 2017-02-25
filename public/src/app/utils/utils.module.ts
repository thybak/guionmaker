import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConfirmacionGuardadoComponent } from './confirmacion-guardado.component';
import { ListaGenericaComponent } from './lista-generica.component';
import { BotonesGuardadoComponent } from './botones-guardado.component';
import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';

@NgModule({
    declarations: [ConfirmacionGuardadoComponent, BotonesGuardadoComponent, Ng2Summernote, ListaGenericaComponent],
    imports: [CommonModule, FormsModule],
    exports: [ConfirmacionGuardadoComponent, BotonesGuardadoComponent, Ng2Summernote, ListaGenericaComponent]
})
export class UtilsModule { }