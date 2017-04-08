"use strict";
const mongoose = require("mongoose");
const Escenarios_1 = require("../models/Escenarios");
const APIHelper_1 = require("./APIHelper");
const ProyectoRoute_1 = require("./ProyectoRoute");
var Route;
(function (Route) {
    class EscenarioRoute {
        static get model() {
            if (EscenarioRoute._model == undefined) {
                EscenarioRoute._model = mongoose.model(Escenarios_1.Escenario.name);
            }
            return EscenarioRoute._model;
        }
        getEscenarios(req, res, next) {
            APIHelper_1.APIHelper.getAll(EscenarioRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        getEscenarioById(req, res, next) {
            APIHelper_1.APIHelper.getById(EscenarioRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        addEscenario(req, res, next) {
            APIHelper_1.APIHelper.add(EscenarioRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        deleteEscenario(req, res, next) {
            APIHelper_1.APIHelper.delete(EscenarioRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        getEscenariosByFilterAndSort(req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(EscenarioRoute.model, ProyectoRoute_1.ProyectoRoute.alterarFiltroConProyecto(req), res);
        }
    }
    Route.EscenarioRoute = EscenarioRoute;
})(Route || (Route = {}));
module.exports = Route;
