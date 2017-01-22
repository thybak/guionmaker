"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Plantilla } from "../models/Plantillas";
import { APIHelper } from "./APIHelper";

module Route {
    export class PlantillaRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (PlantillaRoute._model == undefined) {
                PlantillaRoute._model = mongoose.model(Plantilla.name); 
            }
            return PlantillaRoute._model;
        }

        public getPlantillas(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(PlantillaRoute.model, res);
        }
        public getPlantillaById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(PlantillaRoute.model, req.params.id, res);
        }
        public addPlantilla(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(PlantillaRoute.model, req, res);
        }
        public deletePlantilla(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(PlantillaRoute.model, req.params.id, res);
        }
        public getPlantillasByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getByFilterAndSort(PlantillaRoute.model, JSON.stringify(req.body), res);
        }
    }
}

export = Route;