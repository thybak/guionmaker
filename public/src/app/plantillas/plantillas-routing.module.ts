import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlantillasListComponent } from './plantillas-lista.component';
import { PlantillaDetalleComponent } from './plantilla-detalle.component';

const plantillasRoute: Routes =
    [
        {
            path: 'plantillas',
            children: [
                { path: '', component: PlantillasListComponent },
                { path: ':id', component: PlantillaDetalleComponent }
            ]
        },
    ];

@NgModule({
    imports: [RouterModule.forChild(plantillasRoute)],
    exports: [RouterModule]
})
export class PlantillasRoutingModule {
}