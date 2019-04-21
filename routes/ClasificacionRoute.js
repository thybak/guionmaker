"use strict";
var mongoose = require("mongoose");
var Clasificaciones_1 = require("../models/Clasificaciones");
var APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    var ClasificacionRoute = /** @class */ (function () {
        function ClasificacionRoute() {
        }
        Object.defineProperty(ClasificacionRoute, "model", {
            get: function () {
                if (ClasificacionRoute._model == undefined) {
                    ClasificacionRoute._model = mongoose.model(Clasificaciones_1.Clasificacion.name);
                }
                return ClasificacionRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        ClasificacionRoute.prototype.getClasificaciones = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(ClasificacionRoute.model, req, res);
        };
        ClasificacionRoute.prototype.addClasificacion = function (req, res, next) {
            APIHelper_1.APIHelper.add(ClasificacionRoute.model, req, res);
        };
        ClasificacionRoute.prototype.getClasificacionById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(ClasificacionRoute.model, req, res);
        };
        ClasificacionRoute.prototype.deleteClasificacion = function (req, res, next) {
            APIHelper_1.APIHelper.delete(ClasificacionRoute.model, req, res);
        };
        return ClasificacionRoute;
    }());
    Route.ClasificacionRoute = ClasificacionRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=ClasificacionRoute.js.map