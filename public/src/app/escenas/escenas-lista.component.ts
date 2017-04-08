import { Component } from '@angular/core';
import { EscenaModel } from './models/EscenasModel';
import { DetalleLiterarioModel } from './models/DetallesLiterariosModel';
import { DetalleTecnicoModel } from './models/DetallesTecnicosModel';
import { RespuestaJson, AngularAPIHelper } from '../utils/AngularAPIHelper';
import { LocalStorageService } from '../utils/LocalStorageService';
import { SortablejsOptions } from 'angular-sortablejs';
import { ConfirmacionGuardado } from '../utils/confirmacion-guardado.component';
import { BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';
import { PlantillaModel, TipoPlantilla } from '../plantillas/models/PlantillasModel';

@Component({
    selector: 'lista-escenas',
    templateUrl: './templates/escenas-lista.component.html',
    providers: [AngularAPIHelper, LocalStorageService]
})
export class EscenasListComponent {
    escenas: EscenaModel[];
    escenaAEliminar: any;
    confirmacionGuardado: ConfirmacionGuardado;
    botonesGuardado: BotonesGuardado;
    sortOptions: SortablejsOptions = {
        animation: 150
    }
    htmlExportado: string;
    exportacionWindow: Window;

    constructor(private angularAPIHelper: AngularAPIHelper, private localStorageService: LocalStorageService) {
        this.confirmacionGuardado = new ConfirmacionGuardado();
        this.confirmacionGuardado.multiguardado = true;
        this.botonesGuardado = new BotonesGuardado();
        this.cargarEscenas();
    }
    private guardarCambios() {
        for (let escena of this.escenas) {
            let escenaaux = escena;
            this.angularAPIHelper.postEntryOrFilter('escena/actualizar', JSON.stringify(escenaaux)).subscribe(null,
                error => this.confirmacionGuardado.setEstadoMultiguardado(escenaaux.titulo, false),
                () => {
                    this.confirmacionGuardado.setEstadoMultiguardado(escenaaux.titulo, true);
                    this.cargarEscenas();
                });
        }
    }
    private cambiarOrdenEscenas() {
        let idx: number = 1;
        for (let escena of this.escenas) {
            escena.orden = idx++;
        }
    }
    private cargarEscenas(proyectoId: string = "", orden: number = 1) {
        let peticion = this.angularAPIHelper.buildPeticion({ 'proyecto': this.localStorageService.getPropiedad('proyectoActual') }, { 'orden': '1' });
        this.angularAPIHelper.postEntryOrFilter('escenasPorFiltro', JSON.stringify(peticion))
            .subscribe(response => {
                this.escenas = (response as RespuestaJson).consulta as EscenaModel[];
                this.escenas = this.escenas == undefined ? [] : this.escenas; // workaround para el componente de listado ordenable
            },
            error => console.error('Error: ' + error));
    }
    private generarHtmlImagen(detalle: any): string {
        let htmlImagen: string = "";
        if (detalle.imagen != undefined && detalle.mimeType != undefined) {

            htmlImagen = "<img src=\"data:" + detalle.mimeType + ";base64, " + detalle.imagen + "\" style=\"max-height: 20em; width: auto; margin: 0 auto;\" /><br />";
        }
        return htmlImagen;
    }
    private generarHtmlExportacion(literario: boolean, plantillaEscena: PlantillaModel) {
        this.exportacionWindow = window.open();
        this.exportacionWindow.document.title = "Vista completa del guión - GuionMaker";
        for (let escena of this.escenas) {
            let escenaActual: EscenaModel = escena;
            let plantillaModificada: string = plantillaEscena.html.replace("{{tituloEscena}}", escenaActual.orden + ". " + this.getSituacionString(escenaActual) + ". " +  escenaActual.titulo.toUpperCase() + ". " + this.getTemporalidadString(escenaActual));
            this.angularAPIHelper.getById(literario ? 'detalleLiterario' : 'detalleTecnico', literario ? escenaActual.detalleLiterario : escenaActual.detalleTecnico).subscribe(response => {
                let detalle: any;
                if (literario) {
                    detalle = (response as RespuestaJson).consulta[0] as DetalleLiterarioModel;
                } else {
                    detalle = (response as RespuestaJson).consulta[0] as DetalleTecnicoModel;
                }
                this.htmlExportado += plantillaModificada.replace("{{contenidoEscena}}", this.generarHtmlImagen(detalle) + detalle.texto);
                this.exportacionWindow.document.documentElement.innerHTML = this.htmlExportado;
            });
        }
    }
    exportarGuion(literario: boolean) {
        // una vez se tenga el usuario habría que hacer join de usuario y proyecto para sacar la plantilla que se debe usar, por ahora defecto
        this.htmlExportado = "";
        this.angularAPIHelper.getById("plantilla", "5884c9c1e369b82e24883387").subscribe(response => { // id variable por join
            let plantillaEscena = (response as RespuestaJson).consulta[0] as PlantillaModel;
            if (plantillaEscena != undefined) {
                this.angularAPIHelper.getById("plantilla", "5884c982e369b82e24883386").subscribe(response2 => { // id variable por join
                    let plantillaPortada = (response2 as RespuestaJson).consulta[0] as PlantillaModel;
                    if (plantillaPortada != undefined) {
                        plantillaPortada.html = plantillaPortada.html.replace("{{tituloProyecto}}", this.localStorageService.getPropiedad('nombreProyectoActual'));
                        this.htmlExportado += plantillaPortada.html.replace("{{tipoGuion}}", literario ? "Guión literario" : "Guión técnico");
                        this.generarHtmlExportacion(literario, plantillaEscena);
                    }
                });
            }
        });
    }
    onDestacar(destacar: boolean, escena: EscenaModel) {
        escena.destacado = destacar;
    }
    onNuevaEscena() {
        let escena: EscenaModel = new EscenaModel();
        escena.proyecto = this.localStorageService.getPropiedad('proyectoActual');
        escena.orden = this.escenas.length + 1;
        this.angularAPIHelper.postEntryOrFilter('escena', JSON.stringify(escena)).subscribe(response => this.escenas.push((response as RespuestaJson).insertado as EscenaModel)); // por mejorar el asunto del orden
    }
    onGuardarCambios() {
        this.cambiarOrdenEscenas();
        this.guardarCambios();
        this.confirmacionGuardado.setTimeoutRetirarAviso();
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Guardar) {
            this.onGuardarCambios();
        } else if (event == TipoOperacionGuardado.Eliminar) {
            this.onEliminar();
        }
    }
    getTemporalidadString(escena: any): string {
        let _escena: EscenaModel = EscenaModel.cargarEscena(escena);
        return _escena.getTemporalidadString();
    }
    getSituacionString(escena: any): string {
        let _escena : EscenaModel = EscenaModel.cargarEscena(escena);
        return _escena.getSituacionString();
    }
    onSeleccionEscenaAEliminar(escena: any) {
        this.escenaAEliminar = escena;
    }
    onEliminar() {
        let escena: EscenaModel = EscenaModel.cargarEscena(this.escenaAEliminar);
        escena.eliminar(this.angularAPIHelper).subscribe(null, null, () => this.cargarEscenas());
    }
}
