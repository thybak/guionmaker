import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EscenasListComponent } from './escenasList.component';

const escenasRoutes: Routes = 
    [
        { path: 'escenas', component: EscenasListComponent }
    ];

@NgModule({
    imports: [RouterModule.forChild(escenasRoutes)],
    exports: [RouterModule]
})
export class EscenasRoutingModule {
}