"use strict";
const mongoose = require("mongoose");
const Generos_1 = require("../models/Generos");
const APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    class GeneroRoute {
        static get model() {
            if (GeneroRoute._model == undefined) {
                GeneroRoute._model = mongoose.model(Generos_1.Genero.name);
            }
            return GeneroRoute._model;
        }
        getGeneros(req, res, next) {
            APIHelper_1.APIHelper.getAll(GeneroRoute.model, req, res);
        }
        addGenero(req, res, next) {
            APIHelper_1.APIHelper.add(GeneroRoute.model, req, res);
        }
        getGeneroById(req, res, next) {
            APIHelper_1.APIHelper.getById(GeneroRoute.model, req, res);
        }
        deleteGenero(req, res, next) {
            APIHelper_1.APIHelper.delete(GeneroRoute.model, req, res);
        }
    }
    Route.GeneroRoute = GeneroRoute;
})(Route || (Route = {}));
module.exports = Route;
