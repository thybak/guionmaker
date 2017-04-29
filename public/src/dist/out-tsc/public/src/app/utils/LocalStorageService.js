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
var Propiedades;
(function (Propiedades) {
    Propiedades[Propiedades["proyectoActual"] = 0] = "proyectoActual";
    Propiedades[Propiedades["nombreProyectoActual"] = 1] = "nombreProyectoActual";
})(Propiedades = exports.Propiedades || (exports.Propiedades = {}));
var LocalStorageService = (function () {
    function LocalStorageService() {
        this.propiedades = {};
        for (var idx = 0; idx < localStorage.length; idx++) {
            var clave = localStorage.key(idx);
            this.propiedades[clave] = localStorage.getItem(clave);
        }
    }
    LocalStorageService.prototype.setPropiedad = function (clave, valor) {
        localStorage.setItem(clave, valor);
        this.propiedades[clave] = valor;
    };
    LocalStorageService.prototype.getPropiedad = function (clave) {
        return localStorage.getItem(clave);
    };
    LocalStorageService.prototype.deletePropiedad = function (clave) {
        delete this.propiedades[clave];
        return localStorage.removeItem(clave);
    };
    LocalStorageService.prototype.esUsuarioLogeado = function (usuarioId) {
        return this.getPropiedad("usuarioLogeado") == usuarioId;
    };
    LocalStorageService.prototype.mostrarMarcaColaboracion = function (usuarioId) {
        return this.esUsuarioLogeado(usuarioId) ? "" : "(Colaborador)";
    };
    LocalStorageService.prototype.borrar = function () {
        this.propiedades = {};
        localStorage.clear();
    };
    return LocalStorageService;
}());
LocalStorageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], LocalStorageService);
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=LocalStorageService.js.map