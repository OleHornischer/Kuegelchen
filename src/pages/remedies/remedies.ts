import {Component, OnInit} from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {ResourceService} from "../../services/resource.service";
import {Remedy} from "./remedy";

@Component({
  selector: 'page-remedies',
  templateUrl: 'remedies.html'
})
export class Remedies implements OnInit {
  selectedRemedy: Remedy;
  remedies: Remedy[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private resourceService: ResourceService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedRemedy = navParams.get('remedy');

  }

  itemTapped(event, remedy) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Remedies, {
      remedy: remedy
    });
  }

  ngOnInit(): void {
    this.resourceService.getResource<Remedy[]>('remedies')
        .then(result => this.remedies = result as Remedy[]);

  }
}
