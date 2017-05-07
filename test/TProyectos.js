"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THelper_1 = require("../models/THelper");
var APIHelper_1 = require("../routes/APIHelper");
var Colaboraciones_1 = require("../models/Colaboraciones");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
var nombreEntidad = 'proyecto';
var nombreEntidadPlural = nombreEntidad + 's';
var projectIdToDelete = "";
describe('Proyectos', function () {
    /*
    * Pruebas sobre la entidad Proyecto
    */
    describe('/GET ' + nombreEntidadPlural, function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.getIsAuth(done, '/api/' + nombreEntidadPlural);
        });
        it('debe dar error al no haber ' + nombreEntidadPlural + ' para el usuario test', function (done) {
            THelper_1.THelper.getColeccionVacia(done, '/api/' + nombreEntidadPlural);
        });
    });
    describe('/POST ' + nombreEntidad, function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.postIsAuth(done, '/api/' + nombreEntidad);
        });
        it('debe devolver el documento guardado en la colección con una fecha de creación', function (done) {
            var proyecto = {
                nombre: "prueba test",
                sinopsis: "esto es una prueba",
                autor: THelper_1.THelper.testObjectId,
                cancelado: false
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad)
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .send(proyecto)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.insertado.should.be.an('object');
                res.body.insertado.fechaCreacion.should.be.a('string');
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                THelper_1.THelper.testProjectId = res.body.insertado._id;
                done();
            });
        });
        it('debe devolver el documento insertado con el colaborador de mismo ID que test y de solo lectura', function (done) {
            var colaborador = {
                usuario: THelper_1.THelper.testObjectId,
                fecha: Date.now(),
                permisos: Colaboraciones_1.PermisosColaboracion.SoloLectura
            };
            var proyecto = {
                nombre: "prueba con colaborador",
                sinopsis: "esto es un proyecto con colaborador",
                colaboradores: [colaborador],
                autor: THelper_1.THelper.testObjectId,
                publico: true
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad)
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .send(proyecto)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                res.body.insertado.should.be.an('object');
                res.body.insertado.colaboradores.should.be.an('array');
                res.body.insertado.colaboradores[0].usuario.should.be.eql(THelper_1.THelper.testObjectId);
                res.body.insertado.colaboradores[0].permisos.should.be.eql(Colaboraciones_1.PermisosColaboracion.SoloLectura);
                projectIdToDelete = res.body.insertado._id;
                done();
            });
        });
    });
    describe('/POST ' + nombreEntidadPlural + 'PorFiltro', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.postIsAuth(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
        it('debe devolver el documento publicado y con nombre prueba test', function (done) {
            THelper_1.THelper.postFiltroProyectoPrueba(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
        it('no debe devolver ningún registro', function (done) {
            THelper_1.THelper.postFiltroInexistente(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
    });
    describe('/GET ' + nombreEntidad + '/id', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.getIsAuth(done, '/api/' + nombreEntidad + '/1');
        });
        it('debe dar error al no haber ' + nombreEntidad + ' ' + THelper_1.THelper.testObjectId + ' para el usuario test', function (done) {
            THelper_1.THelper.getNoExistente(done, '/api/' + nombreEntidad + '/' + THelper_1.THelper.testObjectId);
        });
        it('debe devolver el documento generado anteriormente con id ' + THelper_1.THelper.testProjectId, function (done) {
            THelper_1.THelper.getExistente(done, '/api/' + nombreEntidad + '/' + THelper_1.THelper.testProjectId);
        });
    });
    describe('/GET ' + nombreEntidadPlural, function () {
        it('ahora que hay documentos para el usuario, debe poder recuperarlos', function (done) {
            THelper_1.THelper.getExistente(done, '/api/' + nombreEntidadPlural, false);
        });
    });
    describe('/DELETE ' + nombreEntidad + '/id', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.deleteIsAuth(done, '/api/' + nombreEntidad + '/1');
        });
        it('debe dar error al no haber ' + nombreEntidad + ' ' + THelper_1.THelper.testObjectId + ' para el usuario test', function (done) {
            THelper_1.THelper.deleteNoExistente(done, '/api/' + nombreEntidad + '/' + THelper_1.THelper.testObjectId);
        });
        it('debe poder eliminar el último registro insertado anteriormente y mandar una confirmación', function (done) {
            THelper_1.THelper.deleteExistente(done, '/api/' + nombreEntidad + '/' + projectIdToDelete);
        });
    });
    describe('/POST ' + nombreEntidadPlural + 'PorFiltro', function () {
        it('debe devolver el proyecto generado para el resto de pruebas tras eliminar el primero ' + THelper_1.THelper.testProjectId, function (done) {
            THelper_1.THelper.postFiltroProyectoPrueba(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
    });
});
//# sourceMappingURL=TProyectos.js.map