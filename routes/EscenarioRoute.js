"use strict";
const mongoose = require("mongoose");
const Escenarios_1 = require("../models/Escenarios");
const APIHelper_1 = require("./APIHelper");
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
            APIHelper_1.APIHelper.getAll(EscenarioRoute.model, res);
        }
        getEscenarioById(req, res, next) {
            APIHelper_1.APIHelper.getById(EscenarioRoute.model, req.params.id, res);
        }
        addEscenario(req, res, next) {
            APIHelper_1.APIHelper.add(EscenarioRoute.model, req, res);
        }
        deleteEscenario(req, res, next) {
            APIHelper_1.APIHelper.delete(EscenarioRoute.model, req.params.id, res);
        }
        getEscenariosByFilterAndSort(req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(EscenarioRoute.model, JSON.stringify(req.body), res);
        }
    }
    Route.EscenarioRoute = EscenarioRoute;
})(Route || (Route = {}));
module.exports = Route;
