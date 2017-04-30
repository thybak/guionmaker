"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Plantilla } from "../models/Plantillas";
import { APIHelper } from "./APIHelper";
import { ProyectoRoute } from "./ProyectoRoute";

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
            APIHelper.getAll(PlantillaRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
        public getPlantillaById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(PlantillaRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
        public addPlantilla(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(PlantillaRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
        public deletePlantilla(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(PlantillaRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
        public getPlantillasByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            req.body.find.autor = req.user.usuarioLogeado; //wa extraer sólo usuarios que son autores
            APIHelper.getByFilterAndSort(PlantillaRoute.model, req, res);
        }
    }
}

export = Route;