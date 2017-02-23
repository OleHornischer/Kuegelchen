import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {TranslateService} from "ng2-translate";
import {ResourceService} from "./resource.service";
import {Answer} from "../entities/answer";
import {Question} from "../entities/question";


@Injectable()
export class AnswerService {


    hasFollowupQuestion(answer: Answer) : boolean {
        return answer.followups && answer.followups.length > 0;
    }
}