import { Component, DoCheck, KeyValueDiffers } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularAPIHelper, RespuestaJson, PeticionJson, ResponseStatus } from '../utils/AngularAPIHelper';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { ProyectoModel } from './models/ProyectosModel';
import { GeneroModel } from './models/GenerosModel';
import { ClasificacionModel } from './models/ClasificacionesModel';
import { GestorColaboraciones } from './gestor-colaboraciones.component';
import { LocalStorageService } from '../utils/LocalStorageService';

import { Ng2Summernote } from 'ng2-summernote/ng2-summernote';


@Component({
    selector: 'detalle-proyecto',
    templateUrl: './templates/proyecto-detalle.component.html',
    providers: [AngularAPIHelper]
})
export class DetalleProyectoComponent implements DoCheck {
    confirmacionGuardado: ConfirmacionGuardado;
    botonesGuardado: BotonesGuardado;
    proyecto: ProyectoModel;
    respuesta: RespuestaJson;
    generos: GeneroModel[];
    clasificaciones: ClasificacionModel[];
    gestorColaboraciones: GestorColaboraciones;
    differ: any;
    ng2config: any;

    constructor(private angularAPIHelper: AngularAPIHelper, private router : Router, private route : ActivatedRoute, private localStorageService: LocalStorageService, private differs : KeyValueDiffers) {
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarCompletoCancelar();
        this.cargarSelects();
        this.differ = differs.find({}).create(null);
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
            this.angularAPIHelper.getById('proyecto', params['id'])).
            subscribe(response => this.cargarModelo(response));
    }
    private cargarSelects() {
        GeneroModel.getAll(this.angularAPIHelper).subscribe(response => this.generos = (response as RespuestaJson).consulta as GeneroModel[]);
        ClasificacionModel.getAll(this.angularAPIHelper).subscribe(response => this.clasificaciones = (response as RespuestaJson).consulta as ClasificacionModel[]);
    }
    private cargarModelo(proyecto: any) {
        this.proyecto = (proyecto as RespuestaJson).consulta[0] as ProyectoModel;
        this.gestorColaboraciones = new GestorColaboraciones(this.angularAPIHelper, this.proyecto);// carga de colaboradores
        this.proyecto.sinopsis = this.proyecto.sinopsis == "" || this.proyecto.sinopsis == undefined  ? new String('') : this.proyecto.sinopsis; // workaround por culpa del componente ng2-summernote donde con "" no se muestra nada.
    }
    private guardarCambios(exit: boolean) {
        this.proyecto.fechaModificacion = new Date();
        this.proyecto.sinopsis = this.proyecto.sinopsis == undefined ? new String('') : this.proyecto.sinopsis; // wa para el módulo ng-summernote con undefined
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(this.proyecto)).subscribe(
            response => {
                this.respuesta = response as RespuestaJson
            },
            error => {
                this.confirmacionGuardado.setEstadoGuardado(false);
                this.confirmacionGuardado.setTimeoutRetirarAviso();
            },
            () => {
                let isOk = this.respuesta.estado == ResponseStatus.OK;
                if (!isOk) {
                    console.log(this.respuesta.error);
                }
                this.confirmacionGuardado.setEstadoGuardado(isOk);
                this.confirmacionGuardado.setTimeoutRetirarAviso();
                this.botonesGuardado.mostrarCompletoCancelar();
                if (exit && isOk) {
                    this.router.navigate(['/proyectos']);
                }

            });
    }
    ngDoCheck() {
        let changes = this.differ.diff(this.proyecto);
        if (changes != undefined && changes._changesTail != undefined) {
            this.botonesGuardado.mostrarCompletoCancelar(false);
        }
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.localStorageService.setPropiedad('nombreProyectoActual', this.proyecto.nombre);
            this.guardarCambios(false);
        } else if (event == TipoOperacionGuardado.Eliminar) { // solo se lanzará en el caso de eliminación de colaboraciones
            this.gestorColaboraciones.eliminarColaboracion();
        } else if (event == TipoOperacionGuardado.CancelarRegistro) {
            this.proyecto.cancelado = true;
            if (this.proyecto._id == this.localStorageService.getPropiedad('proyectoActual')) {
                this.localStorageService.deletePropiedad('proyectoActual');
                this.localStorageService.deletePropiedad('nombreProyectoActual');
            }
            this.guardarCambios(true);
        } else if (event == TipoOperacionGuardado.Volver) {
            this.router.navigate(['/proyectos']);
        } else if (event == TipoOperacionGuardado.CancelarEliminacion) {
            this.gestorColaboraciones.cancelarEliminacion();
        }
    }
}