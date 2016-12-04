"use strict";
import * as express from "express";
import * as proyecto from "../models/Proyectos";

module Route
{
    export class IndexRoute {
        public index(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.render("index.html");
        }
    }
}

export = Route;