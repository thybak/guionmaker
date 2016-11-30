"use strict";
const mongoose = require("mongoose");
const Escenas_1 = require("../models/Escenas");
const APIHelper_1 = require("./APIHelper");
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
            APIHelper_1.APIHelper.getAll(EscenaRoute.model, res);
        }
        getEscenaById(req, res, next) {
            APIHelper_1.APIHelper.getById(EscenaRoute.model, req.params.id, res);
        }
        addEscena(req, res, next) {
            APIHelper_1.APIHelper.add(EscenaRoute.model, req, res);
        }
        deleteEscena(req, res, next) {
            APIHelper_1.APIHelper.delete(EscenaRoute.model, req.params.id, res);
        }
    }
    Route.EscenaRoute = EscenaRoute;
})(Route || (Route = {}));
module.exports = Route;
