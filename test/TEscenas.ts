import * as mongoose from "mongoose";
import { THelper } from "../models/THelper";
import { ResponseStatus } from "../routes/APIHelper";
import * as chai from "chai";
import chaiHttp = require("chai-http");

let should = chai.should();
chai.use(chaiHttp);

let escenaIDToDelete = "";
let nombreEntidad = "escena";
let nombreEntidadPlural = nombreEntidad + 's';
describe('Escenas', () => {
    /*
    * Pruebas sobre la entidad Escena
    */
    describe('/GET ' + nombreEntidadPlural, () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.getIsAuth(done, '/api/' + nombreEntidadPlural);
        });
        it('debe dar error al no haber ' + nombreEntidadPlural + ' para el usuario test', (done) => {
            THelper.getColeccionVacia(done, '/api/' + nombreEntidadPlural);
        });
    });
    describe('/POST ' + nombreEntidad, () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.postIsAuth(done, '/api/' + nombreEntidad);
        });
        it('debe devolver un error puesto que no se facilita el identificador de proyecto de la escena', (done) => {
            let escena = {
                titulo: "prueba",
                orden: 0,
                destacado: false,
                noche: true,
                exterior: false
            }
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad)
                .set('Authorization', THelper.getAuthValue())
                .send(escena)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.KO);
                    done();
                });
        });
        it('debe devolver el documento guardado en la colección con una fecha de creación', (done) => {
            let escena = {
                titulo: "prueba",
                orden: 0,
                destacado: false,
                noche: true,
                exterior: false,
                proyecto: THelper.testProjectId
            }
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad)
                .set('Authorization', THelper.getAuthValue())
                .send(escena)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.insertado.should.be.an('object');
                    res.body.insertado.fechaCreacion.should.be.a('string');
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    escenaIDToDelete = res.body.insertado._id;
                    done();
                });
        });
    });
    describe('/POST ' + nombreEntidadPlural + 'PorFiltro', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.postIsAuth(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
        it('no debe devolver ningún registro', (done) => {
            THelper.postFiltroInexistente(done, '/api/' + nombreEntidadPlural + 'PorFiltro')
        });
        it('debe devolver el registro introducido anteriormente con título prueba', (done) => {
            let filtro = {
                find: {
                    "_id": escenaIDToDelete,
                    titulo: "prueba"
                }
            };
            chai.request(THelper.app)
                .post('/api/' + nombreEntidadPlural + 'PorFiltro')
                .set('Authorization', THelper.getAuthValue())
                .send(filtro)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.consulta.should.be.an('array');
                    res.body.consulta.length.should.be.eql(1);
                    res.body.consulta[0].titulo.should.be.eql('prueba');
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    done();
                })
        });
    });
    describe('/GET ' + nombreEntidad + '/id', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.getIsAuth(done, '/api/' + nombreEntidad + '/1');
        });
        it('debe dar error al no haber ' + nombreEntidad + ' ' + THelper.testObjectId + ' para el usuario test', (done) => {
            THelper.getNoExistente(done, '/api/' + nombreEntidad + '/' + THelper.testObjectId);
        });
        it('debe devolver el documento generado anteriormente con id ' + escenaIDToDelete, (done) => {
            THelper.getExistente(done, '/api/' + nombreEntidad + '/' + escenaIDToDelete);
        });
    });
    describe('/DELETE ' + nombreEntidad + '/id', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.deleteIsAuth(done, '/api/' + nombreEntidad + '/1');
        });
        it('debe dar error al no haber ' + nombreEntidad + ' ' + THelper.testObjectId + ' para el usuario test', (done) => {
            THelper.deleteNoExistente(done, '/api/' + nombreEntidad + '/' + THelper.testObjectId);
        });
        it('debe borrar la ' + nombreEntidad + ' creada anteriormente', (done) => {
            THelper.deleteExistente(done, '/api/' + nombreEntidad + '/' + escenaIDToDelete);
        });
    });

});