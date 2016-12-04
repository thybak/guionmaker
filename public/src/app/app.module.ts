import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { EscenasListComponent } from './escenasList.component';

@NgModule({
  declarations: [
    EscenasListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [EscenasListComponent]
})
export class AppModule { }
