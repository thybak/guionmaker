"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THelper_1 = require("../models/THelper");
var APIHelper_1 = require("../routes/APIHelper");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
var nombreEntidad = 'usuario';
var nombreEntidadPlural = nombreEntidad + 's';
var entidadId = "";
describe('Usuarios', function () {
    /*
    * Pruebas sobre la entidad Usuarios
    */
    describe('POST ' + nombreEntidad, function () {
        it('no debe permitir guardar un usuario sin sus campos obligatorios', function (done) {
            var entidad = {
                nombre: "pruebas",
                apellidos: "tests",
                nombreUsuario: "pruebas",
                pass: "36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80"
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad)
                .send(entidad)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.KO);
                done();
            });
        });
        it('debe guardar el documento y devolverlo tras insertarlo', function (done) {
            var entidad = {
                nombre: "pruebas",
                apellidos: "tests",
                email: "pruebas@pruebas.com",
                nombreUsuario: "pruebas",
                pass: "36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80"
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad)
                .send(entidad)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                res.body.insertado.should.be.an('object');
                res.body.insertado._id.should.be.an('string');
                res.body.insertado._id.length.should.be.eql(24);
                entidadId = res.body.insertado._id;
                done();
            });
        });
        it('debe actualizar el nombre de usuario pruebas a prueba y devolver la confirmación', function (done) {
            var entidad = {
                _id: entidadId,
                nombreUsuario: "prueba"
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad)
                .send(entidad)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                done();
            });
        });
    });
    describe('GET ' + nombreEntidad + '/id', function () {
        it(THelper_1.THelper.notAuthVerbose, function (done) {
            THelper_1.THelper.getIsAuth(done, '/api/' + nombreEntidad + '/' + entidadId);
        });
        it('no debe encontrar al ' + nombreEntidad + ' de id ' + THelper_1.THelper.testObjectId, function (done) {
            THelper_1.THelper.getNoExistente(done, '/api/' + nombreEntidad + '/' + THelper_1.THelper.testObjectId);
        });
        it('debe mostrar la información básica del usuario prueba creado', function (done) {
            THelper_1.THelper.getExistente(done, '/api/' + nombreEntidad + '/' + entidadId);
        });
        it('no debe seleccionar la contraseña entre la información básica del usuario y el nombre debe ser prueba', function (done) {
            chai.request(THelper_1.THelper.app)
                .get('/api/' + nombreEntidad + '/' + entidadId)
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                res.body.consulta.should.be.an('array');
                res.body.consulta.length.should.be.eql(1);
                should.not.exist(res.body.consulta[0].pass);
                res.body.consulta[0].nombreUsuario.should.be.eql('prueba');
                done();
            });
        });
    });
    describe('POST ' + nombreEntidad + '/login', function () {
        it('no debe devolver el token de sesión al no facilitar nombre de usuario', function (done) {
            var entidad = {
                pass: "36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80"
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad + '/login')
                .send(entidad)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.KO);
                done();
            });
        });
        it('no debe devolver el token de sesión al no facilitar contraseña', function (done) {
            var entidad = {
                nombreUsuario: "prueba"
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad + '/login')
                .send(entidad)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.KO);
                done();
            });
        });
        it('no debe devolver el token de sesión al no facilitar nombre y contraseña correctos', function (done) {
            var entidad = {
                nombreUsuario: "pruebaXx",
                pass: "36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80"
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad + '/login')
                .send(entidad)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.KO);
                done();
            });
        });
        it('debe devolver el token de sesión', function (done) {
            var entidad = {
                nombreUsuario: "prueba",
                pass: "36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80"
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidad + '/login')
                .send(entidad)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                res.body.login.should.be.an('object');
                res.body.login.tokenUsuario.should.be.an('string');
                res.body.login.tokenUsuario.length.should.be.above(0);
                res.body.login.usuarioLogeado.should.be.an('string');
                res.body.login.nombreUsuario.should.be.an('string');
                done();
            });
        });
    });
    describe('POST ' + nombreEntidadPlural + 'PorFiltro', function () {
        it('no debe dejar hacer la búsqueda sin token de sesión (401)', function (done) {
            THelper_1.THelper.postIsAuth(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
        it('debe mostrar información básica correspondiente al usuario de nombre de usuario prueba', function (done) {
            var filtro = {
                find: {
                    nombreUsuario: "prueba"
                }
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidadPlural + 'PorFiltro')
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .send(filtro)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                res.body.consulta.should.be.an('array');
                res.body.consulta.length.should.be.eql(1);
                res.body.consulta[0].nombreUsuario.should.be.a('string');
                res.body.consulta[0].email.should.be.a('string');
                res.body.consulta[0]._id.should.be.a('string');
                done();
            });
        });
        it('no debe mostrar la contraseña del usuario prueba', function (done) {
            var filtro = {
                find: {
                    nombreUsuario: "prueba"
                },
                select: "_id nombreUsuario pass email"
            };
            chai.request(THelper_1.THelper.app)
                .post('/api/' + nombreEntidadPlural + 'PorFiltro')
                .set('Authorization', THelper_1.THelper.getAuthValue())
                .send(filtro)
                .end(function (err, res) {
                res.should.have.status(200);
                res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
                res.body.consulta.should.be.an('array');
                res.body.consulta.length.should.be.eql(1);
                res.body.consulta[0].nombreUsuario.should.be.a('string');
                res.body.consulta[0].email.should.be.a('string');
                res.body.consulta[0]._id.should.be.a('string');
                should.not.exist(res.body.consulta[0].pass);
                done();
            });
        });
    });
});
//# sourceMappingURL=TUsuario.js.map