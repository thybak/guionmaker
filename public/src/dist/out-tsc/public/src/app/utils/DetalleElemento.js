"use strict";
var gestor_subida_component_1 = require("./gestor-subida.component");
var AngularAPIHelper_1 = require("./AngularAPIHelper");
var botones_guardado_component_1 = require("./botones-guardado.component");
var confirmacion_guardado_component_1 = require("./confirmacion-guardado.component");
var DetalleElemento = (function () {
    function DetalleElemento(angularAPIHelper, localStorageService, route, router, entidadElemento, differs, parentRoute) {
        var _this = this;
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        this.route = route;
        this.router = router;
        this.differs = differs;
        this.parentRoute = parentRoute;
        this.confirmacionGuardado = new confirmacion_guardado_component_1.ConfirmacionGuardado();
        this.botonesGuardado = new botones_guardado_component_1.BotonesGuardado();
        this.botonesGuardado.mostrarCompleto();
        this.fichero = new gestor_subida_component_1.Fichero();
        this.entidadElemento = entidadElemento;
        this.differ = this.differs.find({}).create(null);
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
            return _this.angularAPIHelper.getById(_this.entidadElemento, params['id']);
        }).
            subscribe(function (response) {
            _this.cargarModelo(response);
        });
    }
    DetalleElemento.prototype.guardarCambios = function () {
        var _this = this;
        this.angularAPIHelper.postEntryOrFilter(this.entidadElemento, JSON.stringify(this.elemento)).subscribe(function (response) {
            var respuesta = response;
            _this.confirmacionGuardado.setEstadoGuardado(respuesta.estado == AngularAPIHelper_1.ResponseStatus.OK);
            _this.confirmacionGuardado.setTimeoutRetirarAviso();
            _this.botonesGuardado.mostrarCompleto();
        });
    };
    DetalleElemento.prototype.eliminarElemento = function () {
        var _this = this;
        this.angularAPIHelper.deleteById(this.entidadElemento, this.elemento._id).subscribe(null, null, function () { return _this.router.navigate([_this.parentRoute]); });
    };
    DetalleElemento.prototype.onAccionGuardado = function (event) {
        if (event == botones_guardado_component_1.TipoOperacionGuardado.Guardar) {
            if (this.fichero.base64 != undefined) {
                this.elemento.imagen = this.fichero.base64;
                this.elemento.mimeType = this.fichero.mimeType;
            }
            this.guardarCambios();
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.Eliminar) {
            this.eliminarElemento();
        }
        else if (event == botones_guardado_component_1.TipoOperacionGuardado.Volver) {
            this.router.navigate([this.parentRoute]);
        }
    };
    DetalleElemento.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.elemento);
        if (changes != undefined && changes._changesTail != undefined) {
            this.botonesGuardado.mostrarCompleto(false);
        }
    };
    return DetalleElemento;
}());
exports.DetalleElemento = DetalleElemento;
//# sourceMappingURL=DetalleElemento.js.map