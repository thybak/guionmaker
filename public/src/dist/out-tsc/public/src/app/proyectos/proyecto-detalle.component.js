var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, KeyValueDiffers } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularAPIHelper, ResponseStatus } from '../utils/AngularAPIHelper';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { GeneroModel } from './models/GenerosModel';
import { ClasificacionModel } from './models/ClasificacionesModel';
import { GestorColaboraciones } from './gestor-colaboraciones.component';
import { LocalStorageService } from '../utils/LocalStorageService';
let DetalleProyectoComponent = class DetalleProyectoComponent {
    constructor(angularAPIHelper, router, route, localStorageService, differs) {
        this.angularAPIHelper = angularAPIHelper;
        this.router = router;
        this.route = route;
        this.localStorageService = localStorageService;
        this.differs = differs;
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompletoCancelar();
        this.cargarSelects();
        this.differ = differs.find({}).create(null);
        this.ng2config = {
            minHeight: 200,
            lang: 'es-ES',
            placeholder: 'Escribe tu texto...',
            toolbar: [
                ['style', ['fontname', 'clear']],
                ['fontstyle', ['bold', 'italic', 'paragraph']],
                ['fontstyleextra', ['strikethrough', 'underline', 'hr', 'color', 'superscript', 'subscript']],
                ['extra', ['table', 'height']],
                ['misc', ['undo', 'redo', 'codeview']]
            ],
            fontNames: ['Courier New', 'Arial', 'Arial Black', 'Sans-serif', 'Serif']
        };
        this.route.params.switchMap((params) => this.angularAPIHelper.postEntryOrFilter('proyectosPorFiltro', JSON.stringify(this.angularAPIHelper.buildPeticion({ '_id': params['id'], 'cancelado': false }, '')))).
            subscribe(response => this.cargarModelo(response));
    }
    cargarSelects() {
        GeneroModel.getAll(this.angularAPIHelper).subscribe(response => this.generos = response.consulta);
        ClasificacionModel.getAll(this.angularAPIHelper).subscribe(response => this.clasificaciones = response.consulta);
    }
    cargarModelo(proyecto) {
        this.proyecto = proyecto.consulta[0];
        this.gestorColaboraciones = new GestorColaboraciones(this.angularAPIHelper, this.proyecto._id); // carga de colaboradores
        this.proyecto.sinopsis = this.proyecto.sinopsis == "" || this.proyecto.sinopsis == undefined ? new String('') : this.proyecto.sinopsis; // workaround por culpa del componente ng2-summernote donde con "" no se muestra nada.
    }
    guardarCambios(exit) {
        this.proyecto.fechaModificacion = new Date();
        this.proyecto.sinopsis = this.proyecto.sinopsis == undefined ? new String('') : this.proyecto.sinopsis; // wa para el módulo ng-summernote con undefined
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(this.proyecto)).subscribe(response => {
            this.respuesta = response;
        }, error => {
            this.confirmacionGuardado.setEstadoGuardado(false);
            this.confirmacionGuardado.setTimeoutRetirarAviso();
        }, () => {
            let isOk = this.respuesta.estado == ResponseStatus.OK;
            if (!isOk) {
                console.log(this.respuesta.error);
            }
            this.confirmacionGuardado.setEstadoGuardado(isOk);
            this.confirmacionGuardado.setTimeoutRetirarAviso();
            this.botonesGuardado.mostrarCompletoCancelar();
            if (exit && isOk) {
                this.router.navigate(['/proyectos']);
            }
        });
    }
    ngDoCheck() {
        let changes = this.differ.diff(this.proyecto);
        if (changes != undefined && changes._changesTail != undefined) {
            this.botonesGuardado.mostrarCompletoCancelar(false);
        }
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.localStorageService.setPropiedad('nombreProyectoActual', this.proyecto.nombre);
            this.guardarCambios(false);
        }
        else if (event == TipoOperacionGuardado.Eliminar) {
            this.gestorColaboraciones.eliminarColaboracion();
        }
        else if (event == TipoOperacionGuardado.CancelarRegistro) {
            this.proyecto.cancelado = true;
            if (this.proyecto._id == this.localStorageService.getPropiedad('proyectoActual')) {
                this.localStorageService.deletePropiedad('proyectoActual');
                this.localStorageService.deletePropiedad('nombreProyectoActual');
            }
            this.guardarCambios(true);
        }
        else if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/proyectos']);
        }
        else if (event == TipoOperacionGuardado.CancelarEliminacion) {
            this.gestorColaboraciones.cancelarEliminacion();
        }
    }
};
DetalleProyectoComponent = __decorate([
    Component({
        selector: 'detalle-proyecto',
        templateUrl: './templates/proyecto-detalle.component.html',
        providers: [AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper, Router, ActivatedRoute, LocalStorageService, KeyValueDiffers])
], DetalleProyectoComponent);
export { DetalleProyectoComponent };
//# sourceMappingURL=proyecto-detalle.component.js.map