var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { BibliaRoutingModule } from './biblia-routing.module';
import { BibliaComponent } from './biblia.component';
import { EscenariosListaComponent } from './escenarios-lista.component';
import { PersonajesListaComponent } from './personajes-lista.component';
import { DetallePersonajeComponent } from './personaje-detalle.component';
import { DetalleEscenarioComponent } from './escenario-detalle.component';
let BibliaModule = class BibliaModule {
};
BibliaModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, UtilsModule, BibliaRoutingModule],
        declarations: [BibliaComponent, EscenariosListaComponent, PersonajesListaComponent, DetallePersonajeComponent, DetalleEscenarioComponent]
    })
], BibliaModule);
export { BibliaModule };
//# sourceMappingURL=biblia.module.js.map