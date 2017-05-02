import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConfirmacionGuardadoComponent } from './confirmacion-guardado.component';
import { ListaGenericaComponent } from './lista-generica.component';
import { BotonesGuardadoComponent } from './botones-guardado.component';
import { GestorSubidaComponent } from './gestor-subida.component';
import { AyudaDiccionariosComponent } from './ayuda-diccionarios.component';
import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb';

@NgModule({
    declarations: [ConfirmacionGuardadoComponent, BotonesGuardadoComponent, Ng2Summernote, ListaGenericaComponent, GestorSubidaComponent, AyudaDiccionariosComponent],
    imports: [CommonModule, FormsModule, RouterModule, Ng2BreadcrumbModule.forRoot()],
    exports: [ConfirmacionGuardadoComponent, BotonesGuardadoComponent, Ng2Summernote, ListaGenericaComponent, GestorSubidaComponent, AyudaDiccionariosComponent, Ng2BreadcrumbModule]
})
export class UtilsModule { }