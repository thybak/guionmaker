var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BibliaComponent } from './biblia.component';
import { EscenariosListaComponent } from './escenarios-lista.component';
import { PersonajesListaComponent } from './personajes-lista.component';
import { DetallePersonajeComponent } from './personaje-detalle.component';
import { DetalleEscenarioComponent } from './escenario-detalle.component';
const bibliaRoutes = [
    {
        path: 'biblia',
        children: [
            { path: '', component: BibliaComponent },
            {
                path: 'personajes',
                children: [
                    { path: '', component: PersonajesListaComponent },
                    { path: ':id', component: DetallePersonajeComponent }
                ]
            },
            {
                path: 'escenarios',
                children: [
                    { path: '', component: EscenariosListaComponent },
                    { path: ':id', component: DetalleEscenarioComponent }
                ]
            }
        ]
    }
];
let BibliaRoutingModule = class BibliaRoutingModule {
};
BibliaRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(bibliaRoutes)],
        exports: [RouterModule]
    })
], BibliaRoutingModule);
export { BibliaRoutingModule };
//# sourceMappingURL=biblia-routing.module.js.map