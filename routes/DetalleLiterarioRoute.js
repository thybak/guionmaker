"use strict";
var mongoose = require("mongoose");
var DetallesLiterarios_1 = require("../models/DetallesLiterarios");
var APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    var DetalleLiterarioRoute = (function () {
        function DetalleLiterarioRoute() {
        }
        Object.defineProperty(DetalleLiterarioRoute, "model", {
            get: function () {
                if (DetalleLiterarioRoute._model == undefined) {
                    DetalleLiterarioRoute._model = mongoose.model(DetallesLiterarios_1.DetalleLiterario.name);
                }
                return DetalleLiterarioRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        DetalleLiterarioRoute.prototype.getDetallesLiterarios = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(DetalleLiterarioRoute.model, req, res);
        };
        DetalleLiterarioRoute.prototype.addDetalleLiterario = function (req, res, next) {
            APIHelper_1.APIHelper.add(DetalleLiterarioRoute.model, req, res);
        };
        DetalleLiterarioRoute.prototype.getDetalleLiterarioById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(DetalleLiterarioRoute.model, req, res);
        };
        DetalleLiterarioRoute.prototype.deleteDetalleLiterario = function (req, res, next) {
            APIHelper_1.APIHelper.delete(DetalleLiterarioRoute.model, req, res);
        };
        return DetalleLiterarioRoute;
    }());
    Route.DetalleLiterarioRoute = DetalleLiterarioRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=DetalleLiterarioRoute.js.map