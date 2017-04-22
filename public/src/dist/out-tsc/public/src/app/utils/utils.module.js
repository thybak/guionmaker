var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmacionGuardadoComponent } from './confirmacion-guardado.component';
import { ListaGenericaComponent } from './lista-generica.component';
import { BotonesGuardadoComponent } from './botones-guardado.component';
import { GestorSubidaComponent } from './gestor-subida.component';
import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';
let UtilsModule = class UtilsModule {
};
UtilsModule = __decorate([
    NgModule({
        declarations: [ConfirmacionGuardadoComponent, BotonesGuardadoComponent, Ng2Summernote, ListaGenericaComponent, GestorSubidaComponent],
        imports: [CommonModule, FormsModule, RouterModule],
        exports: [ConfirmacionGuardadoComponent, BotonesGuardadoComponent, Ng2Summernote, ListaGenericaComponent, GestorSubidaComponent]
    })
], UtilsModule);
export { UtilsModule };
//# sourceMappingURL=utils.module.js.map