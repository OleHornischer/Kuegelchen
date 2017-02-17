import {Injectable}     from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {TranslateService} from "ng2-translate";
import {Platform} from "ionic-angular";


@Injectable()
export class ResourceService {

    private assetUrl = '../assets/resources'; // Url to the resources

    constructor(private http: Http, private translate: TranslateService) {
    }

    getResource<T>(assetName: string) : Promise<T> {
        let languageCode = this.translate.currentLang;
        return this.http.get(this.assetUrl + '/' + assetName + '_' + languageCode + '.json')
            .toPromise()
            .then(response => response.json().data,
                error => this.handleError(error));
    }

    private handleError(error: any) {
        console.error('An error occured while trying to load resource data', error);
        return Promise.reject(error.message || error);
    }
}