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
var router_1 = require("@angular/router");
var ProyectosModel_1 = require("./proyectos/models/ProyectosModel");
var AngularAPIHelper_1 = require("./utils/AngularAPIHelper");
var LocalStorageService_1 = require("./utils/LocalStorageService");
var IndexComponent = (function () {
    function IndexComponent(angularAPIHelper, localStorageService, router) {
        var _this = this;
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        this.router = router;
        if (this.angularAPIHelper.usuarioLogeado(this.localStorageService)) {
            ProyectosModel_1.ProyectoModel.getProyectosByAutorAndEstado(this.localStorageService.getPropiedad('usuarioLogeado'), false, angularAPIHelper).subscribe(function (response) {
                _this.proyectos = response.consulta;
                _this.proyectoActual = localStorage.getItem('proyectoActual');
                if (_this.proyectoActual == null && _this.proyectos != undefined && _this.proyectos.length > 0) {
                    _this.proyectoActual = _this.proyectos[0]._id;
                }
            });
        }
        else {
            this.router.navigate(['login']);
        }
    }
    IndexComponent.prototype.setProyectoActual = function () {
        var _this = this;
        if (this.proyectoActual != null) {
            var proyecto = this.proyectos.find(function (x) { return x._id == _this.proyectoActual; });
            this.localStorageService.setPropiedad('proyectoActual', this.proyectoActual);
            this.localStorageService.setPropiedad('nombreProyectoActual', proyecto.nombre);
        }
    };
    return IndexComponent;
}());
IndexComponent = __decorate([
    core_1.Component({
        templateUrl: './templates/index.component.html',
        providers: [AngularAPIHelper_1.AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, LocalStorageService_1.LocalStorageService, router_1.Router])
], IndexComponent);
exports.IndexComponent = IndexComponent;
//# sourceMappingURL=index.component.js.map