"use strict";
const mongoose = require("mongoose");
const Escenas_1 = require("../models/Escenas");
const APIHelper_1 = require("./APIHelper");
const ProyectoRoute_1 = require("./ProyectoRoute");
var Route;
(function (Route) {
    class EscenaRoute {
        static get model() {
            if (EscenaRoute._model == undefined) {
                EscenaRoute._model = mongoose.model(Escenas_1.Escena.name);
            }
            return EscenaRoute._model;
        }
        getEscenas(req, res, next) {
            APIHelper_1.APIHelper.getAll(EscenaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        getEscenasByFilterAndSort(req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(EscenaRoute.model, ProyectoRoute_1.ProyectoRoute.alterarFiltroConProyecto(req), res);
        }
        getEscenaById(req, res, next) {
            APIHelper_1.APIHelper.getById(EscenaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        addEscena(req, res, next) {
            APIHelper_1.APIHelper.add(EscenaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        deleteEscena(req, res, next) {
            APIHelper_1.APIHelper.delete(EscenaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
        updateEscena(req, res, next) {
            APIHelper_1.APIHelper.update(EscenaRoute.model, req, res, ProyectoRoute_1.ProyectoRoute.crearFiltroProyecto(req));
        }
    }
    Route.EscenaRoute = EscenaRoute;
})(Route || (Route = {}));
module.exports = Route;
