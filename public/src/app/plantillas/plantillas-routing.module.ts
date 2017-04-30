import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlantillasListComponent } from './plantillas-lista.component';
//import { DetalleEscenaComponent } from './escena-detalle.component';

const plantillasRoute: Routes =
    [
        {
            path: 'plantillas',
            children: [
                { path: '', component: PlantillasListComponent }//,
                //{ path: ':id', component: DetalleEscenaComponent }
            ]
        },
    ];

@NgModule({
    imports: [RouterModule.forChild(plantillasRoute)],
    exports: [RouterModule]
})
export class PlantillasRoutingModule {
}