import {Component, OnInit} from '@angular/core';

import {NavController, NavParams, Platform} from 'ionic-angular';
import {Question} from "./question";
import {ResourceService} from "../services/resource.service";

declare var window: any;

@Component({
    selector: 'page-interview',
    templateUrl: 'interview.html'
})
export class Interview implements OnInit {
    currentQuestion: Question;
    questions: Question[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private resourceService: ResourceService, private platform: Platform) {
        // If we navigated to this page, we will have an item available as a nav param
        this.currentQuestion = navParams.get('question');

    }

    nextTapped(event) {
        let currentIndex = this.getCurrentIndex();
        if (currentIndex < this.questions.length - 1) {
            if (this.currentQuestion.hasSelectedAnswer()) {
                this.currentQuestion = this.questions[currentIndex + 1];
            } else {
                this.showToast('GIVE ME AN ANSWER!!!', 'bottom');
            }
        }
    }

    previousTapped(event) {
        let currentIndex = this.getCurrentIndex();
        if (currentIndex > 0) {
            this.currentQuestion = this.questions[currentIndex - 1];
        }
    }

    getCurrentIndex() {
        if (this.questions && this.currentQuestion) {
            return this.questions.indexOf(this.currentQuestion);
        } else {
            return -1;
        }
    }

    showToast(message, position) {
        this.platform.ready().then(() => {
            window.plugins.toast.show(message, "short", position);
        });
    }

    ngOnInit(): void {
        this.resourceService.getResource<Question[]>('interview')
            .then(result => this.questions = result as Question[])
            .then(() => this.currentQuestion = this.questions[0]);

    }
}
