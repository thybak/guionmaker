"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THelper_1 = require("../models/THelper");
var APIHelper_1 = require("../routes/APIHelper");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
var entidadIDToDelete = "";
var nombreEntidad = "plantilla";
var nombreEntidadPlural = nombreEntidad + 's';
describe('Plantillas', function () {
    /*
    * Pruebas sobre la entidad Plantillas
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
        it('debe devolver un error al no asignar un autor a la entidad', function (done) {
            var entidad = {
                nombre: "prueba",
                porDefecto: true,
                htmlEscena: "<h2>Hola mundo</h2>",
                htmlPortada: "<h1>Portada de plantilla por defecto</h1>"
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad)
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .send(entidad)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.KO);
                done();
            });
        });
        it('debe devolver el documento guardado en la colección con un identificador asignado', function (done) {
            var entidad = {
                nombre: "prueba",
                porDefecto: true,
                htmlEscena: "<h2>Hola mundo</h2>",
                htmlPortada: "<h1>Portada de plantilla por defecto</h1>",
                autor: THelper_1.THelper.testObjectId
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad)
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .send(entidad)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.insertado.should.be.an('object');
                res.body.insertado._id.should.be.a('string');
                res.body.insertado._id.length.should.be.eql(THelper_1.THelper.testProjectId.length);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                entidadIDToDelete = res.body.insertado._id;
                done();
            });
        });
    });
    describe('/POST ' + nombreEntidadPlural + 'PorFiltro', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.postIsAuth(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
        it('no debe devolver ningún registro', function (done) {
            THelper_1.THelper.postFiltroInexistente(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
        it('debe devolver el registro introducido anteriormente con título prueba', function (done) {
            var filtro = {
                find: {
                    "_id": entidadIDToDelete,
                    nombre: "prueba"
                }
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidadPlural + 'PorFiltro')
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .send(filtro)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.consulta.should.be.an('array');
                res.body.consulta.length.should.be.eql(1);
                res.body.consulta[0].nombre.should.be.eql('prueba');
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                done();
            });
        });
    });
    describe('/GET ' + nombreEntidad + '/id', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.getIsAuth(done, '/api/' + nombreEntidad + '/1');
        });
        it('debe dar error al no haber ' + nombreEntidad + ' ' + THelper_1.THelper.testObjectId + ' para el usuario test', function (done) {
            THelper_1.THelper.getNoExistente(done, '/api/' + nombreEntidad + '/' + THelper_1.THelper.testObjectId);
        });
        it('debe devolver el documento generado anteriormente con id ' + entidadIDToDelete, function (done) {
            THelper_1.THelper.getExistente(done, '/api/' + nombreEntidad + '/' + entidadIDToDelete);
        });
    });
    describe('/DELETE ' + nombreEntidad + '/id', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.deleteIsAuth(done, '/api/' + nombreEntidad + '/1');
        });
        it('debe dar error al no haber ' + nombreEntidad + ' ' + THelper_1.THelper.testObjectId + ' para el usuario test', function (done) {
            THelper_1.THelper.deleteNoExistente(done, '/api/' + nombreEntidad + '/' + THelper_1.THelper.testObjectId);
        });
        it('debe devolver la confirmación de borrado para la entidad', function (done) {
            THelper_1.THelper.deleteExistente(done, '/api/' + nombreEntidad + '/' + entidadIDToDelete);
        });
    });
});
//# sourceMappingURL=TPlantillas.js.map