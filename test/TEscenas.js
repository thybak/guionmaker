"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THelper_1 = require("../models/THelper");
var APIHelper_1 = require("../routes/APIHelper");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
describe('Escenas', function () {
    /*
    * Pruebas sobre la entidad escenas
    */
    describe('/GET escenas', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.getIsAuth(done, '/api/escenas');
        });
        it('debe dar error al no haber escenas para el usuario test', function (done) {
            THelper_1.THelper.getColeccionVacia(done, '/api/escenas');
        });
    });
    describe('/POST escena', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.postIsAuth(done, '/api/escena');
        });
        it('debe devolver el documento guardado en la colección con una fecha de creación', function (done) {
            var escena = {
                titulo: "prueba",
                orden: 0,
                destacado: false,
                noche: true,
                exterior: false,
                proyecto: THelper_1.THelper.testObjectId
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/escena')
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .send(escena)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.insertado.should.be.an('object');
                res.body.insertado.fechaCreacion.should.be.a('string');
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                done();
            });
        });
    });
    describe('/POST escenasPorFiltro', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.postIsAuth(done, '/api/escenasPorFiltro');
        });
    });
    describe('/GET escena/id', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.getIsAuth(done, '/api/escena/1');
        });
        it('debe dar error al no haber escena ' + THelper_1.THelper.testObjectId + ' para el usuario test', function (done) {
            THelper_1.THelper.getNoExistente(done, '/api/escena/' + THelper_1.THelper.testObjectId);
        });
    });
    describe('/DELETE escena/id', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.deleteIsAuth(done, '/api/escena/1');
        });
        it('debe dar error al no haber escena ' + THelper_1.THelper.testObjectId + ' para el usuario test', function (done) {
            THelper_1.THelper.deleteNoExistente(done, '/api/escena/' + THelper_1.THelper.testObjectId);
        });
    });
});
//# sourceMappingURL=TEscenas.js.map