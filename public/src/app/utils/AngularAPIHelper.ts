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
    static URL: string = "http://localhost:1337/api/";

    constructor(private http: Http) {
    }

    private handleError(error: Response) {
        let errMsg = 'Error en el AngularAPIHelper.';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    parse(response: string): RespuestaJson {
        return JSON.parse(response) as RespuestaJson;
    }

    buildPeticion(find: any, sort: any) : PeticionJson {
        return new PeticionJson(find, sort);
    }

    getById(entity: string, id: string) {
        return this.http.get(AngularAPIHelper.URL + entity + "/" + id).map(response => this.parse(response.text())).catch(this.handleError);
    }

    getByFilter(entity: string, filter: string) {
        return this.http.post(AngularAPIHelper.URL + entity, JSON.parse(filter)).map(response => this.parse(response.text())).catch(this.handleError);
    }

    postEntry(entity: string, entry: string) {
        return this.http.post(AngularAPIHelper.URL + entity, JSON.parse(entry)).map(response => this.parse(response.text())).catch(this.handleError);
    }
}