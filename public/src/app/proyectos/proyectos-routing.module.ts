import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProyectosListComponent } from './proyectos-lista.component';
import { DetalleProyectoComponent } from './proyecto-detalle.component';

@NgModule({
    imports: [RouterModule.forChild(
        [{
            path: 'proyectos',
            children: [
                { path: '', component: ProyectosListComponent },
                { path: ':id', component: DetalleProyectoComponent }
            ]
        }])],
    exports: [RouterModule]
})
export class ProyectosRoutingModule {
}