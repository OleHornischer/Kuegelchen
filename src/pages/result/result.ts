import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';

import {ResourceService} from "../../services/resource.service";
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'page-result',
    templateUrl: 'result.html'
})
export class Result implements OnInit {

    constructor(public navCtrl: NavController) {  }

    ngOnInit(): void {
        // // TODO: Use selected language
        // this.resourceService.getResource('instructions', 'de')
        //     .then(result => this.instructions = result as string);
    }

}
