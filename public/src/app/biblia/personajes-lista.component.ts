import { Component } from '@angular/core';

import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from '../utils/AngularAPIHelper';
import { ListaGenerica } from '../utils/lista-generica.component';
import { LocalStorageService } from '../utils/LocalStorageService';
import { PersonajeModel } from './models/PersonajesModel';

@Component({
    selector: 'personajes-lista',
    templateUrl: './templates/personajes-lista.component.html',
    providers: [LocalStorageService, AngularAPIHelper]
})
export class PersonajesListaComponent {
    listaGenerica: ListaGenerica;

    constructor(private angularAPIHelper: AngularAPIHelper, private localStorageService: LocalStorageService) {
        let nuevoPersonaje = new PersonajeModel();
        nuevoPersonaje.proyecto = this.localStorageService.getPropiedad('proyectoActual');
        this.listaGenerica = new ListaGenerica
            ("Listado de personajes de la biblia literaria",
            "personaje",
            "personajesPorFiltro",
            this.angularAPIHelper.buildPeticion({ proyecto: this.localStorageService.getPropiedad('proyectoActual') }, {}),
            nuevoPersonaje);
    }
}
