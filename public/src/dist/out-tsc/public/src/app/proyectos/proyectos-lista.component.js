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
import { AngularAPIHelper } from '../utils/AngularAPIHelper';
import { LocalStorageService } from '../utils/LocalStorageService';
import { ProyectoModel } from './models/ProyectosModel';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';
let ProyectosListComponent = class ProyectosListComponent {
    constructor(angularAPIHelper, localStorageService) {
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        this.mostrarCancelados = false;
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.cargarSoloModales();
        this.cargarProyectos();
    }
    cargarProyectos() {
        ProyectoModel.getProyectosByAutorAndEstado(this.localStorageService.getPropiedad('usuarioLogeado'), this.mostrarCancelados, this.angularAPIHelper).subscribe(response => { this.proyectos = response.consulta; }, null, null);
    }
    actualizarProyectoAModificar(cancelado) {
        this.proyectoAModificar.cancelado = cancelado;
        if (this.proyectoAModificar.cancelado && this.proyectoAModificar._id == this.localStorageService.getPropiedad('proyectoActual')) {
            this.localStorageService.deletePropiedad('proyectoActual');
            this.localStorageService.deletePropiedad('nombreProyectoActual');
        }
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(this.proyectoAModificar)).subscribe(null, null, () => this.cargarProyectos());
    }
    onNuevoProyecto() {
        let proyecto = new ProyectoModel();
        proyecto.autor = this.localStorageService.getPropiedad('usuarioLogeado');
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(proyecto)).subscribe(null, null, () => this.cargarProyectos());
    }
    onModificar(proyecto) {
        this.proyectoAModificar = proyecto;
    }
    toggleMostrarCancelados() {
        this.mostrarCancelados = !this.mostrarCancelados;
        this.cargarProyectos();
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.CancelarRegistro) {
            this.actualizarProyectoAModificar(true);
        }
        else if (event == TipoOperacionGuardado.Restaurar) {
            this.actualizarProyectoAModificar(false);
        }
    }
};
ProyectosListComponent = __decorate([
    Component({
        selector: 'lista-proyectos',
        templateUrl: './templates/proyectos-lista.component.html',
        providers: [AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, LocalStorageService])
], ProyectosListComponent);
export { ProyectosListComponent };
//# sourceMappingURL=proyectos-lista.component.js.map