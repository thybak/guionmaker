import * as mongoose from "mongoose";
import { THelper } from "../models/THelper";
import { ResponseStatus } from "../routes/APIHelper";
import { PermisosColaboracion } from "../models/Colaboraciones";
import * as chai from "chai";
import chaiHttp = require("chai-http");

let should = chai.should();
chai.use(chaiHttp);

let nombreEntidad = 'proyecto';
let nombreEntidadPlural = nombreEntidad + 's';
let projectIdToDelete = "";

describe('Proyectos', () => {
    /*
    * Pruebas sobre la entidad Proyecto
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
        it('debe devolver el documento guardado en la colección con una fecha de creación', (done) => {
            let proyecto = {
                nombre: "prueba test",
                sinopsis: "esto es una prueba",
                autor: THelper.testObjectId,
                cancelado: false
            };
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad)
                .set('Authorization', THelper.getAuthValue())
                .send(proyecto)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.insertado.should.be.an('object');
                    res.body.insertado.fechaCreacion.should.be.a('string');
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    THelper.testProjectId = res.body.insertado._id;
                    done();
                });
        });
        it('debe devolver el documento insertado con el colaborador de mismo ID que test y de solo lectura', (done) => {
            let colaborador = {
                usuario: THelper.testObjectId,
                fecha: Date.now(),
                permisos: PermisosColaboracion.SoloLectura
            }
            let proyecto = {
                nombre: "prueba con colaborador",
                sinopsis: "esto es un proyecto con colaborador",
                colaboradores: [colaborador],
                autor: THelper.testObjectId,
                publico: true
            }
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad)
                .set('Authorization', THelper.getAuthValue())
                .send(proyecto)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    res.body.insertado.should.be.an('object');
                    res.body.insertado.colaboradores.should.be.an('array');
                    res.body.insertado.colaboradores[0].usuario.should.be.eql(THelper.testObjectId);
                    res.body.insertado.colaboradores[0].permisos.should.be.eql(PermisosColaboracion.SoloLectura);
                    projectIdToDelete = res.body.insertado._id;
                    done();
                });
        });
    });
    describe('/POST ' + nombreEntidadPlural + 'PorFiltro', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.postIsAuth(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
        it('debe devolver el documento publicado y con nombre prueba test', (done) => {
            THelper.postFiltroProyectoPrueba(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
        it('no debe devolver ningún registro', (done) => {
            THelper.postFiltroInexistente(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
    });
    describe('/GET ' + nombreEntidad + '/id', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.getIsAuth(done, '/api/' + nombreEntidad + '/1');
        });
        it('debe dar error al no haber ' + nombreEntidad + ' ' + THelper.testObjectId + ' para el usuario test', (done) => {
            THelper.getNoExistente(done, '/api/' + nombreEntidad + '/' + THelper.testObjectId);
        });
        it('debe devolver el documento generado anteriormente con id ' + THelper.testProjectId, (done) => {
            THelper.getExistente(done, '/api/' + nombreEntidad + '/' + THelper.testProjectId);
        });
    });
    describe('/GET ' + nombreEntidadPlural, () => {
        it('ahora que hay documentos para el usuario, debe poder recuperarlos', (done) => {
            THelper.getExistente(done, '/api/' + nombreEntidadPlural, false);
        });
    });
    describe('/DELETE ' + nombreEntidad + '/id', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.deleteIsAuth(done, '/api/' + nombreEntidad + '/1');
        });
        it('debe dar error al no haber ' + nombreEntidad + ' ' + THelper.testObjectId + ' para el usuario test', (done) => {
            THelper.deleteNoExistente(done, '/api/' + nombreEntidad + '/' + THelper.testObjectId);
        });
        it('debe poder eliminar el último registro insertado anteriormente y mandar una confirmación', (done) => {
            THelper.deleteExistente(done, '/api/' + nombreEntidad + '/' + projectIdToDelete);
        });
    });
    describe('/POST ' + nombreEntidadPlural + 'PorFiltro', () => {
        it('debe devolver el proyecto generado para el resto de pruebas tras eliminar el primero ' + THelper.testProjectId, (done) => {
            THelper.postFiltroProyectoPrueba(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
    });

});