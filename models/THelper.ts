import * as mongoose from "mongoose";
import * as chai from "chai";
import { ResponseStatus } from "../routes/APIHelper";
import chaiHttp = require("chai-http");

let should = chai.should();
chai.use(chaiHttp);

export class THelper {
    static testUserToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmVVc3VhcmlvIjoidGVzdCIsInBhc3MiOiIzNmYwMjg1ODBiYjAyY2M4MjcyYTlhMDIwZjQyMDBlMzQ2ZTI3NmFlNjY0ZTQ1ZWU4MDc0NTU3NGUyZjVhYjgwIiwidXN1YXJpb0xvZ2VhZG8iOiI1OTBlMDc4ZjZmMjJkMDEwOTBmNjM1ZDMiLCJpYXQiOjE0OTQwOTE2Njh9.CkmrNkXtm5YW3TTuYy934T6MXCWXBvz5YdqN2X8PiYY";
    static testUsername: string = "test";
    static testPassword: string = "test";
    static testObjectId: string = "590e078f6f22d01090f635d3";
    static testProjectId: string = "";
    static app: Express.Application = require("../app");
    static notAuthVerbose: string = "debe dar error 401 al no proporcionar cabecera de autenticación";

    static getAuthValue(): string {
        return 'Bearer ' + THelper.testUserToken;
    }

    static getIsAuth(done: MochaDone, route: string) {
        chai.request(THelper.app)
            .get(route)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    }

    static postIsAuth(done: MochaDone, route: string) {
        chai.request(THelper.app)
            .post(route)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    }

    static deleteIsAuth(done: MochaDone, route: string) {
        chai.request(THelper.app)
            .del(route)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    }

    static getColeccionVacia(done: MochaDone, route: string) {
        chai.request(THelper.app)
            .get(route)
            .set('Authorization', THelper.getAuthValue())
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.estado.should.be.eql(ResponseStatus.KO);
                done();
            });
    }

    static getNoExistente(done: MochaDone, route: string) {
        chai.request(THelper.app)
            .get(route)
            .set('Authorization', THelper.getAuthValue())
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.estado.should.be.eql(ResponseStatus.OK);
                res.body.consulta.should.be.a('array');
                res.body.consulta.length.should.be.eql(0);
                done();
            });
    }

    static getExistente(done: MochaDone, route: string, porId: boolean = true) {
        chai.request(THelper.app)
            .get(route)
            .set('Authorization', THelper.getAuthValue())
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.consulta.should.be.an('array');
                res.body.estado.should.be.eql(ResponseStatus.OK);
                if (porId) {
                    res.body.consulta.length.should.be.eql(1);
                } else {
                    res.body.consulta.length.should.be.above(0);
                }
                done();
            });
    }

    static deleteNoExistente(done: MochaDone, route: string) {
        chai.request(THelper.app)
            .del(route)
            .set('Authorization', THelper.getAuthValue())
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.estado.should.be.eql(ResponseStatus.KO);
                done();
            });
    }

    static deleteExistente(done: MochaDone, route: string) {
        chai.request(THelper.app)
            .del(route)
            .set('Authorization', THelper.getAuthValue())
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.estado.should.be.eql(ResponseStatus.OK);
                done();
            });
    }

    static postFiltroInexistente(done: MochaDone, route: string) {
        let filtro = {
            find: {
                "_id": THelper.testObjectId
            }
        };
        chai.request(THelper.app)
            .post(route)
            .set('Authorization', THelper.getAuthValue())
            .send(filtro)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.estado.should.be.eql(ResponseStatus.OK);
                res.body.consulta.should.be.an('array');
                res.body.consulta.length.should.be.eql(0);
                done();
            });
    }

    static postFiltroProyectoPrueba(done: MochaDone, route: string) {
        let filtro = {
            find: {
                "_id": THelper.testProjectId,
                "nombre": "prueba test"
            }
        };
        chai.request(THelper.app)
            .post(route)
            .set('Authorization', THelper.getAuthValue())
            .send(filtro)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.estado.should.be.eql(ResponseStatus.OK);
                res.body.consulta.should.be.an('array');
                res.body.consulta.length.should.be.eql(1);
                res.body.consulta[0].nombre.should.be.eql('prueba test');
                done();
            });
    }
}