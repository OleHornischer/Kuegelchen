import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';

import {ResourceService} from "../../services/resource.service";
import {TranslateService} from "ng2-translate";

@Component({
    selector: 'page-idea',
    templateUrl: 'idea.html'
})
export class Idea {

    instructions: string = '';

    constructor(public navCtrl: NavController) { }
}
