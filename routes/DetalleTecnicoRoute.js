"use strict";
var mongoose = require("mongoose");
var DetallesTecnicos_1 = require("../models/DetallesTecnicos");
var APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    var DetalleTecnicoRoute = (function () {
        function DetalleTecnicoRoute() {
        }
        Object.defineProperty(DetalleTecnicoRoute, "model", {
            get: function () {
                if (DetalleTecnicoRoute._model == undefined) {
                    DetalleTecnicoRoute._model = mongoose.model(DetallesTecnicos_1.DetalleTecnico.name);
                }
                return DetalleTecnicoRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        DetalleTecnicoRoute.prototype.getDetallesTecnicos = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(DetalleTecnicoRoute.model, req, res);
        };
        DetalleTecnicoRoute.prototype.addDetalleTecnico = function (req, res, next) {
            APIHelper_1.APIHelper.add(DetalleTecnicoRoute.model, req, res);
        };
        DetalleTecnicoRoute.prototype.getDetalleTecnicoById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(DetalleTecnicoRoute.model, req, res);
        };
        DetalleTecnicoRoute.prototype.deleteDetalleTecnico = function (req, res, next) {
            APIHelper_1.APIHelper.delete(DetalleTecnicoRoute.model, req, res);
        };
        return DetalleTecnicoRoute;
    }());
    Route.DetalleTecnicoRoute = DetalleTecnicoRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=DetalleTecnicoRoute.js.map