"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Escenario } from "../models/Escenarios";
import { APIHelper } from "./APIHelper";
import { ProyectoRoute } from "./ProyectoRoute";

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
            APIHelper.getAll(EscenarioRoute.model, req, res, ProyectoRoute.crearFiltroProyecto(req));
        }
        public getEscenarioById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(EscenarioRoute.model, req, res, ProyectoRoute.crearFiltroProyecto(req));
        }
        public addEscenario(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(EscenarioRoute.model, req, res, ProyectoRoute.crearFiltroProyecto(req));
        }
        public deleteEscenario(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(EscenarioRoute.model, req, res, ProyectoRoute.crearFiltroProyecto(req));
        }
        public getEscenariosByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getByFilterAndSort(EscenarioRoute.model, ProyectoRoute.alterarFiltroConProyecto(req), res);
        }
    }
}

export = Route;