import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum ResponseStatus {
    OK = 0,
    KO
}

export class RespuestaJson {
    estado: ResponseStatus;
    error: String;
    consulta: any[];
    insertado: any;
}

export class PeticionJson {
    find: any;
    sort: any;
    select: string;

    constructor(find, sort, select: string) {
        this.find = find;
        this.sort = sort;
        this.select = select;
    }
}

@Injectable()
export class AngularAPIHelper {
    static URL: string = "";
    static maximoSizeByFichero: number = 0;
    static mimeTypesPermitidos: string[] = [];

    constructor(private http: Http) {
    }

    private handleError(error: Response) {
        let errMsg = 'Error en el AngularAPIHelper:' + error;
        return Observable.throw(errMsg);
    }

    cargarConfiguracion() {
        return this.http.get('/assets/apiconfig.json').toPromise().
            then(config => {
                let _config = config.json();
                AngularAPIHelper.maximoSizeByFichero = _config.maxFileSizeBytes;
                AngularAPIHelper.URL = 'http://' + _config.apiURL + ':' + _config.publicApiPort + '/api/';
                AngularAPIHelper.mimeTypesPermitidos = _config.mimeTypesPermitidos;
            });
    }

    parse(response: string): RespuestaJson {
        return JSON.parse(response) as RespuestaJson;
    }

    buildPeticion(find: any, sort: any, select: string = ""): PeticionJson {
        return new PeticionJson(find, sort, select);
    }

    getAll(entity: string) {
        return this.http.get(AngularAPIHelper.URL + entity).map(response => this.parse(response.text())).catch(this.handleError);
    }

    getById(entity: string, id: string) {
        return this.http.get(AngularAPIHelper.URL + entity + "/" + id).map(response => this.parse(response.text())).catch(this.handleError);
    }

    deleteById(entity: string, id: string) {
        return this.http.delete(AngularAPIHelper.URL + entity + '/' + id).map(response => this.parse(response.text())).catch(this.handleError);
    }

    postEntryOrFilter(entity: string, entryOrFilter: string) {
        return this.http.post(AngularAPIHelper.URL + entity, JSON.parse(entryOrFilter)).map(response => this.parse(response.text())).catch(this.handleError);
    }

    mimeTypePermitido(mime: string): boolean {
        let mimeEncontrado: string = AngularAPIHelper.mimeTypesPermitidos.find(x => x == mime);
        return mimeEncontrado == mime;
    }

    sizeOfFicheroAdecuado(size: number): boolean {
        return size <= AngularAPIHelper.maximoSizeByFichero;
    }
}