import { Component } from '@angular/core';
import { AngularAPIHelper, RespuestaJson } from '../utils/AngularAPIHelper';
import { ProyectoModel } from './models/ProyectosModel';
import { BotonesGuardadoComponent, BotonesGuardado, TipoOperacionGuardado } from '../utils/botones-guardado.component';

@Component({
    selector: 'lista-proyectos',
    templateUrl: './templates/proyectos-lista.component.html',
    providers: [AngularAPIHelper]
})
export class ProyectosListComponent {
    proyectos: ProyectoModel[];
    proyectoACancelar: ProyectoModel;
    mostrarCancelados: boolean;
    botonesGuardado: BotonesGuardado;

    constructor(private angularAPIHelper: AngularAPIHelper) {
        this.mostrarCancelados = false;
        this.botonesGuardado = new BotonesGuardado();
        this.botonesGuardado.mostrarSoloVolver();
        this.cargarProyectos();
    }
    private cargarProyectos() {
        let peticion = this.angularAPIHelper.buildPeticion({ 'autor': '582e0dbffb1e5a33184cdf39', 'cancelado' : this.mostrarCancelados }, { 'orden': '1' });
        this.angularAPIHelper.postEntryOrFilter('proyectosPorFiltro', JSON.stringify(peticion)).subscribe(
            response => { this.proyectos = (response as RespuestaJson).consulta as ProyectoModel[]; }, null, null);
    }
    onNuevoProyecto() {
        let proyecto: ProyectoModel = new ProyectoModel();
        proyecto.autor = '582e0dbffb1e5a33184cdf39'; // sustituir por el usuario que está logeado
        this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(proyecto)).subscribe(null, null, () => this.proyectos.push(proyecto));
    }
    onCancelarProyecto(proyecto: any) {
        this.proyectoACancelar = proyecto as ProyectoModel;
    }
    toggleMostrarCancelados() {
        this.mostrarCancelados = !this.mostrarCancelados;
        this.cargarProyectos();
    }
    onAccionGuardado(event) {
        if (event == TipoOperacionGuardado.Eliminar) {
            this.proyectoACancelar.cancelado = true;
            this.angularAPIHelper.postEntryOrFilter('proyecto', JSON.stringify(this.proyectoACancelar)).subscribe(null, null, () => this.cargarProyectos());
        }
    }
}