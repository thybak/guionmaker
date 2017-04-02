import { Component } from "@angular/core";
import { AngularAPIHelper } from "./utils/AngularAPIHelper";
import { Utils } from "../../../models/Utils";

@Component({
    selector: "registro",
    templateUrl: "./templates/registro.component.html",
    providers: [AngularAPIHelper]
})
export class RegistroComponent {
    constructor(private angularAPIHelper: AngularAPIHelper) {

    }
}