import { Component } from '@angular/core';
import { LocalStorageService } from './utils/LocalStorageService';

@Component({
    selector: 'guionMaker',
    templateUrl: './templates/app.component.html',
    providers: [LocalStorageService]
})
export class AppComponent {
    constructor(private localStorageService: LocalStorageService) {
    }
}