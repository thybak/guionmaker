import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BibliaComponent } from './biblia.component';
import { EscenariosListaComponent } from './escenarios-lista.component';
import { PersonajesListaComponent } from './personajes-lista.component';

const bibliaRoutes: Routes =
    [
        {
            path: 'biblia',
            children: [
                { path: '', component: BibliaComponent },
                { path: 'personajes', component: PersonajesListaComponent},
                { path: 'escenarios', component: EscenariosListaComponent}/*,
                { path: 'personaje/:id', component:},
                { path: 'escenario/:id', component:}*/
            ]
        }
    ];

@NgModule({
  imports: [RouterModule.forChild(bibliaRoutes)],
  exports: [RouterModule]
})
export class BibliaRoutingModule { }
