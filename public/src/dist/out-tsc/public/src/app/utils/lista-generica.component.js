var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularAPIHelper, ResponseStatus } from './AngularAPIHelper';
import { BotonesGuardado, TipoOperacionGuardado } from './botones-guardado.component';
export class ListaGenerica {
    constructor(titulo, entidad, entidadPorFiltro, peticion, nuevoElemento) {
        this.titulo = titulo;
        this.entidad = entidad;
        this.entidadPorFiltro = entidadPorFiltro;
        this.peticion = peticion;
        this.nuevoElemento = nuevoElemento;
    }
}
let ListaGenericaComponent = class ListaGenericaComponent {
    constructor(angularAPIHelper, router) {
        this.angularAPIHelper = angularAPIHelper;
        this.router = router;
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarSoloVolver();
    }
    ngOnInit() {
        this.cargarElementos();
    }
    cargarElementos() {
        this.angularAPIHelper.postEntryOrFilter(this.listaGenerica.entidadPorFiltro, JSON.stringify(this.listaGenerica.peticion))
            .subscribe(response => {
            let respuesta = response;
            if (respuesta.estado == ResponseStatus.OK) {
                this.elementos = respuesta.consulta;
            }
        }, error => console.log(error));
    }
    onNuevoElemento() {
        let elemento = this.listaGenerica.nuevoElemento;
        this.angularAPIHelper.postEntryOrFilter(this.listaGenerica.entidad, JSON.stringify(elemento))
            .subscribe(response => {
            let respuesta = response;
            if (respuesta.estado == ResponseStatus.OK) {
                this.elementos.push(respuesta.insertado); // ya incluye el identificador generado en MongoDB.
            }
        });
    }
    setElementoAEliminar(elemento) {
        this.elementoAEliminar = elemento;
    }
    eliminarElemento() {
        this.angularAPIHelper.deleteById(this.listaGenerica.entidad, this.elementoAEliminar._id).subscribe(null, null, () => this.cargarElementos());
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/biblia']);
        }
        else if (event == TipoOperacionGuardado.Eliminar) {
            this.eliminarElemento();
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", ListaGenerica)
], ListaGenericaComponent.prototype, "listaGenerica", void 0);
ListaGenericaComponent = __decorate([
    Component({
        selector: 'lista-generica',
        templateUrl: './templates/lista-generica.component.html',
        providers: [AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, Router])
], ListaGenericaComponent);
export { ListaGenericaComponent };
//# sourceMappingURL=lista-generica.component.js.map