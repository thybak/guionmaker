﻿import { Injectable } from '@angular/core';
import { AngularAPIHelper, ResponseStatus, RespuestaJson } from './AngularAPIHelper';
import * as rx from 'rxjs';

export enum Propiedades {
    proyectoActual,
    nombreProyectoActual
}
@Injectable()
export class LocalStorageService {
    propiedades: { [id: number]: string } = {};

    constructor() {
        for (let idx = 0; idx < localStorage.length; idx++) {
            let clave = localStorage.key(idx);
            this.propiedades[clave] = localStorage.getItem(clave);
        }
    }
    
    setPropiedad(clave: string, valor: string) {
        localStorage.setItem(clave, valor);
        this.propiedades[clave] = valor;
    }

    getPropiedad(clave: string) {
        return localStorage.getItem(clave);
    }

    deletePropiedad(clave: string) {
        delete this.propiedades[clave];
        return localStorage.removeItem(clave);
    }

    esUsuarioLogeado(usuarioId: string) {
        return this.getPropiedad("usuarioLogeado") == usuarioId;
    }

    mostrarMarcaColaboracion(usuarioId: string) {
        return this.esUsuarioLogeado(usuarioId) ? "" : "(Colaborador)";
    }

    borrar(){
        this.propiedades = {};
        localStorage.clear();
    }
}