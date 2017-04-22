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
import { ListaGenerica } from '../utils/lista-generica.component';
import { LocalStorageService } from '../utils/LocalStorageService';
import { PersonajeModel } from './models/PersonajesModel';
let PersonajesListaComponent = class PersonajesListaComponent {
    constructor(angularAPIHelper, localStorageService) {
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        let nuevoPersonaje = new PersonajeModel();
        nuevoPersonaje.proyecto = this.localStorageService.getPropiedad('proyectoActual');
        this.listaGenerica = new ListaGenerica("Listado de personajes de la biblia literaria", "personaje", "personajesPorFiltro", this.angularAPIHelper.buildPeticion({ proyecto: this.localStorageService.getPropiedad('proyectoActual') }, {}, "nombre proyecto"), nuevoPersonaje);
    }
};
PersonajesListaComponent = __decorate([
    Component({
        selector: 'personajes-lista',
        templateUrl: './templates/personajes-lista.component.html',
        providers: [LocalStorageService, AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, LocalStorageService])
], PersonajesListaComponent);
export { PersonajesListaComponent };
//# sourceMappingURL=personajes-lista.component.js.map