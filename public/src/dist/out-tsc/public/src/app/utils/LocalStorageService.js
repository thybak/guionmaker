var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
export var Propiedades;
(function (Propiedades) {
    Propiedades[Propiedades["proyectoActual"] = 0] = "proyectoActual";
    Propiedades[Propiedades["nombreProyectoActual"] = 1] = "nombreProyectoActual";
})(Propiedades || (Propiedades = {}));
let LocalStorageService = class LocalStorageService {
    constructor() {
        this.propiedades = {};
        for (let idx = 0; idx < localStorage.length; idx++) {
            let clave = localStorage.key(idx);
            this.propiedades[clave] = localStorage.getItem(clave);
        }
    }
    setPropiedad(clave, valor) {
        localStorage.setItem(clave, valor);
        this.propiedades[clave] = valor;
    }
    getPropiedad(clave) {
        return localStorage.getItem(clave);
    }
    deletePropiedad(clave) {
        delete this.propiedades[clave];
        return localStorage.removeItem(clave);
    }
    borrar() {
        this.propiedades = {};
        localStorage.clear();
    }
};
LocalStorageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], LocalStorageService);
export { LocalStorageService };
//# sourceMappingURL=LocalStorageService.js.map