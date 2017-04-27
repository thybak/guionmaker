"use strict";
import * as express from "express";
import * as mongoose from "mongoose";
import { Proyecto } from "../models/Proyectos";
import { APIHelper, PeticionJson } from "./APIHelper";

module Route {
    export class ProyectoRoute {
        static _model: mongoose.Model<mongoose.Document>;
        static get model(): mongoose.Model<mongoose.Document> {
            if (ProyectoRoute._model == undefined) {
                ProyectoRoute._model = mongoose.model(Proyecto.name);
            }
            return ProyectoRoute._model;
        }

        public static crearFiltroAutor(req: express.Request): PeticionJson {
            let filtro = new PeticionJson();
            filtro.find = { "autor": req.user.usuarioLogeado };
            return filtro;
        }

        public static crearFiltroProyecto(req: express.Request): PeticionJson {
            let filtro = new PeticionJson();
            if (req.body.modoColaborador) {
                filtro.populate = {
                    path: "proyecto",
                    populate: {
                        path: "colaboradores", match: { "usuario" : req.user.usuarioLogeado }
                    }
                };
            } else {
                filtro.populate = { path: "proyecto", match: { "autor": req.user.usuarioLogeado } };
            }
            return filtro;
        }

        public static alterarFiltroConProyecto(req: express.Request): express.Request {
            let filtro = ProyectoRoute.crearFiltroProyecto(req);
            req.body.populate = filtro.populate;
            return req;
        }

        public getProyectos(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getAll(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
        public getProyectosByFilterAndSort(req: express.Request, res: express.Response, next: express.NextFunction) {
            req.body.find = {
                $and: [{ "cancelado": req.body.find.cancelado == undefined ? false : req.body.find.cancelado },
                { $or: [{ "autor": req.user.usuarioLogeado }, { "colaboradores.usuario": req.user.usuarioLogeado }] }]
            };
            console.log(req.body.find);
            //req.body.populate = { path: "colaboradores" };
            APIHelper.getByFilterAndSort(ProyectoRoute.model, req, res);
        }
        public getProyectoById(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.getById(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
        public addProyecto(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.add(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
        public deleteProyecto(req: express.Request, res: express.Response, next: express.NextFunction) {
            APIHelper.delete(ProyectoRoute.model, req, res, ProyectoRoute.crearFiltroAutor(req));
        }
    }
}

export = Route;