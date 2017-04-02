import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EscenasModule } from './escenas/escenas.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { UtilsModule } from './utils/utils.module';
import { BibliaModule } from './biblia/biblia.module';
import { AppRoutingModule } from './app-routing.module'
import { AngularAPIHelper } from './utils/AngularAPIHelper';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pageNotFound.component';
import { IndexComponent } from './index.component';
import { LoginComponent } from './login.component';
import { RegistroComponent } from './registro.component';

export function cargarConfiguracion(api: AngularAPIHelper): Function {
    return () => api.cargarConfiguracion();
}
@NgModule({
    declarations: [ AppComponent, PageNotFoundComponent, IndexComponent, LoginComponent, RegistroComponent ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        EscenasModule,
        ProyectosModule,
        UtilsModule,
        BibliaModule,
        AppRoutingModule    
    ],
    bootstrap: [AppComponent],
    providers: [AngularAPIHelper,
        {
            provide: APP_INITIALIZER,
            useFactory: cargarConfiguracion,
            deps: [AngularAPIHelper],
            multi: true
        }]
})
export class AppModule {
}
