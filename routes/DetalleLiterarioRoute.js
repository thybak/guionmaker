"use strict";
const mongoose = require("mongoose");
const DetallesLiterarios_1 = require("../models/DetallesLiterarios");
const APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    class DetalleLiterarioRoute {
        static get model() {
            if (DetalleLiterarioRoute._model == undefined) {
                DetalleLiterarioRoute._model = mongoose.model(DetallesLiterarios_1.DetalleLiterario.name);
            }
            return DetalleLiterarioRoute._model;
        }
        getDetallesLiterarios(req, res, next) {
            APIHelper_1.APIHelper.getAll(DetalleLiterarioRoute.model, req, res);
        }
        addDetalleLiterario(req, res, next) {
            APIHelper_1.APIHelper.add(DetalleLiterarioRoute.model, req, res);
        }
        getDetalleLiterarioById(req, res, next) {
            APIHelper_1.APIHelper.getById(DetalleLiterarioRoute.model, req, res);
        }
        deleteDetalleLiterario(req, res, next) {
            APIHelper_1.APIHelper.delete(DetalleLiterarioRoute.model, req, res);
        }
    }
    Route.DetalleLiterarioRoute = DetalleLiterarioRoute;
})(Route || (Route = {}));
module.exports = Route;
