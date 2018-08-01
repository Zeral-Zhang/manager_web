import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { ResponseWrapper } from '../../../core/model/response-wrapper.model';
import {createRequestOption} from '../../../core/model/request-util';
import {Event} from './eventList.model';

@Injectable()
export class EventListService {
    constructor(private http: Http) {
    }

    queryFalseEvent(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/false-workPlans', options)
            .map((res: Response) => this.convertResponse(res));
    }
    querySuccessEvent(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get('api/successful-workPlans', options)
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
    private convertItemFromServer(json: any): Event {
        const entity: Event = Object.assign(new Event(), json);
        return entity;
    }
}
