import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from './AngularAPIHelper';
import { BotonesGuardado, TipoOperacionGuardado } from './botones-guardado.component';
import { LocalStorageService } from './LocalStorageService';
import { ModoColaborador } from './ModoColaborador';


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
export class ListaGenericaComponent extends ModoColaborador implements OnInit {
    botonesGuardado: BotonesGuardado;
    elementos: any[];
    elementoAEliminar: any;
    @Input()
    listaGenerica: ListaGenerica;

    ngOnInit() {
        this.cargarElementos();
    }

    constructor(angularAPIHelper: AngularAPIHelper, localStorageService: LocalStorageService, private router: Router) {
        super(angularAPIHelper, localStorageService);
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
            }, error => console.log(error));
    }

    onNuevoElemento() {
        let elemento = this.listaGenerica.nuevoElemento;
        this.angularAPIHelper.postEntryOrFilter(this.listaGenerica.entidad, JSON.stringify(elemento))
            .subscribe(response => {
                let respuesta = response as RespuestaJson;
                if (respuesta.estado == ResponseStatus.OK) {
                    this.elementos.push(respuesta.insertado); // ya incluye el identificador generado en MongoDB.
                }
            });
    }

    setElementoAEliminar(elemento: any) {
        this.elementoAEliminar = elemento;
    }

    eliminarElemento() {
        this.angularAPIHelper.deleteById(this.listaGenerica.entidad, this.elementoAEliminar._id).subscribe(null, null, () => this.cargarElementos());
    }

    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/biblia']);
        } else if (event == TipoOperacionGuardado.Eliminar) {
            this.eliminarElemento();
        }
    }
}
