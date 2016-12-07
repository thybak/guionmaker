"use strict";
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

@Injectable()
export class AngularAPIHelper {
    static URL: string = "http://localhost:1337/api/";

    constructor(private http: Http) {
    }

    parse(response: string): RespuestaJson {
        return JSON.parse(response) as RespuestaJson;
    }

    private handleError(error: Response) {
        let errMsg = 'Error al obtener JSON';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    getById(entity: string, id: string) {
        return this.http.get(AngularAPIHelper.URL + entity + "/" + id).map(response => this.parse(response.text())).catch(this.handleError);
    }

    getByFilter(entity: string, filter: string) {
        return this.http.post(AngularAPIHelper.URL + entity, JSON.parse(filter)).map(response => this.parse(response.text())).catch(this.handleError);
    }
}