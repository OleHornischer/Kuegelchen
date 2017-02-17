import {Answer} from "./answer";
export class Question {
    id: number;
    text: string;
    answers: Answer[];
    followup: string;

    hasSelectedAnswer() : boolean   {
        if (this.answers)  {
            return this.answers.some(a => a.selected);
        }

        return false;
    }
}