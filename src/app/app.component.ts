import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {Instructions} from "../pages/instructions/instructions";
import {ResourceService} from "../services/resource.service";
import {Idea} from "../pages/idea/idea";
import {TranslateService} from "ng2-translate";
import {Remedies} from "../pages/remedies/remedies";
import {Interview} from "../interview/interview";
import {AnswerService} from "../services/answer.service";
import {QuestionService} from "../services/question.service";


@Component({
    templateUrl: 'app.html',
    providers: [ResourceService, AnswerService, QuestionService],
})
export class Kuegelchen {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = Interview;

    pages: Array<{titleKey: string, component: any}>;

    constructor(public platform: Platform, private translate: TranslateService) {
        this.initializeApp();

        // used for navigation
        this.pages = [
            {titleKey: 'MENU.INTERVIEW', component: Interview},
            {titleKey: 'MENU.HISTORY', component: Instructions},
            {titleKey: 'MENU.INSTRUCTIONS', component: Instructions},
            {titleKey: 'MENU.REMEDIES', component: Remedies},
            {titleKey: 'MENU.IDEA', component: Idea}
        ];

        translate.addLangs(["en", "de"]);
        translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
