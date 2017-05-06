import * as mongoose from "mongoose";
import { THelper } from "../models/THelper";
import { ResponseStatus } from "../routes/APIHelper";
import * as chai from "chai";   
import chaiHttp = require("chai-http");

let should = chai.should();
chai.use(chaiHttp);
describe('Escenas', () => {
    /*
    * Pruebas sobre la entidad escenas
    */
    describe('/GET escenas', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.getIsAuth(done, '/api/escenas');
        });
        it('debe dar error al no haber escenas para el usuario test', (done) => {
            THelper.getColeccionVacia(done, '/api/escenas');
        });
    });
    describe('/POST escena', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.postIsAuth(done, '/api/escena');
        });
        it('debe devolver el documento guardado en la colección con una fecha de creación', (done) => {
            let escena = {
                titulo: "prueba",
                orden: 0,
                destacado: false,
                noche: true,
                exterior: false,
                proyecto: THelper.testObjectId
            }
            chai.request(THelper.app)
                .post('/api/escena')
                .set('Authorization', THelper.getAuthValue())
                .send(escena)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.insertado.should.be.an('object');
                    res.body.insertado.fechaCreacion.should.be.a('string');
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    done();
                });
        });
    });
    describe('/POST escenasPorFiltro', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.postIsAuth(done, '/api/escenasPorFiltro');
        });
    });
    describe('/GET escena/id', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.getIsAuth(done, '/api/escena/1');
        });
        it('debe dar error al no haber escena ' + THelper.testObjectId + ' para el usuario test', (done) => {
            THelper.getNoExistente(done, '/api/escena/' + THelper.testObjectId);
        });
    });
    describe('/DELETE escena/id', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.deleteIsAuth(done, '/api/escena/1');
        });
        it('debe dar error al no haber escena ' + THelper.testObjectId + ' para el usuario test', (done) => {
            THelper.deleteNoExistente(done, '/api/escena/' + THelper.testObjectId);
        });
    });

});