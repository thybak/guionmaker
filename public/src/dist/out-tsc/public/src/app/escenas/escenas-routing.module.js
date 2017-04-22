var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EscenasListComponent } from './escenas-lista.component';
import { DetalleEscenaComponent } from './escena-detalle.component';
const escenasRoutes = [
    {
        path: 'escenas',
        children: [
            { path: '', component: EscenasListComponent },
            { path: ':id', component: DetalleEscenaComponent }
        ]
    },
];
let EscenasRoutingModule = class EscenasRoutingModule {
};
EscenasRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(escenasRoutes)],
        exports: [RouterModule]
    })
], EscenasRoutingModule);
export { EscenasRoutingModule };
//# sourceMappingURL=escenas-routing.module.js.map