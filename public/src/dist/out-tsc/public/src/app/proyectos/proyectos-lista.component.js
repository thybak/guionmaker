"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var AngularAPIHelper_1 = require("../utils/AngularAPIHelper");
var LocalStorageService_1 = require("../utils/LocalStorageService");
var ProyectosModel_1 = require("./models/ProyectosModel");
var botones_guardado_component_1 = require("../utils/botones-guardado.component");
var ProyectosListComponent = (function () {
    function ProyectosListComponent(angularAPIHelper, localStorageService) {
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        this.mostrarCancelados = false;
        this.botonesGuardado = new botones_guardado_component_1.BotonesGuardado();
        this.botonesGuardado.cargarSoloModales();
        this.cargarProyectos();
    }
    ProyectosListComponent.prototype.cargarProyectos = function () {
        var _this = this;
        ProyectosModel_1.ProyectoModel.getProyectosByAutorAndEstado(this.localStorageService.getPropiedad('usuarioLogeado'), this.mostrarCancelados, this.angularAPIHelper).subscribe(function (response) { _this.proyectos = response.consulta; }, null, null);
    };
    ProyectosListComponent.prototype.actualizarProyectoAModificar = function (cancelado) {
        var _this = this;
        this.proyectoAModificar.cancelado = cancelado;
        if (this.proyectoAModificar.cancelado && this.proyectoAModificar._id == this.localStorageService.getPropiedad('proyectoActual')) {
            this.localStorageService.deletePropiedad('proyectoActual');
            this.localStorageService.deletePropiedad('nombreProyectoActual');
        }
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(this.proyectoAModificar)).subscribe(null, null, function () { return _this.cargarProyectos(); });
    };
    ProyectosListComponent.prototype.onNuevoProyecto = function () {
        var _this = this;
        var proyecto = new ProyectosModel_1.ProyectoModel();
        proyecto.autor = this.localStorageService.getPropiedad('usuarioLogeado');
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(proyecto)).subscribe(null, null, function () { return _this.cargarProyectos(); });
    };
    ProyectosListComponent.prototype.onModificar = function (proyecto) {
        this.proyectoAModificar = proyecto;
    };
    ProyectosListComponent.prototype.toggleMostrarCancelados = function () {
        this.mostrarCancelados = !this.mostrarCancelados;
        this.cargarProyectos();
    };
    ProyectosListComponent.prototype.onAccionGuardado = function (event) {
        if (event == botones_guardado_component_1.TipoOperacionGuardado.CancelarRegistro) {
            this.actualizarProyectoAModificar(true);
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.Restaurar) {
            this.actualizarProyectoAModificar(false);
        }
    };
    return ProyectosListComponent;
}());
ProyectosListComponent = __decorate([
    core_1.Component({
        selector: 'lista-proyectos',
        templateUrl: './templates/proyectos-lista.component.html',
        providers: [AngularAPIHelper_1.AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService])
], ProyectosListComponent);
exports.ProyectosListComponent = ProyectosListComponent;
//# sourceMappingURL=proyectos-lista.component.js.map