import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateIsLoggedGuard } from '../utils/CanActivateIsLoggedGuard';
import { BibliaComponent } from './biblia.component';
import { EscenariosListaComponent } from './escenarios-lista.component';
import { PersonajesListaComponent } from './personajes-lista.component';
import { DetallePersonajeComponent } from './personaje-detalle.component';
import { DetalleEscenarioComponent } from './escenario-detalle.component';

const bibliaRoutes: Routes =
    [
        {
            path: 'biblia',
            children: [
                { path: '', component: BibliaComponent },
                {
                    path: 'personajes',
                    children: [
                        { path: '', component: PersonajesListaComponent },
                        { path: ':id', component: DetallePersonajeComponent }
                    ]
                },
                {
                    path: 'escenarios',
                    children: [
                        { path: '', component: EscenariosListaComponent },
                        { path: ':id', component: DetalleEscenarioComponent }
                     ]
                }
            ], canActivate: [CanActivateIsLoggedGuard]
        }
    ];

@NgModule({
  imports: [RouterModule.forChild(bibliaRoutes)],
  exports: [RouterModule]
})
export class BibliaRoutingModule { }
