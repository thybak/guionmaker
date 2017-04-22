var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProyectosListComponent } from './proyectos-lista.component';
import { DetalleProyectoComponent } from './proyecto-detalle.component';
let ProyectosRoutingModule = class ProyectosRoutingModule {
};
ProyectosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild([{
                    path: 'proyectos',
                    children: [
                        { path: '', component: ProyectosListComponent },
                        { path: ':id', component: DetalleProyectoComponent }
                    ]
                }])],
        exports: [RouterModule]
    })
], ProyectosRoutingModule);
export { ProyectosRoutingModule };
//# sourceMappingURL=proyectos-routing.module.js.map