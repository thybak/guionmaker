"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var proyectos_lista_component_1 = require("./proyectos-lista.component");
var proyecto_detalle_component_1 = require("./proyecto-detalle.component");
var ProyectosRoutingModule = (function () {
    function ProyectosRoutingModule() {
    }
    return ProyectosRoutingModule;
}());
ProyectosRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild([{
                    path: 'proyectos',
                    children: [
                        { path: '', component: proyectos_lista_component_1.ProyectosListComponent },
                        { path: ':id', component: proyecto_detalle_component_1.DetalleProyectoComponent }
                    ]
                }])],
        exports: [router_1.RouterModule]
    })
], ProyectosRoutingModule);
exports.ProyectosRoutingModule = ProyectosRoutingModule;
//# sourceMappingURL=proyectos-routing.module.js.map