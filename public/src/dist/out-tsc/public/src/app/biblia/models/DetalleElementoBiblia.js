import { Fichero } from "../../utils/gestor-subida.component";
import { ResponseStatus } from "../../utils/AngularAPIHelper";
import { BotonesGuardado, TipoOperacionGuardado } from "../../utils/botones-guardado.component";
import { ConfirmacionGuardado } from "../../utils/confirmacion-guardado.component";
export class DetalleElementoBiblia {
    constructor(angularAPIHelper, localStorageService, route, router, entidadElemento, differs) {
        this.angularAPIHelper = angularAPIHelper;
        this.localStorageService = localStorageService;
        this.route = route;
        this.router = router;
        this.differs = differs;
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
        this.route.params.switchMap((params) => this.angularAPIHelper.getById(this.entidadElemento, params['id'])).
            subscribe(response => {
            this.cargarModelo(response);
        });
    }
    guardarCambios() {
        this.angularAPIHelper.postEntryOrFilter(this.entidadElemento, JSON.stringify(this.elemento)).subscribe(response => {
            let respuesta = response;
            this.confirmacionGuardado.setEstadoGuardado(respuesta.estado == ResponseStatus.OK);
            this.confirmacionGuardado.setTimeoutRetirarAviso();
            this.botonesGuardado.mostrarCompleto();
        });
    }
    eliminarElemento() {
        this.angularAPIHelper.deleteById(this.entidadElemento, this.elemento._id).subscribe(null, null, () => this.router.navigate(['/biblia/' + this.entidadElemento + 's']));
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.elemento.imagen = this.fichero.base64;
            this.elemento.mimeType = this.fichero.mimeType;
            this.guardarCambios();
        }
        else if (event == TipoOperacionGuardado.Eliminar) {
            this.eliminarElemento();
        }
        else if (event == TipoOperacionGuardado.Volver) {
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
//# sourceMappingURL=DetalleElementoBiblia.js.map