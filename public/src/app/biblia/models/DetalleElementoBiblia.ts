import { Router, ActivatedRoute, Params } from "@angular/router";
import { GestorSubidaComponent, Fichero } from "../../utils/gestor-subida.component";
import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from "../../utils/AngularAPIHelper";
import { BotonesGuardado, TipoOperacionGuardado } from "../../utils/botones-guardado.component";
import { ConfirmacionGuardado } from "../../utils/confirmacion-guardado.component";
import { LocalStorageService } from "../../utils/LocalStorageService";

export abstract class DetalleElementoBiblia {
    elemento: any;
    entidadElemento: string;
    confirmacionGuardado: ConfirmacionGuardado;
    botonesGuardado: BotonesGuardado;
    fichero: Fichero;

    constructor(protected angularAPIHelper: AngularAPIHelper, protected localStorageService: LocalStorageService, protected route: ActivatedRoute, protected router: Router, entidadElemento: string) {
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompleto(false);
        this.fichero = new Fichero();
        this.entidadElemento = entidadElemento;
        this.route.params.switchMap((params: Params) =>
            this.angularAPIHelper.getById(this.entidadElemento, params['id'])).
            subscribe(response => {
                this.cargarModelo(response as RespuestaJson);
            });
    }

    abstract cargarModelo(respuesta: RespuestaJson);

    protected guardarCambios() {
        this.angularAPIHelper.postEntryOrFilter(this.entidadElemento, JSON.stringify(this.elemento)).subscribe(response => {
            let respuesta = response as RespuestaJson;
            this.confirmacionGuardado.setEstadoGuardado(respuesta.estado == ResponseStatus.OK);
            this.confirmacionGuardado.setTimeoutRetirarAviso();
        });
    }

    protected eliminarElemento() {
        this.angularAPIHelper.deleteById(this.entidadElemento, this.elemento._id).subscribe(null, null, () => this.router.navigate(['/biblia/' + this.entidadElemento + 's']));
    }

    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.elemento.imagen = this.fichero.base64;
            this.elemento.mimeType = this.fichero.mimeType;
            this.guardarCambios();
        } else if (event == TipoOperacionGuardado.Eliminar) {
            this.eliminarElemento();
        } else if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/biblia/' + this.entidadElemento + 's']);
        }
    }
}