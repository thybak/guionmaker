import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { UtilsModule } from '../utils/utils.module';

import { EscenasListComponent } from './escenasList.component';

@NgModule({
    imports: [CommonModule, FormsModule, SortablejsModule, UtilsModule],
    declarations: [EscenasListComponent],
    providers: [],
    exports: [EscenasListComponent]
})
export class EscenasModule { }