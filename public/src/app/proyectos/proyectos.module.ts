import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { ProyectosRoutingModule } from './proyectos-routing.module';

import { ProyectosListComponent } from './proyectos-lista.component';
import { DetalleProyectoComponent } from './proyecto-detalle.component';
import { GestorColaboracionesComponent } from './gestor-colaboraciones.component';

@NgModule({
    imports: [CommonModule, FormsModule, UtilsModule, ProyectosRoutingModule],
    declarations: [ProyectosListComponent, DetalleProyectoComponent, GestorColaboracionesComponent],
    providers: [],
    exports: []
})
export class ProyectosModule { }