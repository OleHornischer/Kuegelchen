import {Injectable} from "@angular/core";
import {ResourceService} from "./resource.service";
import {Answer} from "../entities/answer";
import {Question} from "../entities/question";
import {AnswerService} from "./answer.service";


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

    private loadQuestions(): void {
        this.questions = this.resourceService.getResource<Question[]>('interview')
            .then(result => {
                result.forEach(q => this.questionMap[q.id]= q);
                return result;
            })
            .then(result => result.filter(q => q.followup !== 'ja'));
    }
}