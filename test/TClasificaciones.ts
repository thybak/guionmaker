import * as mongoose from "mongoose";
import { THelper } from "../models/THelper";
import { ResponseStatus } from "../routes/APIHelper";
import * as chai from "chai";
import chaiHttp = require("chai-http");

let nombreEntidad = "clasificacion";
let nombreEntidadPlural = nombreEntidad + 'es';
let should = chai.should();
chai.use(chaiHttp);


describe ('Clasificaciones', () => {
    /*
    * Pruebas sobre la entidad Clasificacion
    */
    describe('GET ' + nombreEntidadPlural, () => {
        it('debe mostrar un error 401 al intentar obtener el listado sin token de sesión', (done) => {
            THelper.getIsAuth(done, '/api/' + nombreEntidadPlural);
        });
        it('debe devolver un listado de todas las ' + nombreEntidadPlural, (done) => {
            THelper.getExistente(done, '/api/' + nombreEntidadPlural, false);
        });
    });
    describe('GET ' + nombreEntidad + '/id', () => {
        it('debe mostrar un error 401 al no proporcionar el token de sesión', (done) => {
            THelper.getIsAuth(done, '/api/' + nombreEntidad + '/' + THelper.testObjectId);
        });
        it('no debe devolver ningún registro puesto que no existe ninguno con id ' + THelper.testObjectId, (done) => {
            THelper.getNoExistente(done, '/api/' + nombreEntidad + '/' + THelper.testObjectId);
        });
        it('debe devolver la clasificación recomendada para la infancia', (done) => {
            chai.request(THelper.app)
            .get('/api/' + nombreEntidad + '/582dec0a182637006ba9d7ca')
            .set('Authorization', THelper.getAuthValue())
            .end((err,res) => {
                res.should.have.status(200);
                res.body.estado.should.be.eql(ResponseStatus.OK);
                res.body.consulta.should.be.an('array');
                res.body.consulta.length.should.be.eql(1);
                res.body.consulta[0].nombre.should.be.eql('Especialmente recomendados para la infancia.');
                done();
            });
        });
    });
});