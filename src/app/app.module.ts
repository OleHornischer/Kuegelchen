import {NgModule, ErrorHandler} from "@angular/core";
import {Http} from "@angular/http";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";
import "./rxjs-extensions";
import {Kuegelchen} from "./app.component";
import {Idea} from "../pages/idea/idea";
import {Instructions} from "../pages/instructions/instructions";
import {Remedies} from "../pages/remedies/remedies";
import {Interview} from "../pages/interview/interview";

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
    declarations: [
        Kuegelchen,
        Idea,
        Instructions,
        Interview,
        Remedies
    ],
    imports: [
        IonicModule.forRoot(Kuegelchen),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        Kuegelchen,
        Idea,
        Instructions,
        Interview,
        Remedies
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
