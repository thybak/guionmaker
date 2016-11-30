"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";
import * as favicon from "serve-favicon";
import * as path from "path";

import { IndexRoute } from "./routes/IndexRoute";
import { ProyectoRoute } from "./routes/ProyectoRoute";
import { UsuarioRoute } from "./routes/UsuarioRoute";
import { GeneroRoute } from "./routes/GeneroRoute";
import { ClasificacionRoute } from "./routes/ClasificacionRoute";
import { DetalleTecnicoRoute } from "./routes/DetalleTecnicoRoute";
import { DetalleLiterarioRoute } from "./routes/DetalleLiterarioRoute";
import { EscenaRoute } from "./routes/EscenaRoute";

class Server {
    public api: express.Application;
    private IP: string = "192.168.1.135";
    private COLLECTION_NAME: string = "guionMaker";
    private API_PORT: number = 1337;

    public static init(): Server {
        return new Server();
    }

    private setModules(): void {
        this.api.use(morgan('dev'));
        this.api.use(bodyParser.json());
        this.api.use(bodyParser.urlencoded({ extended: true }));
        this.api.use(cookieParser());
        this.api.use(express.static(path.join(__dirname, 'public')));
        this.api.set("views", path.join(__dirname, "views"));
        this.api.set("view engine", "jade");
        this.api.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }

    private setRoutes(): void {
        let router: express.Router = express.Router();
        let _indexRoute: IndexRoute = new IndexRoute();
        let _proyectosRoute: ProyectoRoute = new ProyectoRoute();
        let _usuariosRoute: UsuarioRoute = new UsuarioRoute();
        let _generosRoute: GeneroRoute = new GeneroRoute();
        let _clasificacionesRoute: ClasificacionRoute = new ClasificacionRoute();
        let _detallesTecnicosRoute: DetalleTecnicoRoute = new DetalleTecnicoRoute();
        let _detallesLiterariosRoute: DetalleLiterarioRoute = new DetalleLiterarioRoute();
        let _escenasRoute: EscenaRoute = new EscenaRoute();

        router.get('/', _indexRoute.index.bind(_indexRoute.index));

        router.get('/proyectos', _proyectosRoute.getProyectos.bind(_proyectosRoute.getProyectos));
        router.get('/proyecto/:id', _proyectosRoute.getProyectoById.bind(_proyectosRoute.getProyectoById));
        router.delete('/proyecto/:id', _proyectosRoute.deleteProyecto.bind(_proyectosRoute.deleteProyecto));
        router.post('/proyecto/', _proyectosRoute.addProyecto.bind(_proyectosRoute.addProyecto));

        router.get('/usuarios', _usuariosRoute.getUsuarios.bind(_usuariosRoute.getUsuarios));
        router.post('/usuario/', _usuariosRoute.addUsuario.bind(_usuariosRoute.addUsuario));
        router.get('/usuario/:id', _usuariosRoute.getUsuarioById.bind(_usuariosRoute.getUsuarioById));
        router.delete('/usuario/:id', _usuariosRoute.deleteUsuario.bind(_usuariosRoute.deleteUsuario));

        router.get('/generos', _generosRoute.getGeneros.bind(_generosRoute.getGeneros));
        router.post('/genero/', _generosRoute.addGenero.bind(_generosRoute.addGenero));
        router.get('/genero/:id', _generosRoute.getGeneroById.bind(_generosRoute.getGeneroById));
        router.delete('/genero/:id', _generosRoute.deleteGenero.bind(_generosRoute.deleteGenero));

        router.get('/clasificaciones', _clasificacionesRoute.getClasificaciones.bind(_clasificacionesRoute.getClasificaciones));
        router.post('/clasificacion/', _clasificacionesRoute.addClasificacion.bind(_clasificacionesRoute.addClasificacion));
        router.get('/clasificacion/:id', _clasificacionesRoute.getClasificacionById.bind(_clasificacionesRoute.getClasificacionById));
        router.delete('/clasificacion/:id', _clasificacionesRoute.deleteClasificacion.bind(_clasificacionesRoute.deleteClasificacion));

        router.get('/escenas', _escenasRoute.getEscenas.bind(_escenasRoute.getEscenas));
        router.post('/escena/', _escenasRoute.addEscena.bind(_escenasRoute.addEscena));
        router.get('/escena/:id', _escenasRoute.getEscenaById.bind(_escenasRoute.getEscenaById));
        router.delete('/escena/:id', _escenasRoute.deleteEscena.bind(_escenasRoute.deleteEscena));

        router.get('/detallesTecnicos', _detallesTecnicosRoute.getDetallesTecnicos.bind(_detallesTecnicosRoute.getDetallesTecnicos));
        router.post('/detalleTecnico/', _detallesTecnicosRoute.addDetalleTecnico.bind(_detallesTecnicosRoute.addDetalleTecnico));
        router.get('/detalleTecnico/:id', _detallesTecnicosRoute.getDetalleTecnicoById.bind(_detallesTecnicosRoute.getDetalleTecnicoById));
        router.delete('/detalleTecnico/:id', _detallesTecnicosRoute.deleteDetalleTecnico.bind(_detallesTecnicosRoute.deleteDetalleTecnico));

        router.get('/detallesLiterarios', _detallesLiterariosRoute.getDetallesLiterarios.bind(_detallesLiterariosRoute.getDetallesLiterarios));
        router.post('/detalleLiterario/', _detallesLiterariosRoute.addDetalleLiterario.bind(_detallesLiterariosRoute.addDetalleLiterario));
        router.get('/detalleLiterario/:id', _detallesLiterariosRoute.getDetalleLiterarioById.bind(_detallesLiterariosRoute.getDetalleLiterarioById));
        router.delete('/detalleLiterario/:id', _detallesLiterariosRoute.deleteDetalleLiterario.bind(_detallesLiterariosRoute.deleteDetalleLiterario));

        this.api.use(router);
    }

    private setConfig(): void {
        this.setModules();
        this.setRoutes();
        this.api.listen(this.API_PORT);
    }

    constructor() {
        this.api = express();
        this.setConfig();
        require('mongoose').Promise = global.Promise;
        mongoose.connect("mongodb://" + this.IP + "/" + this.COLLECTION_NAME);
    }
}

let server: Server = Server.init();
export = server.api;