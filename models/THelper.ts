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
    static testObjectId: string = "590307e60214d21da89aef7b";
    static app: Express.Application = require("../app");
    static notAuthVerbose: string = "debe dar error 401 al no proporcionar cabecera de autenticación";

    static getAuthValue(): string {
        return 'Bearer ' + THelper.testUserToken;
    }

    static getIsAuth(done: DoneFn, route: string) {
        chai.request(THelper.app)
            .get(route)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    }

    static postIsAuth(done: DoneFn, route: string) {
        chai.request(THelper.app)
            .post(route)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    }

    static deleteIsAuth(done: DoneFn, route: string) {
        chai.request(THelper.app)
            .del(route)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    }

    static getColeccionVacia(done: DoneFn, route: string) {
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

    static getNoExistente(done: DoneFn, route: string) {
        chai.request(THelper.app)
            .get(route)
            .set('Authorization', THelper.getAuthValue())
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.estado.should.be.eql(ResponseStatus.OK);
                res.body.consulta.should.be.a('array');
                res.body.consulta.length.should.be.eql(0);
                done();
            });
    }

    static deleteNoExistente(done: DoneFn, route: string) {
        chai.request(THelper.app)
            .del(route)
            .set('Authorization', THelper.getAuthValue())
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.estado.should.be.eql(ResponseStatus.KO);
                done();
            });
    }
}