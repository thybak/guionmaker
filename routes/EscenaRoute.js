"use strict";
var mongoose = require("mongoose");
var Escenas_1 = require("../models/Escenas");
var APIHelper_1 = require("./APIHelper");
var ProyectoRoute_1 = require("./ProyectoRoute");
var Route;
(function (Route) {
    var EscenaRoute = (function () {
        function EscenaRoute() {
        }
        Object.defineProperty(EscenaRoute, "model", {
            get: function () {
                if (EscenaRoute._model == undefined) {
                    EscenaRoute._model = mongoose.model(Escenas_1.Escena.name);
                }
                return EscenaRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        EscenaRoute.prototype.getEscenas = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(EscenaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        };
        EscenaRoute.prototype.getEscenasByFilterAndSort = function (req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(EscenaRoute.model, ProyectoRoute_1.ProyectoRoute.alterarFiltroConProyecto(req), res);
        };
        EscenaRoute.prototype.getEscenaById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(EscenaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        };
        EscenaRoute.prototype.addEscena = function (req, res, next) {
            APIHelper_1.APIHelper.add(EscenaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyectoManipulacion(req));
        };
        EscenaRoute.prototype.deleteEscena = function (req, res, next) {
            APIHelper_1.APIHelper.delete(EscenaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyectoManipulacion(req));
        };
        EscenaRoute.prototype.updateEscena = function (req, res, next) {
            APIHelper_1.APIHelper.update(EscenaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyectoManipulacion(req));
        };
        return EscenaRoute;
    }());
    Route.EscenaRoute = EscenaRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=EscenaRoute.js.map