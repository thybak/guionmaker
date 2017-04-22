var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoModel } from './proyectos/models/ProyectosModel';
import { AngularAPIHelper } from './utils/AngularAPIHelper';
import { LocalStorageService } from './utils/LocalStorageService';
let IndexComponent = class IndexComponent {
    constructor(angularAPIHelper, localStorageService, router) {
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        this.router = router;
        if (this.angularAPIHelper.usuarioLogeado(this.localStorageService)) {
            ProyectoModel.getProyectosByAutorAndEstado(this.localStorageService.getPropiedad('usuarioLogeado'), false, angularAPIHelper).subscribe(response => {
                this.proyectos = response.consulta;
                this.proyectoActual = localStorage.getItem('proyectoActual');
                if (this.proyectoActual == null && this.proyectos != undefined && this.proyectos.length > 0) {
                    this.proyectoActual = this.proyectos[0]._id;
                }
            });
        }
        else {
            this.router.navigate(['login']);
        }
    }
    setProyectoActual() {
        if (this.proyectoActual != null) {
            let proyecto = this.proyectos.find(x => x._id == this.proyectoActual);
            this.localStorageService.setPropiedad('proyectoActual', this.proyectoActual);
            this.localStorageService.setPropiedad('nombreProyectoActual', proyecto.nombre);
        }
    }
};
IndexComponent = __decorate([
    Component({
        templateUrl: './templates/index.component.html',
        providers: [AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, LocalStorageService, Router])
], IndexComponent);
export { IndexComponent };
//# sourceMappingURL=index.component.js.map