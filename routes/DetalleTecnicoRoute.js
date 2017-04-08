"use strict";
const mongoose = require("mongoose");
const DetallesTecnicos_1 = require("../models/DetallesTecnicos");
const APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    class DetalleTecnicoRoute {
        static get model() {
            if (DetalleTecnicoRoute._model == undefined) {
                DetalleTecnicoRoute._model = mongoose.model(DetallesTecnicos_1.DetalleTecnico.name);
            }
            return DetalleTecnicoRoute._model;
        }
        getDetallesTecnicos(req, res, next) {
            APIHelper_1.APIHelper.getAll(DetalleTecnicoRoute.model, req, res);
        }
        addDetalleTecnico(req, res, next) {
            APIHelper_1.APIHelper.add(DetalleTecnicoRoute.model, req, res);
        }
        getDetalleTecnicoById(req, res, next) {
            APIHelper_1.APIHelper.getById(DetalleTecnicoRoute.model, req, res);
        }
        deleteDetalleTecnico(req, res, next) {
            APIHelper_1.APIHelper.delete(DetalleTecnicoRoute.model, req, res);
        }
    }
    Route.DetalleTecnicoRoute = DetalleTecnicoRoute;
})(Route || (Route = {}));
module.exports = Route;
