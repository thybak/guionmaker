"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { DetalleTecnico } from "../models/DetallesTecnicos";
import { APIHelper } from "./APIHelper";

module Route {
    export class DetalleTecnicoRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (DetalleTecnicoRoute._model == undefined) {
                DetalleTecnicoRoute._model = mongoose.model(DetalleTecnico.name);
            }
            return DetalleTecnicoRoute._model;
        }

        public getDetallesTecnicos(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(DetalleTecnicoRoute.model, res);
        }
        public addDetalleTecnico(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(DetalleTecnicoRoute.model, req, res);
        }
        public getDetalleTecnicoById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(DetalleTecnicoRoute.model, req.params.id, res);
        }
        public deleteDetalleTecnico(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(DetalleTecnicoRoute.model, req.params.id, res);
        }
    }
}

export = Route;