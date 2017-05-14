"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Escena } from "../models/Escenas";
import { APIHelper, PeticionJson } from "./APIHelper";
import { ProyectoRoute } from "./ProyectoRoute";

module Route {
    export class EscenaRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (EscenaRoute._model == undefined) {
                EscenaRoute._model = mongoose.model(Escena.name);
            }
            return EscenaRoute._model;
        }

        public getEscenas(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(EscenaRoute.model, req, res, ProyectoRoute.crearFiltroProyecto(req));
        }
        public getEscenasByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getByFilterAndSort(EscenaRoute.model, ProyectoRoute.alterarFiltroConProyecto(req), res);
        }
        public getEscenaById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(EscenaRoute.model, req, res, ProyectoRoute.crearFiltroProyecto(req));
        }
        public addEscena(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(EscenaRoute.model, req, res, ProyectoRoute.crearFiltroProyectoManipulacion(req));
        }
        public deleteEscena(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(EscenaRoute.model, req, res, ProyectoRoute.crearFiltroProyectoManipulacion(req));
        }
        public updateEscena(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.update(EscenaRoute.model, req, res, ProyectoRoute.crearFiltroProyectoManipulacion(req));
        }
    }
}

export = Route;