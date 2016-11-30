"use strict";
const mongoose = require("mongoose");
const Clasificaciones_1 = require("../models/Clasificaciones");
const APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    class ClasificacionRoute {
        static get model() {
            if (ClasificacionRoute._model == undefined) {
                ClasificacionRoute._model = mongoose.model(Clasificaciones_1.Clasificacion.name);
            }
            return ClasificacionRoute._model;
        }
        getClasificaciones(req, res, next) {
            APIHelper_1.APIHelper.getAll(ClasificacionRoute.model, res);
        }
        addClasificacion(req, res, next) {
            APIHelper_1.APIHelper.add(ClasificacionRoute.model, req, res);
        }
        getClasificacionById(req, res, next) {
            APIHelper_1.APIHelper.getById(ClasificacionRoute.model, req.params.id, res);
        }
        deleteClasificacion(req, res, next) {
            APIHelper_1.APIHelper.delete(ClasificacionRoute.model, req.params.id, res);
        }
    }
    Route.ClasificacionRoute = ClasificacionRoute;
})(Route || (Route = {}));
module.exports = Route;
