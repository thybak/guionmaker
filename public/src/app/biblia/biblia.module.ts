import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UtilsModule } from '../utils/utils.module';
import { BibliaRoutingModule } from './biblia-routing.module';

import { BibliaComponent } from './biblia.component';
import { EscenariosListaComponent } from './escenarios-lista.component';
import { PersonajesListaComponent } from './personajes-lista.component';
import { DetallePersonajeComponent } from './personaje-detalle.component';
import { DetalleEscenarioComponent } from './escenario-detalle.component';

@NgModule({
  imports: [CommonModule, FormsModule, UtilsModule, BibliaRoutingModule],
  declarations: [BibliaComponent, EscenariosListaComponent, PersonajesListaComponent, DetallePersonajeComponent, DetalleEscenarioComponent]
})
export class BibliaModule { }
