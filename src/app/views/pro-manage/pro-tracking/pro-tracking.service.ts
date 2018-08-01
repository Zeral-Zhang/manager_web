import { Injectable } from '@angular/core';
import {createRequestOption} from '../../../../core/model/request-util';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ResponseWrapper} from '../../../../core/model/response-wrapper.model';
import {Project} from '../proList.model';
import {Plan} from './proTracking.model';

@Injectable()
export class ProTrackingService {
    constructor(private http: Http) {
    }

    querySuccessPlan(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/success-workPlansOfPro', options)
            .map((res: Response) => this.convertResponse(res));
    }
    queryFalsePlan(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/false-workPlansOfPro', options)
            .map((res: Response) => this.convertResponse(res));
    }
    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to User.
     */
    private convertItemFromServer(json: any): Plan {
        const entity: Plan = Object.assign(new Plan(), json);
        return entity;
    }
}
