import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './pageNotFound.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './index.component';

const appRoutes: Routes =
    [
        { path: '', component: IndexComponent },
        { path: '**', component: PageNotFoundComponent }
    ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}