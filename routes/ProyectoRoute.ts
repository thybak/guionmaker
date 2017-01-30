"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Proyecto } from "../models/Proyectos";
import { APIHelper } from "./APIHelper";

module Route {
    export class ProyectoRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (ProyectoRoute._model == undefined) {
                ProyectoRoute._model = mongoose.model(Proyecto.name); 
            }
            return ProyectoRoute._model;
        }

        public getProyectos(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(ProyectoRoute.model, res);
        }
        public getProyectosByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getByFilterAndSort(ProyectoRoute.model, JSON.stringify(req.body), res);
        }
        public getProyectoById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(ProyectoRoute.model, req.params.id, res);
        }
        public addProyecto(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(ProyectoRoute.model, req, res);
        }
        public deleteProyecto(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(ProyectoRoute.model, req.params.id, res);
        }
    }
}

export = Route;