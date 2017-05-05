import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EscenasModule } from './escenas/escenas.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { UtilsModule } from './utils/utils.module';
import { BibliaModule } from './biblia/biblia.module';
import { PlantillasModule } from './plantillas/plantillas.module';
import { AppRoutingModule } from './app-routing.module'
import { AngularAPIHelper } from './utils/AngularAPIHelper';
import { LocalStorageService } from './utils/LocalStorageService';
import { CanActivateIsLoggedGuard } from './utils/CanActivateIsLoggedGuard';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pageNotFound.component';
import { IndexComponent } from './index.component';
import { LoginComponent } from './login.component';
import { RegistroComponent } from './registro.component';

export function cargarConfiguracion(api: AngularAPIHelper, injector: Injector): Function {
    return () => api.cargarConfiguracion(injector);
}

@NgModule({
    declarations: [ AppComponent, PageNotFoundComponent, IndexComponent, LoginComponent, RegistroComponent ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        EscenasModule,
        ProyectosModule,
        UtilsModule,
        BibliaModule,
        PlantillasModule,
        AppRoutingModule    
    ],
    bootstrap: [AppComponent],
    providers: [AngularAPIHelper, LocalStorageService,
        {
            provide: APP_INITIALIZER,
            useFactory: cargarConfiguracion,
            deps: [AngularAPIHelper, Injector],
            multi: true
        },
        CanActivateIsLoggedGuard]
})
export class AppModule {
}
