"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THelper_1 = require("../models/THelper");
var APIHelper_1 = require("../routes/APIHelper");
var chai = require("chai");
var chaiHttp = require("chai-http");
var nombreEntidad = "clasificacion";
var nombreEntidadPlural = nombreEntidad + 'es';
var should = chai.should();
chai.use(chaiHttp);
describe('Clasificaciones', function () {
    describe('GET ' + nombreEntidadPlural, function () {
        it('debe mostrar un error 401 al intentar obtener el listado sin token de sesión', function (done) {
            THelper_1.THelper.getIsAuth(done, '/api/' + nombreEntidadPlural);
        });
        it('debe devolver un listado de todas las ' + nombreEntidadPlural, function (done) {
            THelper_1.THelper.getExistente(done, '/api/' + nombreEntidadPlural, false);
        });
    });
    describe('GET ' + nombreEntidad + '/id', function () {
        it('debe mostrar un error 401 al no proporcionar el token de sesión', function (done) {
            THelper_1.THelper.getIsAuth(done, '/api/' + nombreEntidad + '/' + THelper_1.THelper.testObjectId);
        });
        it('no debe devolver ningún registro puesto que no existe ninguno con id ' + THelper_1.THelper.testObjectId, function (done) {
            THelper_1.THelper.getNoExistente(done, '/api/' + nombreEntidad + '/' + THelper_1.THelper.testObjectId);
        });
        it('debe devolver la clasificación recomendada para la infancia', function (done) {
            chai.request(THelper_1.THelper.app)
                .get('/api/' + nombreEntidad + '/582dec0a182637006ba9d7ca')
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                res.body.consulta.should.be.an('array');
                res.body.consulta.length.should.be.eql(1);
                res.body.consulta[0].nombre.should.be.eql('Especialmente recomendados para la infancia.');
                done();
            });
        });
    });
});
//# sourceMappingURL=TClasificaciones.js.map