import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';

import {ResourceService} from "../../services/resource.service";
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'page-instructions',
    templateUrl: 'instructions.html'
})
export class Instructions {

    instructions: string = '';

    constructor(public navCtrl: NavController) {  }

}
