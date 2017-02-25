import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from './AngularAPIHelper';
import { BotonesGuardado, TipoOperacionGuardado } from './botones-guardado.component';
import { LocalStorageService } from './LocalStorageService';


export class ListaGenerica {
    titulo: string;
    entidad: string;
    entidadPorFiltro: string;
    peticion: PeticionJson;
    nuevoElemento: any;

    constructor(titulo: string, entidad: string, entidadPorFiltro: string, peticion: PeticionJson, nuevoElemento: any) {
        this.titulo = titulo;
        this.entidad = entidad;
        this.entidadPorFiltro = entidadPorFiltro;
        this.peticion = peticion;
        this.nuevoElemento = nuevoElemento;
    }
}

@Component({
    selector: 'lista-generica',
    templateUrl: './templates/lista-generica.component.html',
    providers: [AngularAPIHelper]
})
export class ListaGenericaComponent implements OnInit {
    botonesGuardado: BotonesGuardado;
    elementos: any[];
    elementoAEliminar: any;
    @Input()
    listaGenerica: ListaGenerica;

    ngOnInit() {
        this.cargarElementos();
    }

    constructor(private angularAPIHelper: AngularAPIHelper, private _location : Location) {
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarSoloVolver();
    }

    private cargarElementos() {
        this.angularAPIHelper.postEntryOrFilter(this.listaGenerica.entidadPorFiltro, JSON.stringify(this.listaGenerica.peticion))
            .subscribe(response => {
                let respuesta = response as RespuestaJson;
                if (respuesta.estado == ResponseStatus.OK) {
                    this.elementos = respuesta.consulta;
                }
            });
    }

    onNuevoElemento() {
        let elemento = this.listaGenerica.nuevoElemento;
        this.angularAPIHelper.postEntryOrFilter(this.listaGenerica.entidad, JSON.stringify(elemento))
            .subscribe(response => {
                let respuesta = response as RespuestaJson;
                if (respuesta.estado == ResponseStatus.OK) {
                    this.elementos.push(elemento);
                }
            });
    }

    setElementoAEliminar(elemento: any) {
        this.elementoAEliminar = elemento;
    }

    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Volver) {
            this._location.back();
        } else if (event == TipoOperacionGuardado.Eliminar) {
            alert('Intento de eliminación');
        }
    }
}
