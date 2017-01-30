"use strict";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const IndexRoute_1 = require("./routes/IndexRoute");
const ProyectoRoute_1 = require("./routes/ProyectoRoute");
const UsuarioRoute_1 = require("./routes/UsuarioRoute");
const GeneroRoute_1 = require("./routes/GeneroRoute");
const ClasificacionRoute_1 = require("./routes/ClasificacionRoute");
const DetalleTecnicoRoute_1 = require("./routes/DetalleTecnicoRoute");
const DetalleLiterarioRoute_1 = require("./routes/DetalleLiterarioRoute");
const EscenaRoute_1 = require("./routes/EscenaRoute");
const PlantillaRoute_1 = require("./routes/PlantillaRoute");
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
        this.api.use(bodyParser.json({ limit: 1024 * 1024 * 3 }));
        this.api.use(bodyParser.urlencoded({ extended: true }));
        this.api.use(cookieParser());
        this.api.use(express.static(path.join(__dirname, '/public/dist')));
        this.api.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        this.api.use(cors()); // cross-origin resource sharing
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
        let _plantillasRoute = new PlantillaRoute_1.PlantillaRoute();
        router.get('/', _indexRoute.index.bind(_indexRoute.index));
        router.get('/api/proyectos', _proyectosRoute.getProyectos.bind(_proyectosRoute.getProyectos));
        router.post('/api/proyectosPorFiltro', _proyectosRoute.getProyectosByFilterAndSort.bind(_proyectosRoute.getProyectosByFilterAndSort));
        router.get('/api/proyecto/:id', _proyectosRoute.getProyectoById.bind(_proyectosRoute.getProyectoById));
        router.delete('/api/proyecto/:id', _proyectosRoute.deleteProyecto.bind(_proyectosRoute.deleteProyecto));
        router.post('/api/proyecto/', _proyectosRoute.addProyecto.bind(_proyectosRoute.addProyecto));
        router.get('/api/usuarios', _usuariosRoute.getUsuarios.bind(_usuariosRoute.getUsuarios));
        router.post('/api/usuario/', _usuariosRoute.addUsuario.bind(_usuariosRoute.addUsuario));
        router.get('/api/usuario/:id', _usuariosRoute.getUsuarioById.bind(_usuariosRoute.getUsuarioById));
        router.delete('/api/usuario/:id', _usuariosRoute.deleteUsuario.bind(_usuariosRoute.deleteUsuario));
        router.get('/api/generos', _generosRoute.getGeneros.bind(_generosRoute.getGeneros));
        router.post('/api/genero/', _generosRoute.addGenero.bind(_generosRoute.addGenero));
        router.get('/api/genero/:id', _generosRoute.getGeneroById.bind(_generosRoute.getGeneroById));
        router.delete('/api/genero/:id', _generosRoute.deleteGenero.bind(_generosRoute.deleteGenero));
        router.get('/api/clasificaciones', _clasificacionesRoute.getClasificaciones.bind(_clasificacionesRoute.getClasificaciones));
        router.post('/api/clasificacion/', _clasificacionesRoute.addClasificacion.bind(_clasificacionesRoute.addClasificacion));
        router.get('/api/clasificacion/:id', _clasificacionesRoute.getClasificacionById.bind(_clasificacionesRoute.getClasificacionById));
        router.delete('/api/clasificacion/:id', _clasificacionesRoute.deleteClasificacion.bind(_clasificacionesRoute.deleteClasificacion));
        router.get('/api/escenas', _escenasRoute.getEscenas.bind(_escenasRoute.getEscenas));
        router.post('/api/escenasPorFiltro', _escenasRoute.getEscenasByFilterAndSort.bind(_escenasRoute.getEscenasByFilterAndSort));
        router.post('/api/escena/', _escenasRoute.addEscena.bind(_escenasRoute.addEscena));
        router.post('/api/escena/actualizar/', _escenasRoute.updateEscena.bind(_escenasRoute.updateEscena));
        router.get('/api/escena/:id', _escenasRoute.getEscenaById.bind(_escenasRoute.getEscenaById));
        router.delete('/api/escena/:id', _escenasRoute.deleteEscena.bind(_escenasRoute.deleteEscena));
        router.get('/api/detallesTecnicos', _detallesTecnicosRoute.getDetallesTecnicos.bind(_detallesTecnicosRoute.getDetallesTecnicos));
        router.post('/api/detalleTecnico/', _detallesTecnicosRoute.addDetalleTecnico.bind(_detallesTecnicosRoute.addDetalleTecnico));
        router.get('/api/detalleTecnico/:id', _detallesTecnicosRoute.getDetalleTecnicoById.bind(_detallesTecnicosRoute.getDetalleTecnicoById));
        router.delete('/api/detalleTecnico/:id', _detallesTecnicosRoute.deleteDetalleTecnico.bind(_detallesTecnicosRoute.deleteDetalleTecnico));
        router.get('/api/detallesLiterarios', _detallesLiterariosRoute.getDetallesLiterarios.bind(_detallesLiterariosRoute.getDetallesLiterarios));
        router.post('/api/detalleLiterario/', _detallesLiterariosRoute.addDetalleLiterario.bind(_detallesLiterariosRoute.addDetalleLiterario));
        router.get('/api/detalleLiterario/:id', _detallesLiterariosRoute.getDetalleLiterarioById.bind(_detallesLiterariosRoute.getDetalleLiterarioById));
        router.delete('/api/detalleLiterario/:id', _detallesLiterariosRoute.deleteDetalleLiterario.bind(_detallesLiterariosRoute.deleteDetalleLiterario));
        router.get('/api/plantillas', _plantillasRoute.getPlantillas.bind(_plantillasRoute.getPlantillas));
        router.post('/api/plantillasPorFiltro', _plantillasRoute.getPlantillasByFilterAndSort.bind(_plantillasRoute.getPlantillasByFilterAndSort));
        router.post('/api/plantilla/', _plantillasRoute.addPlantilla.bind(_plantillasRoute.addPlantilla));
        router.get('/api/plantilla/:id', _plantillasRoute.getPlantillaById.bind(_plantillasRoute.getPlantillaById));
        router.delete('/api/plantilla/:id', _plantillasRoute.deletePlantilla.bind(_plantillasRoute.deletePlantilla));
        this.api.use(router);
    }
    setConfig() {
        this.setModules();
        this.setRoutes();
        this.api.listen(this.API_PORT);
    }
}
module.exports = Server.init().api;
