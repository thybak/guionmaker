import { Component, OnInit } from '@angular/core';

import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from '../utils/AngularAPIHelper';
import { ListaGenerica } from '../utils/lista-generica.component';
import { LocalStorageService } from '../utils/LocalStorageService';
import { EscenarioModel } from './models/EscenariosModel';

@Component({
    selector: 'escenarios-lista',
    templateUrl: './templates/escenarios-lista.component.html',
    providers: [LocalStorageService, AngularAPIHelper]
})
export class EscenariosListaComponent {
    listaGenerica: ListaGenerica;

    constructor(private angularAPIHelper: AngularAPIHelper, private localStorageService: LocalStorageService) {
        let nuevoEscenario = new EscenarioModel();
        nuevoEscenario.proyecto = this.localStorageService.getPropiedad('proyectoActual');
        this.listaGenerica = new ListaGenerica
            ("Listado de escenarios de la biblia literaria",
            "escenario",
            "escenariosPorFiltro",
            this.angularAPIHelper.buildPeticion({ proyecto: this.localStorageService.getPropiedad('proyectoActual') }, {}, "nombre proyecto"),
            nuevoEscenario,
            "/biblia");
    }
}