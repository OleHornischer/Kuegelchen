import {Component, OnInit} from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {ResourceService} from "../../services/resource.service";
import {Remedy} from "../../entities/remedy";
import {RemedyService} from "../../services/remedy.service";

@Component({
  selector: 'page-remedies',
  templateUrl: 'remedies.html'
})
export class Remedies implements OnInit {
  selectedRemedy: Remedy;
  remedies: Remedy[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private remedyService: RemedyService) {
    this.selectedRemedy = navParams.get('remedy');
  }

  itemTapped(event, remedy) {
    this.navCtrl.push(Remedies, {
      remedy: remedy
    });
  }

  ngOnInit(): void {
    this.remedyService.getRemedies()
        .then(result => this.remedies = result as Remedy[]);

  }
}
