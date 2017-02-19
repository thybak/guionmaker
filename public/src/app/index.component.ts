﻿import { Component } from '@angular/core';
import { ProyectoModel } from './proyectos/models/ProyectosModel';
import { AngularAPIHelper, RespuestaJson } from './utils/AngularAPIHelper';
import { LocalStorageService } from './utils/LocalStorageService';

@Component({
    templateUrl: './templates/index.component.html',
    providers: [AngularAPIHelper]
})
export class IndexComponent {
    proyectos: ProyectoModel[];
    proyectoActual: string;

    constructor(private angularAPIHelper: AngularAPIHelper, private localStorageService: LocalStorageService) {
        this.setUsuarioActual();
        ProyectoModel.getProyectosByAutorAndEstado(this.localStorageService.getPropiedad('usuarioLogeado'), false, angularAPIHelper).subscribe( 
            response => {
                this.proyectos = (response as RespuestaJson).consulta as ProyectoModel[];
                this.proyectoActual = localStorage.getItem('proyectoActual');
                if (this.proyectoActual == null && this.proyectos != undefined && this.proyectos.length > 0) {
                    this.proyectoActual = this.proyectos[0]._id;
                }
            });
    }

    setProyectoActual() {
        if (this.proyectoActual != null) {
            let proyecto: ProyectoModel = this.proyectos.find(x => x._id == this.proyectoActual);
            this.localStorageService.setPropiedad('proyectoActual', this.proyectoActual);
            this.localStorageService.setPropiedad('nombreProyectoActual', proyecto.nombre);
        }
    }

    setUsuarioActual() {
        this.localStorageService.setPropiedad('usuarioLogeado', '582e0dbffb1e5a33184cdf39');
    }
}