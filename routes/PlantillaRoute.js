"use strict";
const mongoose = require("mongoose");
const Plantillas_1 = require("../models/Plantillas");
const APIHelper_1 = require("./APIHelper");
var Route;
(function (Route) {
    class PlantillaRoute {
        static get model() {
            if (PlantillaRoute._model == undefined) {
                PlantillaRoute._model = mongoose.model(Plantillas_1.Plantilla.name);
            }
            return PlantillaRoute._model;
        }
        getPlantillas(req, res, next) {
            APIHelper_1.APIHelper.getAll(PlantillaRoute.model, res);
        }
        getPlantillaById(req, res, next) {
            APIHelper_1.APIHelper.getById(PlantillaRoute.model, req.params.id, res);
        }
        addPlantilla(req, res, next) {
            APIHelper_1.APIHelper.add(PlantillaRoute.model, req, res);
        }
        deletePlantilla(req, res, next) {
            APIHelper_1.APIHelper.delete(PlantillaRoute.model, req.params.id, res);
        }
        getPlantillasByFilterAndSort(req, res, next) {
            APIHelper_1.APIHelper.getByFilterAndSort(PlantillaRoute.model, JSON.stringify(req.body), res);
        }
    }
    Route.PlantillaRoute = PlantillaRoute;
})(Route || (Route = {}));
module.exports = Route;
