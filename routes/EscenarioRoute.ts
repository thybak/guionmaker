"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Escenario } from "../models/Escenarios";
import { APIHelper } from "./APIHelper";

module Route {
    export class EscenarioRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (EscenarioRoute._model == undefined) {
                EscenarioRoute._model = mongoose.model(Escenario.name);
            }
            return EscenarioRoute._model;
        }

        public getEscenarios(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(EscenarioRoute.model, res);
        }
        public getEscenarioById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(EscenarioRoute.model, req.params.id, res);
        }
        public addEscenario(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(EscenarioRoute.model, req, res);
        }
        public deleteEscenario(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(EscenarioRoute.model, req.params.id, res);
        }
        public getEscenariosByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getByFilterAndSort(EscenarioRoute.model, JSON.stringify(req.body), res);
        }
    }
}

export = Route;