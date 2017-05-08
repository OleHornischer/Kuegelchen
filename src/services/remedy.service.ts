import {Injectable} from "@angular/core";
import {ResourceService} from "./resource.service";
import {Answer} from "../entities/answer";
import {Question} from "../entities/question";
import {AnswerService} from "./answer.service";
import {Remedy} from "../entities/remedy";


@Injectable()
export class RemedyService {

    private remedies: Promise<Remedy[]>;
    private remedyMap: { [key: number]: Remedy } = {};

    constructor(private resourceService: ResourceService) {

    }

    getRemedies(): Promise<Remedy[]> {
        if (!this.remedies) {
            this.loadRemedies();
        }
        return this.remedies;
    }

    getRemedy(id: number): Remedy {
        return this.remedyMap[id];
    }

    private loadRemedies(): void {
        this.remedies = this.resourceService.getResource<Remedy[]>('remedies')
            .then(result => result.forEach(r => this.remedyMap[r.id] = r));
    }
}