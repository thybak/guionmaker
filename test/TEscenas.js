"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THelper_1 = require("../models/THelper");
var APIHelper_1 = require("../routes/APIHelper");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
var escenaIDToDelete = "";
var nombreEntidad = "escena";
var nombreEntidadPlural = nombreEntidad + 's';
describe('Escenas', function () {
    /*
    * Pruebas sobre la entidad Escena
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
        it('debe devolver un error puesto que no se facilita el identificador de proyecto de la escena', function (done) {
            var escena = {
                titulo: "prueba",
                orden: 0,
                destacado: false,
                noche: true,
                exterior: false
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad)
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .send(escena)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.KO);
                done();
            });
        });
        it('debe devolver el documento guardado en la colección con una fecha de creación', function (done) {
            var escena = {
                titulo: "prueba",
                orden: 0,
                destacado: false,
                noche: true,
                exterior: false,
                proyecto: THelper_1.THelper.testProjectId
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad)
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .send(escena)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.insertado.should.be.an('object');
                res.body.insertado.fechaCreacion.should.be.a('string');
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                escenaIDToDelete = res.body.insertado._id;
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
                    "_id": escenaIDToDelete,
                    titulo: "prueba"
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
                res.body.consulta[0].titulo.should.be.eql('prueba');
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
        it('debe devolver el documento generado anteriormente con id ' + escenaIDToDelete, function (done) {
            THelper_1.THelper.getExistente(done, '/api/' + nombreEntidad + '/' + escenaIDToDelete);
        });
    });
    describe('/DELETE ' + nombreEntidad + '/id', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.deleteIsAuth(done, '/api/' + nombreEntidad + '/1');
        });
        it('debe dar error al no haber ' + nombreEntidad + ' ' + THelper_1.THelper.testObjectId + ' para el usuario test', function (done) {
            THelper_1.THelper.deleteNoExistente(done, '/api/' + nombreEntidad + '/' + THelper_1.THelper.testObjectId);
        });
        it('debe borrar la ' + nombreEntidad + ' creada anteriormente', function (done) {
            THelper_1.THelper.deleteExistente(done, '/api/' + nombreEntidad + '/' + escenaIDToDelete);
        });
    });
});
//# sourceMappingURL=TEscenas.js.map