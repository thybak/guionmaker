"use strict";
var AngularAPIHelper_1 = require("../../utils/AngularAPIHelper");
var PlantillaModel = (function () {
    function PlantillaModel() {
        this.nombre = "Nueva plantilla";
        this.fechaCreacion = new Date();
    }
    PlantillaModel.getHtmlPortada = function (plantilla) {
        if (plantilla.htmlPortada != undefined && plantilla.htmlPortada.indexOf("{{tituloProyecto}}") >= 0 && plantilla.htmlPortada.indexOf("{{tipoGuion}}") >= 0) {
            return plantilla.htmlPortada;
        }
        return AngularAPIHelper_1.AngularAPIHelper.plantillaPortada;
    };
    PlantillaModel.getHtmlEscena = function (plantilla) {
        if (plantilla.htmlEscena != undefined && plantilla.htmlEscena.indexOf("{{tituloEscena}}") >= 0 && plantilla.htmlEscena.indexOf("{{contenidoEscena}}") >= 0) {
            return plantilla.htmlEscena;
        }
        return AngularAPIHelper_1.AngularAPIHelper.plantillaEscena;
    };
    return PlantillaModel;
}());
exports.PlantillaModel = PlantillaModel;
//# sourceMappingURL=PlantillasModel.js.map