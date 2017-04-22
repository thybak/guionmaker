var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { UtilsModule } from '../utils/utils.module';
import { EscenasRoutingModule } from './escenas-routing.module';
import { EscenasListComponent } from './escenas-lista.component';
import { DetalleEscenaComponent } from './escena-detalle.component';
let EscenasModule = class EscenasModule {
};
EscenasModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, SortablejsModule, UtilsModule, EscenasRoutingModule],
        declarations: [EscenasListComponent, DetalleEscenaComponent],
        providers: [],
        exports: [EscenasListComponent]
    })
], EscenasModule);
export { EscenasModule };
//# sourceMappingURL=escenas.module.js.map