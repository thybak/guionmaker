"use strict";
const mongoose = require("mongoose");
const Colaboraciones_1 = require("../models/Colaboraciones");
const APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    class ColaboracionRoute {
        static get model() {
            if (ColaboracionRoute._model == undefined) {
                ColaboracionRoute._model = mongoose.model(Colaboraciones_1.Colaboracion.name);
            }
            return ColaboracionRoute._model;
        }
        getColaboraciones(req, res, next) {
            APIHelper_1.APIHelper.getAll(ColaboracionRoute.model, req, res);
        }
        addColaboracion(req, res, next) {
            APIHelper_1.APIHelper.add(ColaboracionRoute.model, req, res);
        }
        getColaboracionById(req, res, next) {
            APIHelper_1.APIHelper.getById(ColaboracionRoute.model, req, res);
        }
        deleteColaboracion(req, res, next) {
            APIHelper_1.APIHelper.delete(ColaboracionRoute.model, req, res);
        }
        getColaboracionesByFilterAndSort(req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(ColaboracionRoute.model, req, res);
        }
    }
    Route.ColaboracionRoute = ColaboracionRoute;
})(Route || (Route = {}));
module.exports = Route;
