import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { PersonajeModel } from "./models/PersonajesModel";

import { Ng2Summernote } from "ng2-summernote/ng2-summernote";
import { GestorSubidaComponent, Fichero } from "../utils/gestor-subida.component";
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
    fichero: Fichero;

    constructor(private angularAPIHelper: AngularAPIHelper, private localStorageService: LocalStorageService, private route: ActivatedRoute, private router: Router) {
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompleto(false);
        this.fichero = new Fichero();
        this.route.params.switchMap((params: Params) =>
            this.angularAPIHelper.getById('personaje', params['id'])).
            subscribe(response => this.cargarModelo(response as RespuestaJson));
    }

    private cargarModelo(respuesta: RespuestaJson) {
        if (respuesta.estado == ResponseStatus.OK) {
            this.personaje = (respuesta as RespuestaJson).consulta[0] as PersonajeModel;
            this.personaje.biografia = this.personaje.biografia == undefined ? new String('') : this.personaje.biografia;
            this.personaje.descripcionFisica = this.personaje.descripcionFisica == undefined ? new String('') : this.personaje.descripcionFisica;
            this.personaje.descripcionPsicologica = this.personaje.descripcionPsicologica == undefined ? new String('') : this.personaje.descripcionPsicologica;
            this.fichero.base64 = this.personaje.imagen == undefined ? "" : this.personaje.imagen;
            this.fichero.mimeType = this.personaje.mimeType == undefined ? "" : this.personaje.mimeType;
        }
    }

    private guardarCambios() {
        this.angularAPIHelper.postEntryOrFilter('personaje', JSON.stringify(this.personaje)).subscribe(response => {
            let respuesta = response as RespuestaJson;
            this.confirmacionGuardado.setEstadoGuardado(respuesta.estado == ResponseStatus.OK);
            this.confirmacionGuardado.setTimeoutRetirarAviso();
        });
    }

    private eliminarPersonaje() {
        this.angularAPIHelper.deleteById('personaje', this.personaje._id).subscribe(null, null, () => this.router.navigate(['/biblia/personajes']));
    }

    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.personaje.imagen = this.fichero.base64;
            this.personaje.mimeType = this.fichero.mimeType;
            this.guardarCambios();
        } else if (event == TipoOperacionGuardado.Eliminar) {
            this.eliminarPersonaje();
        } else if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/biblia/personajes']);
        }
    }

}