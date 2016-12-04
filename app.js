"use strict";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const IndexRoute_1 = require("./routes/IndexRoute");
const ProyectoRoute_1 = require("./routes/ProyectoRoute");
const UsuarioRoute_1 = require("./routes/UsuarioRoute");
const GeneroRoute_1 = require("./routes/GeneroRoute");
const ClasificacionRoute_1 = require("./routes/ClasificacionRoute");
const DetalleTecnicoRoute_1 = require("./routes/DetalleTecnicoRoute");
const DetalleLiterarioRoute_1 = require("./routes/DetalleLiterarioRoute");
const EscenaRoute_1 = require("./routes/EscenaRoute");
class Server {
    constructor() {
        this.IP = "192.168.1.135";
        this.COLLECTION_NAME = "guionMaker";
        this.API_PORT = 1337;
        this.api = express();
        this.setConfig();
        require('mongoose').Promise = global.Promise;
        mongoose.connect("mongodb://" + this.IP + "/" + this.COLLECTION_NAME);
    }
    static init() {
        return new Server();
    }
    setModules() {
        this.api.use(morgan('dev'));
        this.api.use(bodyParser.json());
        this.api.use(bodyParser.urlencoded({ extended: true }));
        this.api.use(cookieParser());
        this.api.use(express.static(path.join(__dirname, '/public/dist')));
        this.api.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
    setRoutes() {
        let router = express.Router();
        let _indexRoute = new IndexRoute_1.IndexRoute();
        let _proyectosRoute = new ProyectoRoute_1.ProyectoRoute();
        let _usuariosRoute = new UsuarioRoute_1.UsuarioRoute();
        let _generosRoute = new GeneroRoute_1.GeneroRoute();
        let _clasificacionesRoute = new ClasificacionRoute_1.ClasificacionRoute();
        let _detallesTecnicosRoute = new DetalleTecnicoRoute_1.DetalleTecnicoRoute();
        let _detallesLiterariosRoute = new DetalleLiterarioRoute_1.DetalleLiterarioRoute();
        let _escenasRoute = new EscenaRoute_1.EscenaRoute();
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
    setConfig() {
        this.setModules();
        this.setRoutes();
        this.api.listen(this.API_PORT);
    }
}
let server = Server.init();
module.exports = server.api;
