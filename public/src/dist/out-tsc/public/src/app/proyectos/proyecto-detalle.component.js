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
var AngularAPIHelper_1 = require("../utils/AngularAPIHelper");
var botones_guardado_component_1 = require("../utils/botones-guardado.component");
var confirmacion_guardado_component_1 = require("../utils/confirmacion-guardado.component");
var GenerosModel_1 = require("./models/GenerosModel");
var ClasificacionesModel_1 = require("./models/ClasificacionesModel");
var gestor_colaboraciones_component_1 = require("./gestor-colaboraciones.component");
var LocalStorageService_1 = require("../utils/LocalStorageService");
var DetalleProyectoComponent = (function () {
    function DetalleProyectoComponent(angularAPIHelper, router, route, localStorageService, differs) {
        var _this = this;
        this.angularAPIHelper = angularAPIHelper;
        this.router = router;
        this.route = route;
        this.localStorageService = localStorageService;
        this.differs = differs;
        this.confirmacionGuardado = new confirmacion_guardado_component_1.ConfirmacionGuardado();
        this.botonesGuardado = new botones_guardado_component_1.BotonesGuardado();
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
        this.route.params.switchMap(function (params) {
            return _this.angularAPIHelper.getById('proyecto', params['id']);
        }).
            subscribe(function (response) { return _this.cargarModelo(response); });
    }
    DetalleProyectoComponent.prototype.cargarSelects = function () {
        var _this = this;
        GenerosModel_1.GeneroModel.getAll(this.angularAPIHelper).subscribe(function (response) { return _this.generos = response.consulta; });
        ClasificacionesModel_1.ClasificacionModel.getAll(this.angularAPIHelper).subscribe(function (response) { return _this.clasificaciones = response.consulta; });
    };
    DetalleProyectoComponent.prototype.cargarModelo = function (proyecto) {
        this.proyecto = proyecto.consulta[0];
        this.gestorColaboraciones = new gestor_colaboraciones_component_1.GestorColaboraciones(this.angularAPIHelper, this.proyecto); // carga de colaboradores
        this.proyecto.sinopsis = this.proyecto.sinopsis == "" || this.proyecto.sinopsis == undefined ? new String('') : this.proyecto.sinopsis; // workaround por culpa del componente ng2-summernote donde con "" no se muestra nada.
    };
    DetalleProyectoComponent.prototype.guardarCambios = function (exit) {
        var _this = this;
        this.proyecto.fechaModificacion = new Date();
        this.proyecto.sinopsis = this.proyecto.sinopsis == undefined ? new String('') : this.proyecto.sinopsis; // wa para el módulo ng-summernote con undefined
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(this.proyecto)).subscribe(function (response) {
            _this.respuesta = response;
        }, function (error) {
            _this.confirmacionGuardado.setEstadoGuardado(false);
            _this.confirmacionGuardado.setTimeoutRetirarAviso();
        }, function () {
            var isOk = _this.respuesta.estado == AngularAPIHelper_1.ResponseStatus.OK;
            if (!isOk) {
                console.log(_this.respuesta.error);
            }
            _this.confirmacionGuardado.setEstadoGuardado(isOk);
            _this.confirmacionGuardado.setTimeoutRetirarAviso();
            _this.botonesGuardado.mostrarCompletoCancelar();
            if (exit && isOk) {
                _this.router.navigate(['/proyectos']);
            }
        });
    };
    DetalleProyectoComponent.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.proyecto);
        if (changes != undefined && changes._changesTail != undefined) {
            this.botonesGuardado.mostrarCompletoCancelar(false);
        }
    };
    DetalleProyectoComponent.prototype.onAccionGuardado = function (event) {
        if (event == botones_guardado_component_1.TipoOperacionGuardado.Guardar) {
            if (this.proyecto._id == this.localStorageService.getPropiedad('proyectoActual')) {
                this.localStorageService.setPropiedad('nombreProyectoActual', this.proyecto.nombre);
            }
            this.guardarCambios(false);
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.Eliminar) {
            this.gestorColaboraciones.eliminarColaboracion();
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.CancelarRegistro) {
            this.proyecto.cancelado = true;
            if (this.proyecto._id == this.localStorageService.getPropiedad('proyectoActual')) {
                this.localStorageService.deletePropiedad('proyectoActual');
                this.localStorageService.deletePropiedad('nombreProyectoActual');
            }
            this.guardarCambios(true);
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.Volver) {
            this.router.navigate(['/proyectos']);
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.CancelarEliminacion) {
            this.gestorColaboraciones.cancelarEliminacion();
        }
    };
    return DetalleProyectoComponent;
}());
DetalleProyectoComponent = __decorate([
    core_1.Component({
        selector: 'detalle-proyecto',
        templateUrl: './templates/proyecto-detalle.component.html',
        providers: [AngularAPIHelper_1.AngularAPIHelper]
    }),
    __metadata("design:paramtypes", [AngularAPIHelper_1.AngularAPIHelper, router_1.Router, router_1.ActivatedRoute, LocalStorageService_1.LocalStorageService, core_1.KeyValueDiffers])
], DetalleProyectoComponent);
exports.DetalleProyectoComponent = DetalleProyectoComponent;
//# sourceMappingURL=proyecto-detalle.component.js.map