import * as mongoose from "mongoose";
import { THelper } from "../models/THelper";
import { ResponseStatus } from "../routes/APIHelper";
import { UsuarioRoute } from "../routes/UsuarioRoute";
import * as chai from "chai";
import chaiHttp = require("chai-http");

let should = chai.should();
chai.use(chaiHttp);

let nombreEntidad = 'usuario';
let nombreEntidadPlural = nombreEntidad + 's';
let entidadId = "";
describe('Usuarios', () => {
    /* 
    * Pruebas sobre la entidad Usuario
    */
    describe('POST ' + nombreEntidad, () => {
        it('no debe permitir guardar un usuario sin sus campos obligatorios', (done) => {
            let entidad = {
                nombre: "pruebas",
                apellidos: "tests",
                nombreUsuario: "pruebas",
                pass: "36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80"
            };
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad)
                .send(entidad)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.KO);
                    done();
                });
        });
        it('debe guardar el documento y devolverlo tras insertarlo', (done) => {
            let entidad = {
                nombre: "pruebas",
                apellidos: "tests",
                email: "pruebas@pruebas.com",
                nombreUsuario: "pruebas",
                pass: "36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80"
            };
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad)
                .send(entidad)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    res.body.insertado.should.be.an('object');
                    res.body.insertado._id.should.be.an('string');
                    res.body.insertado._id.length.should.be.eql(24);
                    entidadId = res.body.insertado._id;
                    done();
                });
        });
        it('debe actualizar el nombre de usuario pruebas a prueba y devolver la confirmación', (done) => {
            let entidad = {
                _id: entidadId,
                nombreUsuario: "prueba"
            }
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad)
                .send(entidad)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    done();
                });
        });
    });
    describe('GET ' + nombreEntidad + '/id', () => {
        it(THelper.notAuthVerbose, (done) => {
            THelper.getIsAuth(done, '/api/' + nombreEntidad + '/' + entidadId);
        });
        it('no debe encontrar al ' + nombreEntidad + ' de id 000000000000000000000000', (done) => {
            THelper.getNoExistente(done, '/api/' + nombreEntidad + '/000000000000000000000000');
        });
        it('debe mostrar la información básica del usuario prueba creado', (done) => {
            THelper.getExistente(done, '/api/' + nombreEntidad + '/' + entidadId);
        });
        it('no debe seleccionar la contraseña entre la información básica del usuario y el nombre debe ser prueba', (done) => {
            chai.request(THelper.app)
                .get('/api/' + nombreEntidad + '/' + entidadId)
                .set('Authorization', THelper.getAuthValue())
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    res.body.consulta.should.be.an('array');
                    res.body.consulta.length.should.be.eql(1);
                    should.not.exist(res.body.consulta[0].pass);
                    res.body.consulta[0].nombreUsuario.should.be.eql('prueba');
                    done();
                });
        });
    });
    describe('POST ' + nombreEntidad + '/login', () => {
        it('no debe devolver el token de sesión al no facilitar nombre de usuario', (done) => {
            let entidad = {
                pass: "36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80"
            }
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad + '/login')
                .send(entidad)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.KO);
                    done();
                });
        });
        it('no debe devolver el token de sesión al no facilitar contraseña', (done) => {
            let entidad = {
                nombreUsuario: "prueba"
            }
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad + '/login')
                .send(entidad)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.KO);
                    done();
                });
        });
        it('no debe devolver el token de sesión al no facilitar nombre y contraseña correctos', (done) => {
            let entidad = {
                nombreUsuario: "pruebaXx",
                pass: "36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80"
            }
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad + '/login')
                .send(entidad)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.KO);
                    done();
                });
        });
        it('debe devolver el token de sesión', (done) => {
            let entidad = {
                nombreUsuario: "prueba",
                pass: "36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80"
            }
            chai.request(THelper.app)
                .post('/api/' + nombreEntidad + '/login')
                .send(entidad)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    res.body.login.should.be.an('object');
                    res.body.login.tokenUsuario.should.be.an('string');
                    res.body.login.tokenUsuario.length.should.be.above(0);
                    res.body.login.usuarioLogeado.should.be.an('string');
                    res.body.login.nombreUsuario.should.be.an('string');
                    done();
                });
        });
    });
    describe('POST ' + nombreEntidadPlural + 'PorFiltro', () => {
        it('no debe dejar hacer la búsqueda sin token de sesión (401)', (done) => {
            THelper.postIsAuth(done, '/api/' + nombreEntidadPlural + 'PorFiltro');
        });
        it('debe mostrar información básica correspondiente al usuario de nombre de usuario prueba', (done) => {
            let filtro = {
                find: {
                    nombreUsuario: "prueba"
                }
            };
            chai.request(THelper.app)
                .post('/api/' + nombreEntidadPlural + 'PorFiltro')
                .set('Authorization', THelper.getAuthValue())
                .send(filtro)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    res.body.consulta.should.be.an('array');
                    res.body.consulta.length.should.be.eql(1);
                    res.body.consulta[0].nombreUsuario.should.be.a('string');
                    res.body.consulta[0].email.should.be.a('string');
                    res.body.consulta[0]._id.should.be.a('string');
                    done();
                });
        });
        it('no debe mostrar la contraseña del usuario prueba', (done) => {
            let filtro = {
                find: {
                    nombreUsuario: "prueba"
                },
                select: "_id nombreUsuario pass email"
            };
            chai.request(THelper.app)
                .post('/api/' + nombreEntidadPlural + 'PorFiltro')
                .set('Authorization', THelper.getAuthValue())
                .send(filtro)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.estado.should.be.eql(ResponseStatus.OK);
                    res.body.consulta.should.be.an('array');
                    res.body.consulta.length.should.be.eql(1);
                    res.body.consulta[0].nombreUsuario.should.be.a('string');
                    res.body.consulta[0].email.should.be.a('string');
                    res.body.consulta[0]._id.should.be.a('string');
                    should.not.exist(res.body.consulta[0].pass);
                    done();
                });
        });
        after((done) => {
            UsuarioRoute.model.findById(entidadId).exec((err, res) => {
                if (err) {
                    console.log('Error al limpiar la base de datos después del test ' + err);
                } else {
                    if (res != undefined) {
                        res.remove((err, res) => {
                            if (err) {
                                console.log('Error al borrar el usuario de prueba ' + err);
                            }
                            done();
                        });
                    }
                }
            });
        });
    });
});