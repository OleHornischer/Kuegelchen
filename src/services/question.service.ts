import {Injectable} from "@angular/core";
import {ResourceService} from "./resource.service";
import {Answer} from "../entities/answer";
import {Question} from "../entities/question";
import {AnswerService} from "./answer.service";
import {Remedy} from "../entities/remedy";
import {Weight} from "../entities/weight";
import {isUndefined} from "ionic-angular/umd/util/util";


@Injectable()
export class QuestionService {

    private questions: Promise<Question[]>;
    private questionMap: { [key: number]: Question } = {};

    constructor(private resourceService: ResourceService, private answerService: AnswerService) {

    }

    hasSelectedAnswer(question: Question): boolean {
        if (question.answers) {
            return question.answers.some(a => a.selected);
        }

        return false;
    }

    getInterview(): Promise<Question[]> {
        if (!this.questions) {
            this.loadQuestions();
        }
        return this.questions;
    }

    getFollowupQuestions(answer: Answer): Question[] {
        if (this.answerService.hasFollowupQuestion(answer)) {
            return answer.followups.split(',')
                .map(id => id.trim())
                .map(id => this.questionMap[id]);
        }

        return;
    }

    evaluateInterview(interview: Question[]): [number, number][] {
        let sortedEvaluation: [number, number][] = [];
        let remedyEvaluation: {[key: number]: number} = {};
        interview.forEach(q => q.answers.filter(a => a.selected && a.weights).forEach(a => {
            if (a.weights instanceof Array) a.weights.forEach(w => this.evaluateWeight(remedyEvaluation, w));
            else this.evaluateWeight(remedyEvaluation, <Weight>a.weights);
        }));

        for (var remedy in remedyEvaluation) {
            let position: number = this.findPositionToEnter(remedyEvaluation[remedy], sortedEvaluation);
            sortedEvaluation.splice(position, 0, [remedy, remedyEvaluation[remedy]]);
        }

        return sortedEvaluation;
    }

    private findPositionToEnter(value: number, sortedEvaluation: [number, number][]) {
        let position: number = 0;

        while (position < sortedEvaluation.length && sortedEvaluation[position][1]>value){
            position++;
        }

        return position;
    }

    private loadQuestions(): void {
        this.questions = this.resourceService.getResource<Question[]>('interview')
            .then(result => {
                result.forEach(q => this.questionMap[q.id] = q);
                return result;
            })
            .then(result => result.filter(q => q.followup !== 'ja'));
    }

    private evaluateWeight(remedyEvaluation: {[key:number]:number}, weight: Weight) {
        if (!remedyEvaluation[weight.remedy]) {
            remedyEvaluation[weight.remedy] = <number>weight.value;
        } else {
            remedyEvaluation[weight.remedy] = remedyEvaluation[weight.remedy] + <number>weight.value;
        }
    }
}