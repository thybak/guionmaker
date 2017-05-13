"use strict";

import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";
import * as favicon from "serve-favicon";
import * as path from "path";
import * as cors from "cors";
import * as jwtes from "express-jwt";
import * as jsonwebtoken from "jsonwebtoken";

import { IndexRoute } from "./routes/IndexRoute";
import { ProyectoRoute } from "./routes/ProyectoRoute";
import { UsuarioRoute } from "./routes/UsuarioRoute";
import { GeneroRoute } from "./routes/GeneroRoute";
import { ClasificacionRoute } from "./routes/ClasificacionRoute";
import { EscenaRoute } from "./routes/EscenaRoute";
import { PlantillaRoute } from "./routes/PlantillaRoute";
import { PersonajeRoute } from "./routes/PersonajeRoute";
import { EscenarioRoute } from "./routes/EscenarioRoute";

import { Utils } from "./models/Utils";

class Server {
    public api: express.Application;
    config: any;

    public static init(): Server {
        return new Server();
    }

    private setModules(): void {
        if (process.env.NODE_ENV == undefined || process.env.NODE_ENV.trim() !== 'test') {
            this.api.use(morgan('combined'));
        }
        this.api.use(bodyParser.json({ limit: 1024 * 1024 * 3 }));
        this.api.use(bodyParser.urlencoded({ extended: true }));
        this.api.use(cookieParser());
        this.api.use(express.static(path.join(__dirname, '/public')));
        this.api.use(express.static(path.join(__dirname, '/public/dist')));
        this.api.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
        this.api.use(cors()); // cross-origin resource sharing
    }

    private setRoutes(): void {
        let router: express.Router = express.Router();
        let _indexRoute: IndexRoute = new IndexRoute();
        let _proyectosRoute: ProyectoRoute = new ProyectoRoute();
        let _usuariosRoute: UsuarioRoute = new UsuarioRoute();
        let _generosRoute: GeneroRoute = new GeneroRoute();
        let _clasificacionesRoute: ClasificacionRoute = new ClasificacionRoute();
        let _escenasRoute: EscenaRoute = new EscenaRoute();
        let _plantillasRoute: PlantillaRoute = new PlantillaRoute();
        let _escenariosRoute: EscenarioRoute = new EscenarioRoute();
        let _personajesRoute: PersonajeRoute = new PersonajeRoute();

        this.api.use(jwtes({ "secret": this.config.secreto }).unless({ path: ['/api/usuario/login', '/api/usuario', '/api-docs', /^(?!\/api).+/] }));

        router.get('/api/proyectos', _proyectosRoute.getProyectos.bind(_proyectosRoute.getProyectos));
        router.post('/api/proyectosPorFiltro', _proyectosRoute.getProyectosByFilterAndSort.bind(_proyectosRoute.getProyectosByFilterAndSort));
        router.get('/api/proyecto/:id', _proyectosRoute.getProyectoById.bind(_proyectosRoute.getProyectoById));
        router.delete('/api/proyecto/:id', _proyectosRoute.deleteProyecto.bind(_proyectosRoute.deleteProyecto));
        router.post('/api/proyecto/', _proyectosRoute.addProyecto.bind(_proyectosRoute.addProyecto));

        router.post('/api/usuariosPorFiltro', _usuariosRoute.getUsuariosByFilterAndSort.bind(_usuariosRoute.getUsuariosByFilterAndSort));
        router.post('/api/usuario/', _usuariosRoute.addUsuario.bind(_usuariosRoute.addUsuario));
        router.get('/api/usuario/:id', _usuariosRoute.getUsuarioById.bind(_usuariosRoute.getUsuarioById));
        router.post('/api/usuario/login', _usuariosRoute.login.bind(_usuariosRoute.login));

        router.get('/api/generos', _generosRoute.getGeneros.bind(_generosRoute.getGeneros));
        router.get('/api/genero/:id', _generosRoute.getGeneroById.bind(_generosRoute.getGeneroById));

        router.get('/api/clasificaciones', _clasificacionesRoute.getClasificaciones.bind(_clasificacionesRoute.getClasificaciones));
        router.get('/api/clasificacion/:id', _clasificacionesRoute.getClasificacionById.bind(_clasificacionesRoute.getClasificacionById));

        router.get('/api/escenas', _escenasRoute.getEscenas.bind(_escenasRoute.getEscenas));
        router.post('/api/escenasPorFiltro', _escenasRoute.getEscenasByFilterAndSort.bind(_escenasRoute.getEscenasByFilterAndSort));
        router.post('/api/escena/', _escenasRoute.addEscena.bind(_escenasRoute.addEscena));
        router.get('/api/escena/:id', _escenasRoute.getEscenaById.bind(_escenasRoute.getEscenaById));
        router.delete('/api/escena/:id', _escenasRoute.deleteEscena.bind(_escenasRoute.deleteEscena));

        router.get('/api/plantillas', _plantillasRoute.getPlantillas.bind(_plantillasRoute.getPlantillas));
        router.post('/api/plantillasPorFiltro', _plantillasRoute.getPlantillasByFilterAndSort.bind(_plantillasRoute.getPlantillasByFilterAndSort));
        router.post('/api/plantilla/', _plantillasRoute.addPlantilla.bind(_plantillasRoute.addPlantilla));
        router.get('/api/plantilla/:id', _plantillasRoute.getPlantillaById.bind(_plantillasRoute.getPlantillaById));
        router.delete('/api/plantilla/:id', _plantillasRoute.deletePlantilla.bind(_plantillasRoute.deletePlantilla));

        router.get('/api/escenarios', _escenariosRoute.getEscenarios.bind(_escenariosRoute.getEscenarios));
        router.post('/api/escenariosPorFiltro', _escenariosRoute.getEscenariosByFilterAndSort.bind(_escenariosRoute.getEscenariosByFilterAndSort));
        router.post('/api/escenario/', _escenariosRoute.addEscenario.bind(_escenariosRoute.addEscenario));
        router.get('/api/escenario/:id', _escenariosRoute.getEscenarioById.bind(_escenariosRoute.getEscenarioById));
        router.delete('/api/escenario/:id', _escenariosRoute.deleteEscenario.bind(_escenariosRoute.deleteEscenario));

        router.get('/api/personajes', _personajesRoute.getPersonajes.bind(_personajesRoute.getPersonajes));
        router.post('/api/personajesPorFiltro', _personajesRoute.getPersonajesByFilterAndSort.bind(_personajesRoute.getPersonajesByFilterAndSort));
        router.post('/api/personaje/', _personajesRoute.addPersonaje.bind(_personajesRoute.addPersonaje));
        router.get('/api/personaje/:id', _personajesRoute.getPersonajeById.bind(_personajesRoute.getPersonajeById));
        router.delete('/api/personaje/:id', _personajesRoute.deletePersonaje.bind(_personajesRoute.deletePersonaje));

        router.get('/api-docs', function(req: express.Request, res: express.Response, next: express.NextFunction){
            res.sendFile(path.join(__dirname, '/public/api-docs/index.html'));
        });

        this.api.use(router);
        this.api.all('/*', function (req, res) {
            res.sendFile(path.join(__dirname, '/public/dist/index.html'));
        });
        this.api.use((function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
                res.status(401).send('No hay token de autorización en la llamada.');
            }
        }));
    }

    private setConfig(): void {
        this.setModules();
        this.setRoutes();
        this.api.listen(this.config.privateApiPort);
    }

    constructor() {
        console.log(process.env.NODE_ENV);
        this.config = require('./public/dist/assets/apiconfig.json');
        this.config.secreto = "g423gj8f_GfsldGLPxcz";
        this.api = express();
        this.setConfig();
        require('mongoose').Promise = global.Promise;
        if (process.env.NODE_ENV != undefined && process.env.NODE_ENV.trim() === 'test') {
            mongoose.connect("mongodb://" + this.config.dbURL + "/" + this.config.dbCollectionName + 'Test');
        } else {
            mongoose.connect("mongodb://" + this.config.dbURL + "/" + this.config.dbCollectionName);
            console.log(this.config);
        }

    }
}

export =  Server.init().api