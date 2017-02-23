import {Weight} from "./weight";
export class Answer {
    id: number;
    text: string;
    noneoption: string;
    followups: string;
    weights: Weight[];
    selected: boolean;

}