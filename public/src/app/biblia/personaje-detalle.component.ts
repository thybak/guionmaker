import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { PersonajeModel } from "./models/PersonajesModel";

import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from "../utils/AngularAPIHelper";
import { BotonesGuardado, TipoOperacionGuardado } from "../utils/botones-guardado.component";
import { ConfirmacionGuardado } from "../utils/confirmacion-guardado.component";
import { LocalStorageService } from "../utils/LocalStorageService";

@Component({
    selector: 'detalle-personaje',
    templateUrl: './templates/personaje-detalle.component.html',
    providers: [LocalStorageService, AngularAPIHelper]
})
export class DetallePersonajeComponent {
    personaje: PersonajeModel;
    confirmacionGuardado: ConfirmacionGuardado;
    botonesGuardado: BotonesGuardado;

    constructor(private angularAPIHelper: AngularAPIHelper, private localStorageService: LocalStorageService, private route: ActivatedRoute, private router: Router) {
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompleto(false);
        this.route.params.switchMap((params: Params) =>
            this.angularAPIHelper.getById('personaje', params['id'])).
            subscribe(response => this.cargarModelo(response));
    }

    private cargarModelo(respuesta: any) {
        console.log(respuesta);
        this.personaje = (respuesta as RespuestaJson).consulta[0] as PersonajeModel;
    }

    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            console.log('guardar');
        } else if (event == TipoOperacionGuardado.Eliminar) {
            console.log('eliminar');
        } else if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/biblia/personajes']);
        }
    }

}