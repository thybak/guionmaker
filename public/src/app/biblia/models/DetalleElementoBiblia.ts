import { KeyValueDiffers, DoCheck } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { GestorSubidaComponent, Fichero } from "../../utils/gestor-subida.component";
import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from "../../utils/AngularAPIHelper";
import { BotonesGuardado, TipoOperacionGuardado } from "../../utils/botones-guardado.component";
import { ConfirmacionGuardado } from "../../utils/confirmacion-guardado.component";
import { LocalStorageService } from "../../utils/LocalStorageService";

export abstract class DetalleElementoBiblia implements DoCheck {
    elemento: any;
    entidadElemento: string;
    confirmacionGuardado: ConfirmacionGuardado;
    botonesGuardado: BotonesGuardado;
    fichero: Fichero;
    differ: any;
    ng2config: any;

    constructor(protected angularAPIHelper: AngularAPIHelper, protected localStorageService: LocalStorageService, protected route: ActivatedRoute, protected router: Router, entidadElemento: string, protected differs: KeyValueDiffers) {
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompleto();
        this.fichero = new Fichero();
        this.entidadElemento = entidadElemento;
        this.differ = this.differs.find({}).create(null);
        this.ng2config = {
            minHeight: 200,
            lang: 'es-ES',
            placeholder: 'Escribe tu texto...',
            toolbar: [
                ['style', ['fontname', 'clear']],
                ['fontstyle', ['bold', 'italic', 'paragraph']],
                ['fontstyleextra', ['strikethrough', 'underline', 'hr', 'color', 'superscript', 'subscript']],
                ['extra', ['table', 'height']],
                ['misc', ['undo', 'redo', 'codeview']]
            ],
            fontNames: ['Courier New', 'Arial', 'Arial Black', 'Sans-serif', 'Serif']
        };
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
            this.botonesGuardado.mostrarCompleto();
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

    ngDoCheck() {
        let changes = this.differ.diff(this.elemento);
        if (changes != undefined && changes._changesTail != undefined) {
            this.botonesGuardado.mostrarCompleto(false);
        }
    }
}