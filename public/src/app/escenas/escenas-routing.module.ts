import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EscenasListComponent } from './escenas-lista.component';
import { DetalleEscenaComponent } from './escena-detalle.component';

const escenasRoutes: Routes =
    [
        {
            path: 'escenas',
            children: [
                { path: '', component: EscenasListComponent },
                { path: ':id', component: DetalleEscenaComponent }
            ]
        },
    ];

@NgModule({
    imports: [RouterModule.forChild(escenasRoutes)],
    exports: [RouterModule]
})
export class EscenasRoutingModule {
}