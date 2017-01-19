import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

enum ResponseStatus {
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

    constructor(find, sort) {
        this.find = find;
        this.sort = sort;
    }
}

@Injectable()
export class AngularAPIHelper {
    static readonly URL: string = "http://localhost:1337/api/";
    static readonly maximoSizeByFichero: number = 1024 * 1024 * 2;
    static readonly mimeTypesPermitidos: string[] = ["image/jpeg", "image/jpg", "image/png"];

    constructor(private http: Http) {
    }

    private handleError(error: Response) {
        let errMsg = 'Error en el AngularAPIHelper.' + error;
        return Observable.throw(errMsg);
    }

    parse(response: string): RespuestaJson {
        return JSON.parse(response) as RespuestaJson;
    }

    buildPeticion(find: any, sort: any): PeticionJson {
        return new PeticionJson(find, sort);
    }

    getById(entity: string, id: string) {
        return this.http.get(AngularAPIHelper.URL + entity + "/" + id).map(response => this.parse(response.text())).catch(this.handleError);
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