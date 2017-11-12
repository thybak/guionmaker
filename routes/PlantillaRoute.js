"use strict";
var mongoose = require("mongoose");
var Plantillas_1 = require("../models/Plantillas");
var APIHelper_1 = require("./APIHelper");
var ProyectoRoute_1 = require("./ProyectoRoute");
var Route;
(function (Route) {
    var PlantillaRoute = /** @class */ (function () {
        function PlantillaRoute() {
        }
        Object.defineProperty(PlantillaRoute, "model", {
            get: function () {
                if (PlantillaRoute._model == undefined) {
                    PlantillaRoute._model = mongoose.model(Plantillas_1.Plantilla.name);
                }
                return PlantillaRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        PlantillaRoute.prototype.getPlantillas = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(PlantillaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroAutor(req));
        };
        PlantillaRoute.prototype.getPlantillaById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(PlantillaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroAutor(req));
        };
        PlantillaRoute.prototype.addPlantilla = function (req, res, next) {
            APIHelper_1.APIHelper.add(PlantillaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroAutor(req));
        };
        PlantillaRoute.prototype.deletePlantilla = function (req, res, next) {
            APIHelper_1.APIHelper.delete(PlantillaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroAutor(req));
        };
        PlantillaRoute.prototype.getPlantillasByFilterAndSort = function (req, res, next) {
            req.body.find.autor = req.user.usuarioLogeado; //wa extraer sólo usuarios que son autores
            APIHelper_1.APIHelper.getByFilterAndSort(PlantillaRoute.model, req, res);
        };
        return PlantillaRoute;
    }());
    Route.PlantillaRoute = PlantillaRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=PlantillaRoute.js.map