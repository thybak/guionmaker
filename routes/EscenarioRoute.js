"use strict";
var mongoose = require("mongoose");
var Escenarios_1 = require("../models/Escenarios");
var APIHelper_1 = require("./APIHelper");
var ProyectoRoute_1 = require("./ProyectoRoute");
var Route;
(function (Route) {
    var EscenarioRoute = (function () {
        function EscenarioRoute() {
        }
        Object.defineProperty(EscenarioRoute, "model", {
            get: function () {
                if (EscenarioRoute._model == undefined) {
                    EscenarioRoute._model = mongoose.model(Escenarios_1.Escenario.name);
                }
                return EscenarioRoute._model;
            },
            enumerable: true,
            configurable: true
        });
        EscenarioRoute.prototype.getEscenarios = function (req, res, next) {
            APIHelper_1.APIHelper.getAll(EscenarioRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        };
        EscenarioRoute.prototype.getEscenarioById = function (req, res, next) {
            APIHelper_1.APIHelper.getById(EscenarioRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        };
        EscenarioRoute.prototype.addEscenario = function (req, res, next) {
            APIHelper_1.APIHelper.add(EscenarioRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        };
        EscenarioRoute.prototype.deleteEscenario = function (req, res, next) {
            APIHelper_1.APIHelper.delete(EscenarioRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        };
        EscenarioRoute.prototype.getEscenariosByFilterAndSort = function (req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(EscenarioRoute.model, ProyectoRoute_1.ProyectoRoute.alterarFiltroConProyecto(req), res);
        };
        return EscenarioRoute;
    }());
    Route.EscenarioRoute = EscenarioRoute;
})(Route || (Route = {}));
module.exports = Route;
//# sourceMappingURL=EscenarioRoute.js.map