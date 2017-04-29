"use strict";
var ProyectosModel_1 = require("../proyectos/models/ProyectosModel");
var AngularAPIHelper_1 = require("./AngularAPIHelper");
var ModoColaborador = (function () {
    function ModoColaborador(angularAPIHelper, localStorageService) {
        var _this = this;
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        ProyectosModel_1.ProyectoModel.getProyectoActual(this.angularAPIHelper, this.localStorageService).subscribe(function (respuesta) {
            var proyectoR = respuesta;
            if (proyectoR != undefined && proyectoR.estado == AngularAPIHelper_1.ResponseStatus.OK) {
                console.log(proyectoR);
                _this.usuarioLogeadoAutor = _this.localStorageService.esUsuarioLogeado(proyectoR.consulta[0].autor);
            }
        });
    }
    return ModoColaborador;
}());
exports.ModoColaborador = ModoColaborador;
//# sourceMappingURL=ModoColaborador.js.map