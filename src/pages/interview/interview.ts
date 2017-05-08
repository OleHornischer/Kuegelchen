import {Component, OnInit} from '@angular/core';

import {NavController, NavParams, Platform} from 'ionic-angular';

import {Dialogs, Toast} from 'ionic-native';
import {TranslateService} from "ng2-translate";
import {QuestionService} from "../../services/question.service";
import {Question} from "../../entities/question";
import {ResourceService} from "../../services/resource.service";
import {Answer} from "../../entities/answer";

@Component({
    selector: 'page-interview',
    templateUrl: 'interview.html',
    providers: [QuestionService],
})
export class Interview implements OnInit {
    currentQuestion: Question;
    questions: Question[];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform,
                private translate: TranslateService,
                private questionService: QuestionService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.currentQuestion = navParams.get('question');

    }

    nextTapped(event) {
        let currentIndex = this.getCurrentIndex();
        if (currentIndex < this.questions.length - 1) {
            if (this.questionService.hasSelectedAnswer(this.currentQuestion)) {
                this.currentQuestion = this.questions[currentIndex + 1];
            } else {
                this.showToast(this.translate.instant('INTERVIEW.TOASTNOANSWER'), 'bottom');
            }
        } else {
            let sortedEvaluation: [number, number][] = this.questionService.evaluateInterview(this.questions);
            alert(sortedEvaluation);
        }
    }

    refreshTapped(event) {
        this.platform.ready().then(() => {
                try {
                    let choice = Dialogs.confirm(this.translate.instant('INTERVIEW.RESETCONFIRM'), this.translate.instant('GENERAL.WARNING'));
                    choice.then(c => {
                        if (c && c == 1) this.ngOnInit();
                    });
                } catch (e: string) {
                    if (e && e === 'cordova_not_available') {
                        if (confirm(this.translate.instant('INTERVIEW.RESETCONFIRM'))) {
                            this.ngOnInit();
                        }
                    }
                }
            }
        );
        this.ngOnInit();
    }

    previousTapped(event) {
        let currentIndex = this.getCurrentIndex();
        if (currentIndex > 0) {
            this.currentQuestion = this.questions[currentIndex - 1];
        }
    }

    onAnswerSelect(answer: Answer, event) {
        if (answer.selected) {
            this.toggleCheckedStatusConsideringNoneOption(answer);
            this.addPossibleFollowups(answer);
        } else {
            this.removePossibleFollowups(answer);
        }
    }


    ngOnInit(): void {
        this.questionService.getInterview()
            .then(result => this.questions = result as Question[])
            .then(() => this.currentQuestion = this.questions[0]);

    }

    private getCurrentIndex() {
        if (this.questions && this.currentQuestion) {
            return this.questions.indexOf(this.currentQuestion);
        } else {
            return -1;
        }
    }

    private showToast(message: string, position: string) {
        this.platform.ready().then(() => {
                try {
                    Toast.show(message, "short", position).subscribe(
                        toast => {
                            console.log(toast);
                        }
                    )
                } catch (e: string) {
                    if (e && e === 'cordova_not_available') {
                        alert('Cordova not available. Toast message: \r\n ' + message);
                    }
                }
            }
        );
    }

    private toggleCheckedStatusConsideringNoneOption(answer: Answer) {
        this.currentQuestion.answers.filter(a => a.noneoption !== answer.noneoption).forEach(a => a.selected = false);
    }

    private addPossibleFollowups(answer: Answer) {
        let followups = this.questionService.getFollowupQuestions(answer);
        if (followups) {
            followups.forEach(q => this.questions.splice(this.getCurrentIndex()+1, 0, q));
        }
    }

    // TODO: Watch out for questions that were added by two answers. We need to keep track of the questions being added and remove only the
    //       ones that are note referenced by a selected answer anymore
    private removePossibleFollowups(answer: Answer) {
        let followups = this.questionService.getFollowupQuestions(answer);
        if (followups) {
            followups.filter(q => this.questions.indexOf(q) >= 0)
                .forEach(q => this.questions.splice(this.questions.indexOf(q), 1));
        }
    }
}
