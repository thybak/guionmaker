"use strict";
const mongoose = require("mongoose");
const Proyectos_1 = require("../models/Proyectos");
const APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    class ProyectoRoute {
        static get model() {
            if (ProyectoRoute._model == undefined) {
                ProyectoRoute._model = mongoose.model(Proyectos_1.Proyecto.name);
            }
            return ProyectoRoute._model;
        }
        getProyectos(req, res, next) {
            APIHelper_1.APIHelper.getAll(ProyectoRoute.model, res);
        }
        getProyectosByFilterAndSort(req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(ProyectoRoute.model, JSON.stringify(req.body), res);
        }
        getProyectoById(req, res, next) {
            APIHelper_1.APIHelper.getById(ProyectoRoute.model, req.params.id, res);
        }
        addProyecto(req, res, next) {
            APIHelper_1.APIHelper.add(ProyectoRoute.model, req, res);
        }
        deleteProyecto(req, res, next) {
            APIHelper_1.APIHelper.delete(ProyectoRoute.model, req.params.id, res);
        }
    }
    Route.ProyectoRoute = ProyectoRoute;
})(Route || (Route = {}));
module.exports = Route;
