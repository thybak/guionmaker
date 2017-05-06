"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var APIHelper_1 = require("../routes/APIHelper");
var chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
var THelper = (function () {
    function THelper() {
    }
    THelper.getAuthValue = function () {
        return 'Bearer ' + THelper.testUserToken;
    };
    THelper.getIsAuth = function (done, route) {
        chai.request(THelper.app)
            .get(route)
            .end(function (err, res) {
            res.should.have.status(401);
            done();
        });
    };
    THelper.postIsAuth = function (done, route) {
        chai.request(THelper.app)
            .post(route)
            .end(function (err, res) {
            res.should.have.status(401);
            done();
        });
    };
    THelper.deleteIsAuth = function (done, route) {
        chai.request(THelper.app)
            .del(route)
            .end(function (err, res) {
            res.should.have.status(401);
            done();
        });
    };
    THelper.getColeccionVacia = function (done, route) {
        chai.request(THelper.app)
            .get(route)
            .set('Authorization', THelper.getAuthValue())
            .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('Object');
            res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.KO);
            done();
        });
    };
    THelper.getNoExistente = function (done, route) {
        chai.request(THelper.app)
            .get(route)
            .set('Authorization', THelper.getAuthValue())
            .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('Object');
            res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.OK);
            res.body.consulta.should.be.a('array');
            res.body.consulta.length.should.be.eql(0);
            done();
        });
    };
    THelper.deleteNoExistente = function (done, route) {
        chai.request(THelper.app)
            .del(route)
            .set('Authorization', THelper.getAuthValue())
            .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('Object');
            res.body.estado.should.be.eql(APIHelper_1.ResponseStatus.KO);
            done();
        });
    };
    return THelper;
}());
THelper.testUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVVc3VhcmlvIjoidGVzdCIsInBhc3MiOiIzNmYwMjg1ODBiYjAyY2M4MjcyYTlhMDIwZjQyMDBlMzQ2ZTI3NmFlNjY0ZTQ1ZWU4MDc0NTU3NGUyZjVhYjgwIiwidXN1YXJpb0xvZ2VhZG8iOiI1OTBlMDc4ZjZmMjJkMDEwOTBmNjM1ZDMiLCJpYXQiOjE0OTQwOTE2Njh9.CkmrNkXtm5YW3TTuYy934T6MXCWXBvz5YdqN2X8PiYY";
THelper.testUsername = "test";
THelper.testPassword = "test";
THelper.testObjectId = "590307e60214d21da89aef7b";
THelper.app = require("../app");
THelper.notAuthVerbose = "debe dar error 401 al no proporcionar cabecera de autenticación";
exports.THelper = THelper;
//# sourceMappingURL=THelper.js.map